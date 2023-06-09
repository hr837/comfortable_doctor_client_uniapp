<script lang="ts" setup>
import type { Ref } from 'vue'
import VitalSignInfoEdit from './vital-sign-info-edit.vue'
import { delPatientMonitorRecord, getPatientMonitorRecords } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { dateFormat } from '@/composables'
import { canEdit, monitorItems } from '@/composables/patient-narcotic-detail.composable'

const id = inject<Ref<string>>('id')

const currentId = ref('')
const dataSet = ref<ApiResonseType.MonitorInfo[]>([])
const currentRow = ref<ApiResonseType.MonitorInfo | undefined>(undefined)
const popup = ref<UniHelper.UniPopupProps>()

const editUrl = '/pages/patient-detail/patient-vital-sign-edit'

function refreshList() {
  clearRowInfo()
  getPatientMonitorRecords(id!.value)
    .then(data => dataSet.value = data)
}

function onDelete(rId: string) {
  function deleteIt() {
    delPatientMonitorRecord(rId).then(() => {
      uni.showToast({
        title: '已删除',
        success: () => setTimeout(refreshList, 1000),
      })
    })
  }

  uni.showModal({
    title: '删除提醒',
    content: '确定删除监测记录吗？',
    success: ({ confirm }) => {
      if (confirm)
        deleteIt()
    },
  })
}

function clearRowInfo() {
  currentRow.value = undefined
  currentId.value = ''
}

function onAddClick() {
  // clearRowInfo()
  // popup.value?.open()
  uni.navigateTo({
    url: `${editUrl}?pId=${id!.value}`,
  })
}

function closeDialog() {
  popup.value?.close()
}
function onEdit(rId: string) {
  if (!canEdit.value)
    return
  uni.navigateTo({
    url: `${editUrl}?rId=${rId}`,
  })
  // row.RecordTime = dateTimeFormat(row.RecordTime)
  // currentRow.value = row
  // popup.value?.open()
}

onMounted(() => {
  refreshList()
  uni.$on('refreshList:patient-vital-sign-record', refreshList)
})

onUnmounted(() => {
  uni.$off('refreshList:patient-vital-sign-record')
})
</script>

<template>
  <view class="component patient-vital-sign-record">
    <uni-section class="patient-vital-sign-record-header" title="生命体征" type="line">
      <template v-if="canEdit" #right>
        <!-- <button type="primary" size="mini">
                    检测项目
                  </button> -->
        <button class="m-l-4" type="primary" size="mini" @click="onAddClick">
          添加时间
        </button>
      </template>
    </uni-section>

    <uni-popup ref="popup" type="dialog">
      <VitalSignInfoEdit :data="currentRow" @close="closeDialog" @success="refreshList" />
    </uni-popup>

    <uni-table border stripe class="patient-vital-sign-record-table">
      <uni-tr class="patient-vital-sign-record-table-tr-hidden">
        <uni-th align="center" width="70">
          时间
        </uni-th>
        <uni-th v-for="item of monitorItems" :key="item.ItemCode" align="center" width="50">
          {{ item.ItemName }}
        </uni-th>
        <uni-th v-if="canEdit" align="center" width="60">
          操作
        </uni-th>
      </uni-tr>
      <uni-tr v-for="record in dataSet" :key="record.Id" @click="() => currentId = record.Id">
        <uni-td align="center">
          {{ dateFormat(record.RecordTime, 'MM-DD HH:mm') }}
        </uni-td>
        <uni-td v-for="item of monitorItems" :key="`${record.Id}-${item.ItemCode}`" align="center">
          {{ record.ItemValues.find(x => x.ItemCode === item.ItemCode)?.ItemValue }}
        </uni-td>
        <uni-td v-if="canEdit" align="center">
          <view v-show="currentId === record.Id" class="row justify-between">
            <view @click="onEdit(record.Id)">
              <uni-icons class="leading-none" type="settings-filled" size="20" color="#007aff" />
            </view>
            <view @click="onDelete(record.Id)">
              <uni-icons class="leading-none" type="trash" size="20" color="#d9001b" />
            </view>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

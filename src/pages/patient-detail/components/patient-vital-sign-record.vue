<script lang="ts" setup>
import VitalSignInfoEdit from './vital-sign-info-edit.vue'
import { delPatientMonitorRecord, getPatientMonitorRecords } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { dateFormat, dateTimeFormat } from '@/composables'
import { monitorItems } from '@/composables/patient-narcotic-detail.composable'

const props = defineProps<{ id: string }>()

const currentId = ref('')
const dataSet = ref<ApiResonseType.MonitorInfo[]>([])
const currentRow = ref<ApiResonseType.MonitorInfo | undefined>(undefined)
const popup = ref<UniHelper.UniPopupProps>()

onMounted(refreshList)

function refreshList() {
  clearRowInfo()
  getPatientMonitorRecords(props.id)
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
  clearRowInfo()
  popup.value?.open()
}

function closeDialog() {
  popup.value?.close()
}
function onEdit(row: ApiResonseType.MonitorInfo) {
  row.RecordTime = dateTimeFormat(row.RecordTime)
  currentRow.value = row
  popup.value?.open()
}
</script>

<template>
  <view class="component patient-vital-sign-record">
    <uni-section title="生命体征" type="line">
      <template #right>
        <button type="primary" size="mini">
          检测项目
        </button>
        <button class="m-l-4" type="primary" size="mini" @click="onAddClick">
          添加时间
        </button>
      </template>
    </uni-section>

    <uni-popup ref="popup" type="dialog">
      <VitalSignInfoEdit :pid="id" :data="currentRow" @close="closeDialog" @success="refreshList" />
    </uni-popup>

    <uni-table border stripe class="patient-vital-sign-record-table">
      <uni-tr class="patient-vital-sign-record-table-tr-hidden">
        <uni-th align="center" width="120px">
          时间
        </uni-th>
        <uni-th v-for="item of monitorItems" :key="item.ItemCode" align="center" width="80px">
          {{ item.ItemName }}
        </uni-th>
        <uni-th align="center" width="80px">
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
        <uni-td align="center">
          <view v-show="currentId === record.Id" class="row justify-between">
            <view @click="onEdit(record)">
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

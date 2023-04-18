<script lang="ts" setup>
import RecordItem from './record-item.vue'
import TransNarcoticfusionInfoEdit from './transfusion-narcotic-info-edit.vue'
import type { ApiResonseType } from '@/utils/api.help'
import { delTransfusion, getTransfusionList } from '@/utils/api'
import { dictConvertDrugFlag } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'

const props = defineProps<{ id: string }>()
const popup = ref<UniHelper.UniPopupProps>()
const dataSet = ref<ApiResonseType.Transfusion[]>([])
const rowId = ref<string | undefined>()
function open() {
  popup.value?.open()
}

function close() {
  popup.value?.close()
}

function refreshList() {
  rowId.value = undefined
  getTransfusionList(props.id, '3').then((data) => {
    dataSet.value = data
  })
}

function onDelete(id: string) {
  function deleteIt() {
    delTransfusion(id).then(() => {
      uni.showToast({
        title: '已删除',
        success: () => setTimeout(refreshList, 1000),
      })
    })
  }

  uni.showModal({
    title: '删除提醒',
    content: '确定删除输液记录吗？',
    success: ({ confirm }) => {
      if (confirm)
        deleteIt()
    },
  })
}

function onClick(id: string) {
  rowId.value = id
  open()
}

onMounted(refreshList)
</script>

<template>
  <view class="component patient-narcotic-drug-record">
    <uni-section title="麻醉用药" type="line">
      <template #right>
        <button type="primary" size="mini" @click="open">
          添加
        </button>
      </template>
    </uni-section>

    <uni-popup ref="popup" type="dialog">
      <TransNarcoticfusionInfoEdit :pid="id" :rid="rowId" @close="close" @success="refreshList" />
    </uni-popup>

    <view class="patient-narcotic-drug-record-container">
      <RecordItem
        v-for="item of dataSet" :key="item.Id" :tag="dictConvertDrugFlag(item.DrugFlag)"
        @delete="onDelete(item.Id)" @click="onClick(item.Id)"
      >
        <view class="row">
          <text class="text-gray-900 patient-narcotic-drug-record-text">
            {{ item.DrugName }}
          </text>
          <text class="patient-narcotic-drug-record-text">
            {{ item.Dose }} / {{ item.Unit }}
          </text>
          <text>{{ item.Mode }}</text>
        </view>
        <view class="row m-t-2">
          <text class="patient-narcotic-drug-record-text">
            时间：{{ dateTimeFormat(item.PointTime) }}
          </text>
          <text class="patient-narcotic-drug-record-text">
            开始时间：{{ dateTimeFormat(item.BeginTime) }}
          </text>
          <text class="patient-narcotic-drug-record-text">
            结束时间：{{ dateTimeFormat(item.EndTime) }}
          </text>
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-narcotic-drug-record-container {
  @apply: p-x-4;
}

.patient-narcotic-drug-record-text {
  @apply: p-r-6;
}
</style>

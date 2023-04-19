<script lang="ts" setup>
import RecordItem from './record-item.vue'
import TransfusionInfoEdit from './transfusion-info-edit.vue'
import { delTransfusion, getTransfusionList } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { dateFormat } from '@/composables'
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
  getTransfusionList(props.id, '2').then((data) => {
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
  <view class="component patient-transfusion-record">
    <uni-section class="patient-transfusion-record-header" title="输液" type="line">
      <template #right>
        <button type="primary" size="mini" @click="open">
          添加
        </button>
      </template>
    </uni-section>

    <uni-popup ref="popup" type="dialog">
      <TransfusionInfoEdit :pid="id" :rid="rowId" @close="close" @success="refreshList" />
    </uni-popup>

    <view class="patient-transfusion-record-container">
      <view v-if="!dataSet.length" class="no-data">
        暂无数据
      </view>
      <RecordItem v-for="item of dataSet" :key="item.Id" @delete="onDelete(item.Id)" @click="onClick(item.Id)">
        <view class="row">
          <text class="text-gray-900 patient-transfusion-record-text">
            {{ item.DrugName }}
          </text>
          <text class="patient-transfusion-record-text">
            {{ item.Dose }} / {{ item.Unit }}
          </text>
          <text class="patient-transfusion-record-text">
            {{ item.Mode }}
          </text>
          <text class="patient-transfusion-record-text">
            {{ item.DrugType }}
          </text>
        </view>
        <view class="row m-t-2">
          <text class="patient-transfusion-record-text">
            开始时间： {{ dateFormat(item.BeginTime) }}
          </text>
          <text v-if="!!item.EndTime" class="patient-transfusion-record-text">
            结束时间：{{ dateFormat(item.EndTime) }}
          </text>
          <uni-icons v-else type="spinner-cycle" size="22" class="animate-spin" />
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-transfusion-record {
  &-header {
    @apply fixed w-full z-1;
  }

  &-container {
    @apply: p-x-4 p-t-60px;
  }

  &-text {
    @apply: p-r-6;
  }

  .animate-spin {
    animation-duration: 3s;
  }
}
</style>

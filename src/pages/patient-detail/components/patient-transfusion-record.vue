<script lang="ts" setup>
import type { Ref } from 'vue'
import RecordItem from './record-item.vue'
import { delTransfusion, getTransfusionList } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { dateTimeFormat } from '@/composables'
const dataSet = ref<ApiResonseType.Transfusion[]>([])
const id = inject<Ref<string>>('id')

const editUrl = '/pages/patient-detail/transfusion-info-edit'

function refreshList() {
  getTransfusionList(id!.value, '2').then((data) => {
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

function addRecord() {
  uni.navigateTo({
    url: `${editUrl}?pId=${id!.value}`,
  })
}

function onClick(id: string) {
  uni.navigateTo({
    url: `${editUrl}?rId=${id!}`,
  })
}

onMounted(refreshList)
</script>

<template>
  <view class="component patient-transfusion-record">
    <uni-section class="patient-transfusion-record-header" title="输液" type="line">
      <template #right>
        <button type="primary" size="mini" @click="addRecord">
          添加
        </button>
      </template>
    </uni-section>

    <view class="patient-transfusion-record-container p-x-4">
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
            开始时间： {{ dateTimeFormat(item.BeginTime) }}
          </text>
          <text v-if="!!item.EndTime" class="patient-transfusion-record-text">
            结束时间：{{ dateTimeFormat(item.EndTime) }}
          </text>
          <uni-icons v-else type="spinner-cycle" size="22" class="animate-spin" />
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-transfusion-record {

  &-text {
    @apply: p-r-6;
  }

  .animate-spin {
    animation-duration: 3s;
  }
}
</style>

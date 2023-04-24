<script lang="ts" setup>
import type { Ref } from 'vue'
import RecordItem from './record-item.vue'
import type { ApiResonseType } from '@/utils/api.help'
import { delTransfusion, getTransfusionList } from '@/utils/api'
import { dictConvertDrugFlag } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'

const id = inject<Ref<string>>('id')
const editUrl = '/pages/patient-detail/transfusion-narcotic-info-edit'

const dataSet = ref<ApiResonseType.Transfusion[]>([])
const rowId = ref<string | undefined>()

function refreshList() {
  rowId.value = undefined
  getTransfusionList(id!.value, '3').then((data) => {
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
    success: () => {
      uni.$once('refreshList:patient-narcotic-drug-record', refreshList)
    },
  })
}

function onClick(id: string) {
  uni.navigateTo({
    url: `${editUrl}?rId=${id!}`,
    success: () => {
      uni.$once('refreshList:patient-narcotic-drug-record', refreshList)
    },
  })
}

onMounted(refreshList)
</script>

<template>
  <view class="component patient-narcotic-drug-record">
    <uni-section class="patient-narcotic-drug-record-header" title="麻醉用药" type="line">
      <template #right>
        <button type="primary" size="mini" @click="addRecord">
          添加
        </button>
      </template>
    </uni-section>

    <view class="patient-narcotic-drug-record-container p-x-4">
      <view v-if="!dataSet.length" class="no-data">
        暂无数据
      </view>
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
          <text v-if="item.DrugFlag === '0'" class="patient-narcotic-drug-record-text">
            时间：{{ dateTimeFormat(item.PointTime, 'YYYY-MM-DD HH:mm') }}
          </text>
          <template v-else>
            <text class="patient-narcotic-drug-record-text">
              开始时间：{{ dateTimeFormat(item.BeginTime) }}
            </text>
            <text v-if="!!item.EndTime" class="patient-narcotic-drug-record-text">
              结束时间：{{ dateTimeFormat(item.EndTime) }}
            </text>
            <uni-icons v-else type="spinner-cycle" size="22" class="animate-spin" />
          </template>
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-narcotic-drug-record {

  &-text {
    @apply: p-r-6;
  }

  .animate-spin {
    animation-duration: 3s;
  }
}
</style>

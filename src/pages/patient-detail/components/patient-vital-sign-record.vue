<script lang="ts" setup>
import { delPatientMonitorRecord, getMonitorItems, getPatientMonitorRecords } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { dateFormat } from '@/composables/patient-narcotic-detail.composable'

const props = defineProps<{ id: string }>()

const currentId = ref('')

const dataSet = ref<ApiResonseType.MonitorInfo[]>([])
const monitorItems = ref<ApiResonseType.MonitorItem[]>([])

onMounted(() => {
  Promise.all([getMonitorItems(props.id), getPatientMonitorRecords(props.id)]).then(([config, records]) => {
    monitorItems.value = config
    dataSet.value = records
  })
})

function onDelete(rId: string) {
  function refreshList() {
    currentId.value = ''
    getPatientMonitorRecords(props.id)
      .then(data => dataSet.value = data)
  }

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
    content: '确定删除检测记录吗？',
    success: ({ confirm }) => {
      if (confirm)
        deleteIt()
    },
  })
}
</script>

<template>
  <view class="component patient-vital-sign-record">
    <uni-section title="生命体征" type="line">
      <template #right>
        <button type="primary" size="mini">
          检测项目
        </button>
        <button class="m-l-4" type="primary" size="mini">
          添加时间
        </button>
      </template>
    </uni-section>

    <!-- fixed table header -->
    <!-- <uni-table border stripe class="patient-vital-sign-record-table--fixed">
      <uni-tr>
        <uni-th align="center" width="200px">
          时间
        </uni-th>
        <uni-th align="center" width="100px">
          收缩压
        </uni-th>
        <uni-th align="center" width="100px">
          舒张压
        </uni-th>
        <uni-th align="center" width="100px">
          血氧
        </uni-th>
        <uni-th align="center" width="100px">
          呼吸
        </uni-th>
        <uni-th align="center" width="100px">
          心率
        </uni-th>
        <uni-th align="center" width="100px">
          操作
        </uni-th>
      </uni-tr>
    </uni-table> -->
    <uni-table border stripe class="patient-vital-sign-record-table">
      <uni-tr class="patient-vital-sign-record-table-tr-hidden">
        <uni-th align="center" width="200px">
          时间
        </uni-th>
        <uni-th v-for="item of monitorItems" :key="item.ItemCode" align="center" width="100px">
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
          <view v-show="currentId === record.Id" @click="onDelete(record.Id)">
            <uni-icons class="leading-none" type="trash" size="20" color="#d9001b" />
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<!-- <style lang="scss" scoped>
.patient-vital-sign-record {
  @apply page h-full;

  &-table {
    @apply flex-1 overflow-auto;
    // &-tr-hidden{
    //   visibility: hidden;
    //   th{
    //     height: 0;
    //     overflow: hidden;
    //     padding: 0;
    //   }
    //   ::v-deep .uni-table-th-content{
    //     display: block;
    //     height: 0px;
    //     overflow: hidden;
    //   }
    // }

    // &--fixed {
    //   ::v-deep .uni-table-loading {
    //     display: none;
    //   }
    // }
  }
}
</style> -->

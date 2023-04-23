<script lang="ts" setup>
import type { Ref } from 'vue'
import StateTimePicker from './state-time-picker.vue'
import { getPatientDetail, updateState } from '@/utils/api'
const id = inject<Ref<string>>('id')

const list = [
  { title: '入室时间', label: '入室时间', key: 'AccessTime' },
  { title: '麻醉开始时间', label: '麻醉开始', key: 'AnesthesiaBeginTime' },
  { title: '麻醉结束时间', label: '麻醉结束', key: 'AnesthesiaEndTime' },
  { title: '手术开始时间', label: '手术开始', key: 'OperationBeginTime' },
  { title: '手术结束时间', label: '手术结束', key: 'OperationEndTime' },
  { title: '出室时间', label: '出室时间', key: 'LeaveTime' },
  { title: '入恢复室时间', label: '入PACU', key: 'AccessPacuTime' },
  { title: '出恢复室时间', label: '出PACU', key: 'LeavePacuTime' },
]

const modelData = reactive<any>({})
list.forEach((item) => {
  modelData[item.key] = ''
})

function onChange(key: string, val: string) {
  modelData[key] = val
  const item = list.find(x => x.key === key)
  if (!item)
    return
  updateState({
    StateName: item.title,
    StateTime: val,
    AnesthesiaId: id!.value,
  }).catch(() => {
    uni.showToast({
      title: '保存失败，请稍后重试',
      icon: 'none',
    })
  })
}

onMounted(() => {
  getPatientDetail(id!.value).then((data) => {
    modelData.AccessPacuTime = data.AccessPacuTime
    modelData.AnesthesiaBeginTime = data.AnesthesiaBeginTime
    modelData.LeavePacuTime = data.LeavePacuTime
    modelData.LeaveTime = data.LeaveTime
    modelData.AccessTime = data.AccessTime
    modelData.AnesthesiaEndTime = data.AnesthesiaEndTime
    modelData.OperationBeginTime = data.OperationBeginTime
    modelData.OperationEndTime = data.OperationEndTime
  })
})
</script>

<template>
  <view class="component patient-detail-state-time">
    <uni-forms :model="modelData" label-width="70px">
      <uni-row>
        <uni-col v-for="(item) of list" :key="item.key" :span="6">
          <uni-forms-item :label="item.label">
            <StateTimePicker :date="modelData[item.key]" @change="val => onChange(item.key, val)" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.patient-detail-state-time {
  padding-left: 8px;

  .uni-forms-item {
    margin-bottom: 4px !important;

    ::v-deep .uni-forms-item__content {
      padding-right: 12px;
    }
  }
}
</style>

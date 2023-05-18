<script lang="ts" setup>
import type { DetailCheckQueryType } from '@/composables'

const model = reactive<DetailCheckQueryType>({
  PatientNumber: '',
  PatientName: '',
  PatientSex: '',
  PatientAge: '',
  PatientDepartmentName: '',
  Id: '',
})

defineExpose({
  revertData: (data: DetailCheckQueryType) => {
    model.PatientNumber = data.PatientNumber
    model.PatientName = data.PatientName
    model.PatientSex = data.PatientSex
    model.PatientAge = data.PatientAge
    model.PatientDepartmentName = data.PatientDepartmentName
  },
})
</script>

<template>
  <view class="component the-patient-check-header">
    <uni-row>
      <uni-col :span="4">
        <text class="the-patient-check-header-label">
          姓名：
        </text>
        <text>{{ model.PatientName }}</text>
      </uni-col>
      <uni-col :span="3">
        <text class="the-patient-check-header-label">
          性别：
        </text>
        <text>{{ model.PatientSex }}</text>
      </uni-col>
      <uni-col :span="4">
        <text class="the-patient-check-header-label">
          年龄：
        </text>
        <text>{{ model.PatientAge }}</text>
      </uni-col>
      <uni-col :span="8">
        <text class="the-patient-check-header-label">
          门诊号/住院号：
        </text>
        <text>{{ model.PatientNumber }}</text>
      </uni-col>
      <uni-col :span="5">
        <text class="the-patient-check-header-label">
          科室：
        </text>
        <text>{{ model.PatientDepartmentName }}</text>
      </uni-col>
    </uni-row>
  </view>
</template>

<style lang="scss" scoped>
.the-patient-check-header {
  @apply p-4 bg-gray-200;
  &-label{
    @apply text-gray-500;
  }
}
</style>

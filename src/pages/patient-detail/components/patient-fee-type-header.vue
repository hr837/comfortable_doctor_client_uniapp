<script lang="ts" setup>
import { patientInfo } from '@/composables/patient-narcotic-detail.composable'
</script>

<template>
  <view class="component patient-fee-type-header">
    <uni-row>
      <uni-col :span="4">
        <text class="patient-fee-type-header-label">
          姓名:
        </text>
        <text>{{ patientInfo.PatientName }}</text>
      </uni-col>
      <uni-col :span="4">
        <text class="patient-fee-type-header-label">
          性别:
        </text>
        <text>{{ patientInfo.PatientSex }}</text>
      </uni-col>
      <uni-col :span="4">
        <text class="patient-fee-type-header-label">
          年龄:
        </text>
        <text>{{ patientInfo.PatientAge }}</text>
      </uni-col>
      <uni-col :span="8">
        <text class="patient-fee-type-header-label">
          科室:
        </text>
        <text>{{ patientInfo.PatientDepartmentName }}</text>
      </uni-col>
      <uni-col :span="4">
        <text class="patient-fee-type-header-label">
          床号:
        </text>
        <text>{{ patientInfo.PatientBedCode }}</text>
      </uni-col>
    </uni-row>
    <uni-row>
      <uni-col :span="8">
        <text class="patient-fee-type-header-label">
          住院号(门诊号):
        </text>
        <text>{{ patientInfo.PatientNumber }}</text>
      </uni-col>
      <uni-col :span="16">
        <text class="patient-fee-type-header-label">
          检查类型:
        </text>
        <text>{{ patientInfo.ExamineType }}</text>
      </uni-col>
    </uni-row>
    <uni-row>
      <uni-col :span="24">
        <text class="patient-fee-type-header-label">
          诊断:
        </text>
        <text>{{ patientInfo.DiagnosisName }}</text>
      </uni-col>
    </uni-row>
  </view>
</template>

<style lang="scss" scoped>
.patient-fee-type-header {
  @apply p-4 leading-8;
  &-label {
    @apply text-gray-500;
  }
}
</style>

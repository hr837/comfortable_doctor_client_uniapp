<script lang="ts" setup>
import { getPatientDetail } from '@/utils/api'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const model = reactive({
  PatientNumber: '',
  PatientName: '',
  PatientSex: '',
  PatientAge: '',
  PatientDepartmentName: '',
})

onMounted(() => {
  getPatientDetail(props.id).then((data) => {
    model.PatientNumber = data.PatientNumber
    model.PatientName = data.PatientName
    model.PatientSex = data.PatientSex
    model.PatientAge = data.PatientAge
    model.PatientDepartmentName = data.PatientDepartmentName
  })
})
</script>

<template>
  <view class="component patient-safe-check-header">
    <uni-row>
      <uni-col :span="4">
        <text class="the-patient-safe-check-header-label">
          姓名:
        </text>
        <text>{{ model.PatientName }}</text>
      </uni-col>
      <uni-col :span="3">
        <text class="the-patient-safe-check-header-label">
          性别:
        </text>
        <text>{{ model.PatientSex }}</text>
      </uni-col>
      <uni-col :span="3">
        <text class="the-patient-safe-check-header-label">
          年龄:
        </text>
        <text>{{ model.PatientAge }}</text>
      </uni-col>
      <uni-col :span="8">
        <text class="the-patient-safe-check-header-label">
          门诊号/住院号:
        </text>
        <text>{{ model.PatientNumber }}</text>
      </uni-col>
      <uni-col :span="6">
        <text class="the-patient-safe-check-header-label">
          科室:
        </text>
        <text>{{ model.PatientDepartmentName }}</text>
      </uni-col>
    </uni-row>
  </view>
</template>

<style lang="scss" scoped>
.patient-safe-check-header {
  @apply p-4 bg-gray-200;

  &-label {
    @apply text-gray-500;
  }
}
</style>

<script lang="ts" setup>
import DoctorSign from './doctor-sign.vue'

import { dateTimeFormat } from '@/composables'
import { editSafeCheckSignData } from '@/composables/patient-safe-check-detail.composable'

defineProps<{
  disabled: boolean
  isAnalgesia: boolean
}>()

const doctorKey = ref('')

function setSignInfo(data?: any) {
  const dateStr = dateTimeFormat(new Date().toLocaleString())
  switch (doctorKey.value) {
    case 'narcoticDoctor':
      editSafeCheckSignData.narcoticDoctorName = data?.userName ?? ''
      editSafeCheckSignData.narcoticDoctorSign = data?.userCode ?? ''
      editSafeCheckSignData.narcoticDoctorDate = data ? dateStr : ''
      break
    case 'doctor':
      editSafeCheckSignData.doctorName = data?.userName ?? ''
      editSafeCheckSignData.doctorSign = data?.userCode ?? ''
      editSafeCheckSignData.doctorDate = data ? dateStr : ''
      break
    default:
      editSafeCheckSignData.nurseName = data?.userName ?? ''
      editSafeCheckSignData.nurseSign = data?.userCode ?? ''
      editSafeCheckSignData.nurseDate = data ? dateStr : ''
      break
  }
}
</script>

<template>
  <view class="component patient-safe-check-sign">
    <uni-section title="核对无误后三方签名：" type="line" />
    <uni-forms
      :model="editSafeCheckSignData" label-width="70px" label-align="right"
      class="patient-narcotic-result-form  p-x-4"
    >
      <view class="row justify-around">
        <view v-if="isAnalgesia">
          <uni-forms-item label="麻醉医师" class="no-margin" name="narcoticDoctorName">
            <DoctorSign
              :disabled="disabled" :sign-code="editSafeCheckSignData.narcoticDoctorSign" role-code="Anesthetist"
              @click="() => doctorKey = 'narcoticDoctor'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="narcoticDoctorDate" :label-width="60">
            <uni-datetime-picker
              v-model="editSafeCheckSignData.narcoticDoctorDate" type="datetime" :disabled="disabled"
              hide-second
            />
          </uni-forms-item>
        </view>
        <view>
          <uni-forms-item label="内镜医师" class="no-margin" name="doctorName">
            <DoctorSign
              :disabled="disabled" :sign-code="editSafeCheckSignData.doctorSign" role-code="AnDoctor"
              @click="() => doctorKey = 'doctor'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="narcoticDoctorDate" :label-width="60">
            <uni-datetime-picker
              v-model="editSafeCheckSignData.doctorDate" type="datetime" :disabled="disabled"
              hide-second
            />
          </uni-forms-item>
        </view>
        <view>
          <uni-forms-item label="内镜护士" class="no-margin" name="nurseName">
            <DoctorSign
              :disabled="disabled" :sign-code="editSafeCheckSignData.nurseSign" role-code="AnNurse"
              @click="() => doctorKey = 'nurse'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="nurseDate" :label-width="60">
            <uni-datetime-picker
              v-model="editSafeCheckSignData.nurseDate" type="datetime" :disabled="disabled"
              hide-second
            />
          </uni-forms-item>
        </view>
      </view>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-safe-check-sign {
  .no-margin {
    margin-bottom: 4px;
  }

  .uni-forms-item.no-margin {
    ::v-deep .uni-forms-item__label {
      margin-top: 10px;
    }
  }

  .doctor-sign {
    ::v-deep .doctor-sign-image {
      width: 160px;
      height: 70px;
    }
  }

}
</style>

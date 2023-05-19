<script lang="ts" setup>
import DoctorSign from './doctor-sign.vue'

import { dateTimeFormat } from '@/composables'

const modelData = reactive({
  narcoticDoctorName: '',
  narcoticDoctorSign: '',
  narcoticDoctorDate: '',
  narcoticDoctor2Name: '',
  narcoticDoctor2Sign: '',
  narcoticDoctor2Date: '',
  nurseName: '',
  nurseSign: '',
  nurseDate: '',
})

onMounted(() => {

})

const canEdit = ref(true)
const doctorKey = ref('')

function setSignInfo(data?: any) {
  const dateStr = dateTimeFormat(new Date().toLocaleString())
  switch (doctorKey.value) {
    case 'narcoticDoctor':
      modelData.narcoticDoctorName = data?.userName ?? ''
      modelData.narcoticDoctorSign = data?.userCode ?? ''
      modelData.narcoticDoctorDate = data ? dateStr : ''
      break
    case 'narcoticDoctor2':
      modelData.narcoticDoctor2Name = data?.userName ?? ''
      modelData.narcoticDoctor2Sign = data?.userCode ?? ''
      modelData.narcoticDoctor2Date = data ? dateStr : ''
      break
    default:
      modelData.nurseName = data?.userName ?? ''
      modelData.nurseSign = data?.userCode ?? ''
      modelData.nurseDate = data ? dateStr : ''
      break
  }
}
</script>

<template>
  <view class="component patient-safe-check-sign">
    <uni-section title="核对无误后三方签名：" type="line" />
    <uni-forms :model="modelData" label-width="70px" label-align="right" class="patient-narcotic-result-form  p-x-4">
      <uni-row>
        <uni-col :span="8">
          <uni-forms-item label="麻醉医师" class="no-margin" name="narcoticDoctorName">
            <DoctorSign
              :disabled="!canEdit" :sign-code="modelData.narcoticDoctorSign" role-code="Anesthetist"
              @click="() => doctorKey = 'narcoticDoctor'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="narcoticDoctorDate" :label-width="45">
            <uni-datetime-picker v-model="modelData.narcoticDoctorDate" type="datetime" :disabled="!canEdit" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="8">
          <uni-forms-item label="内镜医师" class="no-margin" name="narcoticDoctorName">
            <DoctorSign
              :disabled="!canEdit" :sign-code="modelData.narcoticDoctor2Sign" role-code="Anesthetist"
              @click="() => doctorKey = 'narcoticDoctor2'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="narcoticDoctorDate" :label-width="45">
            <uni-datetime-picker v-model="modelData.narcoticDoctor2Date" type="datetime" :disabled="!canEdit" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="8">
          <uni-forms-item label="内镜护士" class="no-margin" name="narcoticDoctorName">
            <DoctorSign
              :disabled="!canEdit" :sign-code="modelData.nurseSign" role-code="AnNurse"
              @click="() => doctorKey = 'nurse'" @signed="setSignInfo"
            />
          </uni-forms-item>
          <uni-forms-item label="时间" name="narcoticDoctorDate" :label-width="45">
            <uni-datetime-picker v-model="modelData.nurseDate" type="datetime" :disabled="!canEdit" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
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

<script lang="ts" setup>
import { PatientDetailDict, patientInfo } from '@/composables/patient-narcotic-detail.composable'

// const deptList = ref<UniHelper.UniDataSelectLocaldata[]>([])
// const id = inject<Ref<string>>('id')

// onMounted(() => {
//   const list: ItemInfo[] = getApp().globalData!.deptList
//   if (list && list.length) {
//     deptList.value = list.map(x => ({
//       value: x.ItemCode,
//       text: x.ItemName,
//       disable: false,
//     }))
//   }
//   refreshPatientInfo()
// })
</script>

<template>
  <view class="component patient-base-info">
    <uni-section title="基本信息" type="line">
      <!-- <template #right>
                          <button type="primary" size="mini">
                            保存
                          </button>
                        </template> -->
    </uni-section>
    <uni-forms ref="formRef" label-width="100px" label-align="right" class="p-4 p-t-0">
      <uni-row>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="姓名">
            <uni-easyinput :value="patientInfo.PatientName" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="就诊号">
            <uni-easyinput type="number" :value="patientInfo.PatientNumber" disabled />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="性别">
            <uni-easyinput :value="patientInfo.PatientSex" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="身份证号">
            <uni-easyinput type="idcard" :value="patientInfo.PatientIdCard" disabled />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="出生日期">
            <uni-datetime-picker v-model="patientInfo.PatientBirthday" type="date" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="年龄">
            <uni-easyinput :value="patientInfo.PatientAge" disabled />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="患者来源">
            <uni-data-select v-model="patientInfo.PatientSource" :localdata="PatientDetailDict.source" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="科室">
            <uni-data-select v-model="patientInfo.PatientDepartmentCode" :localdata="[]" disabled />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="病区">
            <uni-easyinput :value="patientInfo.PatientWardName" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="床号">
            <uni-easyinput :value="patientInfo.PatientBedCode" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="身高">
            <view class="row items-center">
              <uni-easyinput class="content" :value="patientInfo.PatientHeight" type="number" disabled />
              <view class="patient-base-info-item--append">
                CM
              </view>
            </view>
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="体重">
            <view class="row items-center">
              <uni-easyinput class="content" :value="patientInfo.PatientWeight" type="digit" disabled />
              <view class="patient-base-info-item--append">
                KG
              </view>
            </view>
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="血型">
            <uni-data-select :localdata="PatientDetailDict.bloodType" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="Rh血型">
            <uni-data-select :localdata="PatientDetailDict.bolldRH" disabled />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="申请日期">
            <uni-datetime-picker v-model="patientInfo.SubscribeDate" type="date" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="手术操作">
            <uni-data-select :localdata="PatientDetailDict.operation" :value="patientInfo.OperationCode" disabled />
          </uni-forms-item>
        </uni-col>
      </uni-row>
      <uni-forms-item label="特殊感染">
        <uni-easyinput :value="patientInfo.SpecialInfect" disabled />
      </uni-forms-item>
      <uni-forms-item label="初步诊断">
        <uni-easyinput type="textarea" :value="patientInfo.DiagnosisName" disabled />
      </uni-forms-item>
      <uni-forms-item label="处理意见">
        <uni-easyinput type="textarea" :value="patientInfo.Opinion" disabled />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.patient-base-info {

  .uni-easyinput {
    ::v-deep .is-disabled {
      color: inherit;
    }
  }

  &-item--append {
    @apply w-40px text-gray-600 text-center;
  }

}
</style>

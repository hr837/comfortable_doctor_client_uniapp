<script lang="ts" setup>
import type { Ref } from 'vue'
import { PatientDetailDict } from '@/composables/patient-narcotic-detail.composable'
import type { ApiResonseType, ItemInfo } from '@/utils/api.help'
import { getPatientDetail } from '@/utils/api'
import { dateFormat } from '@/composables'
const patientInfo = reactive<ApiResonseType.PatientDetailInfo>({
  AccessPacuTime: '',
  AccessTime: '',
  AnesthesiaBeginTime: '',
  AnesthesiaEndTime: '',
  AnesthesiaMethodCode: '',
  AnesthesiaMethodName: '',
  Anesthetist1Code: '',
  Anesthetist1Name: '',
  Anesthetist3Code: '',
  Anesthetist3Name: '',
  AppointmentCancel: '',
  AssessTime: '',
  DiagnosisCode: '',
  DiagnosisName: '',
  DoctorCode: '',
  DoctorName: '',
  ExamineTime: '',
  ExamineType: '',
  ExtubationTime: '',
  Id: '',
  IntubateTime: '',
  IsChecked: false,
  IsEmergency: false,
  LeavePacuTime: '',
  LeaveTime: '',
  NurseCode: '',
  NurseName: '',
  OperateCancel: '',
  OperatingRoomCode: '',
  OperatingRoomName: '',
  OperationBeginTime: '',
  OperationCode: '',
  OperationEndTime: '',
  OperationName: '',
  OperatorCode: '',
  OperatorName: '',
  Opinion: '',
  PatientAge: '',
  PatientBedCode: '',
  PatientBedName: '',
  PatientBirthday: '',
  PatientDepartmentCode: '',
  PatientDepartmentName: '',
  PatientIdCard: '',
  PatientIdentity: '',
  PatientMrn: '',
  PatientName: '',
  PatientNumber: '',
  PatientSex: '',
  PatientSource: '',
  PatientWardCode: '',
  PatientWardName: '',
  PlanStartTime: '',
  SpecialInfect: '',
  SubscribeDate: '',
  SubscribeId: '',
})
const deptList = ref<UniHelper.UniDataSelectLocaldata[]>([])
const id = inject<Ref<string>>('id')

const refreshPatientInfo = () => getPatientDetail(id!.value).then((data) => {
  patientInfo.AccessPacuTime = data.AccessPacuTime
  patientInfo.AccessTime = data.AccessTime
  patientInfo.AnesthesiaBeginTime = data.AnesthesiaBeginTime
  patientInfo.AnesthesiaEndTime = data.AnesthesiaEndTime
  patientInfo.AnesthesiaMethodCode = data.AnesthesiaMethodCode
  patientInfo.AnesthesiaMethodName = data.AnesthesiaMethodName
  patientInfo.Anesthetist1Code = data.Anesthetist1Code
  patientInfo.Anesthetist1Name = data.Anesthetist1Name
  patientInfo.Anesthetist3Code = data.Anesthetist3Code
  patientInfo.Anesthetist3Name = data.Anesthetist3Name
  patientInfo.AppointmentCancel = data.AppointmentCancel
  patientInfo.AssessTime = data.AssessTime
  patientInfo.DiagnosisCode = data.DiagnosisCode
  patientInfo.DiagnosisName = data.DiagnosisName
  patientInfo.DoctorCode = data.DoctorCode
  patientInfo.DoctorName = data.DoctorName
  patientInfo.ExamineTime = data.ExamineTime
  patientInfo.ExamineType = data.ExamineType
  patientInfo.ExtubationTime = data.ExtubationTime
  patientInfo.Id = data.Id
  patientInfo.IntubateTime = data.IntubateTime
  patientInfo.IsChecked = data.IsChecked
  patientInfo.IsEmergency = data.IsEmergency
  patientInfo.LeavePacuTime = data.LeavePacuTime
  patientInfo.LeaveTime = data.LeaveTime
  patientInfo.NurseCode = data.NurseCode
  patientInfo.NurseName = data.NurseName
  patientInfo.OperateCancel = data.OperateCancel
  patientInfo.OperatingRoomCode = data.OperatingRoomCode
  patientInfo.OperatingRoomName = data.OperatingRoomName
  patientInfo.OperationBeginTime = data.OperationBeginTime
  patientInfo.OperationCode = data.OperationCode
  patientInfo.OperationEndTime = data.OperationEndTime
  patientInfo.OperationName = data.OperationName
  patientInfo.OperatorCode = data.OperatorCode
  patientInfo.OperatorName = data.OperatorName
  patientInfo.Opinion = data.Opinion
  patientInfo.PatientAge = data.PatientAge
  patientInfo.PatientBedCode = data.PatientBedCode
  patientInfo.PatientBedName = data.PatientBedName
  patientInfo.PatientBirthday = dateFormat(data.PatientBirthday)
  patientInfo.PatientDepartmentCode = data.PatientDepartmentCode
  patientInfo.PatientDepartmentName = data.PatientDepartmentName
  patientInfo.PatientIdCard = data.PatientIdCard
  patientInfo.PatientIdentity = data.PatientIdentity
  patientInfo.PatientMrn = data.PatientMrn
  patientInfo.PatientName = data.PatientName
  patientInfo.PatientNumber = data.PatientNumber
  patientInfo.PatientSex = data.PatientSex
  patientInfo.PatientSource = data.PatientSource
  patientInfo.PatientWardCode = data.PatientWardCode
  patientInfo.PatientWardName = data.PatientWardName
  patientInfo.PlanStartTime = data.PlanStartTime
  patientInfo.SpecialInfect = data.SpecialInfect
  patientInfo.SubscribeDate = dateFormat(data.SubscribeDate)
})

onMounted(() => {
  const list: ItemInfo[] = getApp().globalData!.deptList
  if (list && list.length) {
    deptList.value = list.map(x => ({
      value: x.ItemCode,
      text: x.ItemName,
      disable: false,
    }))
  }
  refreshPatientInfo()
})
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
            <uni-data-select v-model="patientInfo.PatientDepartmentCode" :localdata="deptList" disabled />
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
          <uni-forms-item label="体重">
            <uni-easyinput type="digit" disabled />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="身高">
            <uni-easyinput type="number" disabled />
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
  ::v-deep .is-disabled {
    color: inherit;
  }
}
</style>

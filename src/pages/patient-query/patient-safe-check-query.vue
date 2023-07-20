<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import PatientQuerySelectStatus from './components/patient-query-select-status.vue'
import PatientQuerySelectPain from './components/patient-query-select-pain.vue'
import PatientQuerySelectSpan from './components/patient-query-select-span.vue'
import PatientQueryPopupPatientConfirm from './components/patient-query-popup-patient-confirm.vue'
import PatientQueryPopupSettingAccesstime from './components/patient-query-popup-setting-accesstime.vue'
import { getCheckPatientList } from '@/utils/api'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { goToCheckDetailPage } from '@/composables'

const dataSet = ref<ApiResonseType.SafeCheckInfo[]>([])

const queryData = reactive<ApiRequestType.PatientSafeCheckQueryInput>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '',
  OperateState: -1,
  RoomCode: '',
  Analgesia: -1,
  DeptType: '',
  ExamineSpan: '',
})

const pageData = reactive({
  confirmPopup: false,
  currentRow: {},
  settingPopup: false,
})

function onSubmit(query?: QueryInfo) {
  queryData.KeyWord = query?.query ?? ''
  queryData.ExamineDate = query?.date ?? ''
  queryData.DepartmentName = query?.department ?? ''
  queryData.RoomCode = query?.roomCode ?? ''
  queryData.DeptType = query?.deptType ?? ''

  getCheckPatientList(queryData).then((data) => {
    dataSet.value = data
  })
}

function onRowClick(data: ApiResonseType.SafeCheckInfo) {
  pageData.currentRow = data
  if (data.FormChecked)
    goToCheckDetailPage(data.Id, data.IsAnalgesia)
  else
    pageData.confirmPopup = true
}

const patientId = computed(() => (pageData.currentRow as any).Id || '')

function onAccessTimeSaved() {
  const isAnalgesia = (pageData.currentRow as any).IsAnalgesia
  if (isAnalgesia !== undefined)
    goToCheckDetailPage(patientId.value, isAnalgesia)
}
</script>

<template>
  <view class="page  patient-safe-check-query">
    <PatientQueryForm show-room-item :show-department="false" show-dept-type @submit="onSubmit">
      <template #append>
        <uni-row>
          <uni-col :span="11">
            <PatientQuerySelectStatus v-model="queryData.OperateState" />
          </uni-col>
          <uni-col :offset="1" :span="12">
            <PatientQuerySelectPain v-model="queryData.Analgesia" />
          </uni-col>
        </uni-row>
        <uni-row class="m-t-2">
          <uni-col :span="11">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
          <uni-col :offset="1" :span="12">
            <PatientQuerySelectSpan v-model="queryData.ExamineSpan" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" show-pain @row-click="onRowClick" />
    <PatientQueryPopupPatientConfirm v-model:show="pageData.confirmPopup" :data="pageData.currentRow as any"
      @confirm="() => pageData.settingPopup = true" />
    <PatientQueryPopupSettingAccesstime v-model:show="pageData.settingPopup" :patient-id="patientId"
      :data="pageData.currentRow as any" @saved="onAccessTimeSaved" />
  </view>
</template>

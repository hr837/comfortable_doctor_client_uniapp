<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
import PatientQueryPopup from './components/patient-query-popup.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import type { PreOperativePatientInfo } from '@/types/patient.type'
import { goToNarcoticDetailPage, goToPatientAttchPage } from '@/composables'
import { queryPatients } from '@/utils/api'
import { ApiDataConvert, type ApiRequestType } from '@/utils/api.help'

const dataSet = ref<PreOperativePatientInfo[]>([])
const pageData = reactive({
  row: {},
  showPopup: false,
})

const queryData = reactive<ApiRequestType.Patient>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '全部',
  OperateState: -1,
})

function onSubmit(query: QueryInfo) {
  queryData.KeyWord = query.query
  queryData.ExamineDate = query.date
  queryData.DepartmentName = query.department

  queryPatients(queryData).then((data) => {
    dataSet.value = data.map(ApiDataConvert.PatientInfoConvert)
  }).catch(() => { })
}

function onRowClick(data: PreOperativePatientInfo) {
  pageData.row = data
  pageData.showPopup = true
}

function onPopupCommand(command: PopupCommandType) {
  if (command === 'narcotizingRecord')
    goToNarcoticDetailPage(pageData.row as PreOperativePatientInfo)
  else
    goToPatientAttchPage(pageData.row as PreOperativePatientInfo, command)
}

onMounted(() => onSubmit({} as any))
</script>

<template>
  <view class="page  patient-query">
    <PatientQueryForm @submit="onSubmit">
      <template #append>
        <uni-row>
          <uni-col :xs="24" :sm="12">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" @row-click="onRowClick" />
    <PatientQueryPopup v-model:show="pageData.showPopup" :data="pageData.row as any" @command="onPopupCommand" />
  </view>
</template>

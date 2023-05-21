<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
// import PatientQueryPopup from './components/patient-query-popup.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import PatientQuerySelectStatus from './components/patient-query-select-status.vue'
import PatientQuerySelectPain from './components/patient-query-select-pain.vue'
import { goToCheckDetailPage } from '@/composables'
import { queryPatients } from '@/utils/api'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'

const dataSet = ref<ApiResonseType.PatientInfo[]>([])
// const pageData = reactive({
//   row: {},
//   showPopup: false,
// })

const queryData = reactive<ApiRequestType.Patient>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '',
  OperateState: -1,
  RoomCode: '',
  PainState: -1,
})

function onSubmit(query?: QueryInfo) {
  queryData.KeyWord = query?.query ?? ''
  queryData.ExamineDate = query?.date ?? ''
  queryData.DepartmentName = query?.department ?? ''

  queryPatients(queryData).then((data) => {
    dataSet.value = data
  })
}

function onRowClick(data: ApiResonseType.PatientInfo) {
  goToCheckDetailPage(data)
  // pageData.row = data
  // pageData.showPopup = true
}

// function onPopupCommand(command: PopupCommandType) {
//   if (command === 'narcotizingRecord')
//     goToNarcoticDetailPage(pageData.row as ApiResonseType.PatientInfo)
//   else
//     goToPatientAttchPage(pageData.row as ApiResonseType.PatientInfo, command)
// }
</script>

<template>
  <view class="page  patient-safe-check-query">
    <PatientQueryForm show-room-item @submit="onSubmit">
      <template #append>
        <uni-row>
          <uni-col :xs="22" :sm="11">
            <PatientQuerySelectStatus v-model="queryData.OperateState" />
          </uni-col>
          <uni-col :offset="1" :xs="22" :sm="12">
            <PatientQuerySelectPain v-model="queryData.PainState" />
          </uni-col>
        </uni-row>
        <uni-row class="m-t-2">
          <uni-col :xs="24" :sm="16">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" @row-click="onRowClick" />
    <!-- <PatientQueryPopup v-model:show="pageData.showPopup" :data="pageData.row as any" @command="onPopupCommand" /> -->
  </view>
</template>

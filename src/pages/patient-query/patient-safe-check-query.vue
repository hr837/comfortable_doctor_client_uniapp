<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import PatientQuerySelectStatus from './components/patient-query-select-status.vue'
import PatientQuerySelectPain from './components/patient-query-select-pain.vue'
import PatientQuerySelectSpan from './components/patient-query-select-span.vue'
import { goToCheckDetailPage } from '@/composables'
import { getCheckPatientList } from '@/utils/api'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'

const dataSet = ref<ApiResonseType.PatientInfo[]>([])

const queryData = reactive<ApiRequestType.PatientSafeCheckQueryInput>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '',
  OperateState: -1,
  RoomCode: '',
  Analgesia: -1,
  ExamineSpan: '',
})

function onSubmit(query?: QueryInfo) {
  queryData.KeyWord = query?.query ?? ''
  queryData.ExamineDate = query?.date ?? ''
  queryData.DepartmentName = query?.department ?? ''

  getCheckPatientList(queryData).then((data) => {
    dataSet.value = data
  })
}

function onRowClick(data: ApiResonseType.PatientInfo) {
  goToCheckDetailPage(data)
}
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
            <PatientQuerySelectPain v-model="queryData.Analgesia" />
          </uni-col>
        </uni-row>
        <uni-row class="m-t-2">
          <uni-col :xs="22" :sm="11">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
          <uni-col :offset="1" :xs="22" :sm="12">
            <PatientQuerySelectSpan v-model="queryData.ExamineSpan" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" @row-click="onRowClick" />
  </view>
</template>

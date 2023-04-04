<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import PatientQuerySelectStatus from './components/patient-query-select-status.vue'
import { goToNarcoticDetailPage } from '@/composables'
import type { PreOperativePatientInfo } from '@/types/patient.type'
import { queryPatients } from '@/utils/api'
import { ApiDataConvert, type ApiRequestType } from '@/utils/api.help'

const dataSet = ref<PreOperativePatientInfo[]>([])

const queryData = reactive<ApiRequestType.Patient>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '全部',
  OperateState: -1,
})

async function onSubmit(query: QueryInfo) {
  queryData.KeyWord = query.query
  queryData.ExamineDate = query.date
  queryData.DepartmentName = query.department

  queryPatients(queryData).then((data) => {
    dataSet.value = data.map(ApiDataConvert.PatientInfoConvert)
  }).catch(() => { })
}
</script>

<template>
  <view class="page  patient-narcotic-query">
    <PatientQueryForm @submit="onSubmit">
      <template #append>
        <uni-row>
          <uni-col :offset="2" :xs="22" :sm="10">
            <PatientQuerySelectStatus v-model="queryData.OperateState" />
          </uni-col>
          <uni-col :offset="2" :xs="22" :sm="10">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" @row-click="goToNarcoticDetailPage" />
  </view>
</template>

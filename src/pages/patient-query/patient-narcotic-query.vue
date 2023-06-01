<script lang="ts" setup>
import PatientQueryForm, { type QueryInfo } from './components/patient-query-form.vue'
import PatientQueryList from './components/patient-query-list.vue'
import PatientQuerySelectSource from './components/patient-query-select-source.vue'
import PatientQuerySelectStatus from './components/patient-query-select-status.vue'
import { goToNarcoticDetailPage } from '@/composables'
import { queryPatients } from '@/utils/api'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'

const dataSet = ref<ApiResonseType.PatientInfo[]>([])

const queryData = reactive<ApiRequestType.Patient>({
  KeyWord: '',
  ExamineDate: '',
  DepartmentName: '',
  PatientSource: '',
  OperateState: -1,
  RoomCode: '',
})

async function onSubmit(query?: QueryInfo) {
  queryData.KeyWord = query?.query ?? ''
  queryData.ExamineDate = query?.date ?? ''
  queryData.DepartmentName = query?.department ?? ''
  queryData.RoomCode = query?.roomCode ?? ''

  queryPatients(queryData).then((data) => {
    dataSet.value = data
  })
}
</script>

<template>
  <view class="page  patient-narcotic-query">
    <PatientQueryForm show-department show-room-item @submit="onSubmit">
      <template #append>
        <uni-row>
          <uni-col :offset="1" :xs="22" :sm="11">
            <PatientQuerySelectStatus v-model="queryData.OperateState" />
          </uni-col>
          <uni-col :offset="1" :xs="22" :sm="11">
            <PatientQuerySelectSource v-model="queryData.PatientSource" />
          </uni-col>
        </uni-row>
      </template>
    </PatientQueryForm>
    <PatientQueryList class="!p-t-0" :data="dataSet" @row-click="goToNarcoticDetailPage" />
  </view>
</template>

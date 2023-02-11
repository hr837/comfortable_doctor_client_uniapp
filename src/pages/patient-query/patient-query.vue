<script lang="ts" setup>
import PatientQueryTable from './components/patient-query-table.vue'
import PatientQueryForm from './components/patient-query-form.vue'
import PatientQueryPopup from './components/patient-query-popup.vue'
import { getPatienData } from '@/composables/patient-query'
import type { PreOperativePatientInfo } from '@/types/patient.type'
import { goToNarcoticDetailPage, goToPatientAttchPage } from '@/composables'

let dataSet = $ref<PreOperativePatientInfo[]>([])
const pageData = $ref({
  row: {},
  showPopup: false,
})

async function onSubmit(query: any) {
  const data = await getPatienData()
  if (data && data.length)
    dataSet = data
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
</script>

<template>
  <view class="page  patient-query">
    <PatientQueryForm @submit="onSubmit" />
    <PatientQueryTable :data="dataSet" @row-click="onRowClick" />
    <PatientQueryPopup v-model:show="pageData.showPopup" :data="pageData.row as any" @command="onPopupCommand" />
  </view>
</template>

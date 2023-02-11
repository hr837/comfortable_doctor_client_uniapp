<script lang="ts" setup>
import PatientQueryTable from './components/patient-query-table.vue'
import PatientQueryForm from './components/patient-query-form.vue'
import { getPatienData } from '@/composables/patient-query'
import { goToNarcoticDetailPage } from '@/composables'
import type { PreOperativePatientInfo } from '@/types/patient.type'

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
</script>

<template>
  <view class="page  patient-narcotic-query">
    <PatientQueryForm @submit="onSubmit" />
    <PatientQueryTable :data="dataSet" @row-click="goToNarcoticDetailPage" />
  </view>
</template>

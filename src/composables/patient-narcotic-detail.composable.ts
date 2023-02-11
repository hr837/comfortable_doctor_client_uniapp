import PatientBaseInfoForm from '@/pages/patient-detail/components/patient-base-info-form.vue'
import PatientDrugRecord from '@/pages/patient-detail/components/patient-drug-record.vue'
import PatientNarcoticResult from '@/pages/patient-detail/components/patient-narcotic-result.vue'
import PatientTransfusionRecord from '@/pages/patient-detail/components/patient-transfusion-record.vue'
import PatientVitalsignRecord from '@/pages/patient-detail/components/patient-vital-sign-record.vue'
export const ComponentSetting = [
  { label: '基本信息', name: 'patient-base-info-form', component: PatientBaseInfoForm },
  { label: '麻醉用药', name: 'patient-drug-record', component: PatientDrugRecord },
  { label: '输液', name: 'patient-transfusion-record', component: PatientTransfusionRecord },
  { label: '生命体征', name: 'patient-vital-sign-record', component: PatientVitalsignRecord },
  { label: '麻醉小结', name: 'patient-narcotic-result', component: PatientNarcoticResult },
]

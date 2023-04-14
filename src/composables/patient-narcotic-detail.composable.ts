import dayJs from 'dayjs'
import PatientBaseInfoForm from '@/pages/patient-detail/components/patient-base-info-form.vue'
import PatientNarcoticDrugRecord from '@/pages/patient-detail/components/patient-narcotic-drug-record.vue'
import PatientNarcoticResult from '@/pages/patient-detail/components/patient-narcotic-result.vue'
import PatientTransfusionRecord from '@/pages/patient-detail/components/patient-transfusion-record.vue'
import PatientVitalsignRecord from '@/pages/patient-detail/components/patient-vital-sign-record.vue'
import { getDrugList, getDrugUnitList, getDrugWayList } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'

export const ComponentSetting = [
  { label: '基本信息', name: 'patient-base-info-form', component: PatientBaseInfoForm },
  { label: '麻醉用药', name: 'patient-narcotic-drug-record', component: PatientNarcoticDrugRecord },
  { label: '输液', name: 'patient-transfusion-record', component: PatientTransfusionRecord },
  { label: '生命体征', name: 'patient-vital-sign-record', component: PatientVitalsignRecord },
  { label: '麻醉小结', name: 'patient-narcotic-result', component: PatientNarcoticResult },
]

export const PatientDetailDict = {
  /** 液体类型 */
  drugTypeList: [{ value: '晶体液', text: '晶体液', disable: false }, { value: '胶体液', text: '胶体液', disable: false }],
  /** 用药时长类型 */
  drugFlagList: [{ value: '1', text: '持续', disabled: false }, { value: '0', text: '单次', disabled: false }],
  has: [{ text: '无', value: 'n', disabled: false }, { text: '有', value: 'y', disabled: false }],
  comToLifeState: [{ text: '完全清醒', value: 'n', disabled: false }, { text: '对刺激有反应', value: 'y', disabled: false }, { text: '对刺激无反应', value: 'z', disabled: false }],
  breathActiveState: [{ text: '可按医师吩咐咳嗽', value: 'n', disabled: false }, { text: '可自主维持呼吸道通畅', value: 'y', disabled: false }, { text: '呼吸道需予以支持', value: 'z', disabled: false }],
  bodyActiveState: [{ text: '肢体活动有意识的活动', value: 'n', disabled: false }, { text: '肢体活动无意识活动', value: 'y', disabled: false }, { text: '肢体无活动', value: 'z', disabled: false }],
  passTo: [{ text: '恢复室', value: 'n', disabled: false }, { text: '观察室', value: 'y', disabled: false }, { text: '其它', value: 'z', disabled: false }],
}

interface DropDownItemInfo {
  text: string
  value: string
  disable: boolean
}

/** 药品单位数据 */
export const drugUnitList = ref<DropDownItemInfo[]>([])
/** 药品使用方式数据 */
export const drugUseModeList = ref<DropDownItemInfo[]>([])

/** 麻醉用药列表 */
export const drugNarcoticList = ref<ApiResonseType.DrugInfo[]>([])
/** 输液用药列表 */
export const drugTransfusionList = ref<ApiResonseType.DrugInfo[]>([])

/** 初始化下拉框的数据 */
export function initSelectOptions() {
  getDrugUnitList().then((data) => {
    drugUnitList.value = data.map(item => ({
      text: item.ItemName,
      value: item.ItemName,
      disable: false,
    }))
  })

  getDrugWayList().then((data) => {
    drugUseModeList.value = data.map(item => ({
      text: item.ItemName,
      value: item.ItemName,
      disable: false,
    }))
  })

  getDrugList('2').then((data) => {
    drugTransfusionList.value = data
  })

  getDrugList('3').then((data) => {
    drugNarcoticList.value = data
  })
}

/** 用药方式格式化 */
export function dictConvertDrugFlag(type?: string) {
  switch (type) {
    case '0':
      return '单次'
    case '1':
      return '持续'
    default:
      return ''
  }
}

/** 时间格式化 */
export function dateFormat(date: string, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dayJs(date).format(fmt)
}

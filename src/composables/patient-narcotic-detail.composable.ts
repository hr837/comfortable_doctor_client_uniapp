import { dateFormat } from '.'
import { getDrugList, getDrugUnitList, getDrugWayList, getMonitorItems, getPatientDetail } from '@/utils/api'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'

export const ComponentSetting = [
  { label: '基本信息', name: 'patient-base-info-form' },
  { label: '麻醉用药', name: 'patient-narcotic-drug-record' },
  { label: '输液', name: 'patient-transfusion-record' },
  { label: '生命体征', name: 'patient-vital-sign-record' },
  { label: '麻醉小结', name: 'patient-narcotic-result' },
]

export const PatientDetailDict = {
  /** 液体类型 */
  drugTypeList: [{ value: '晶体液', text: '晶体液', disable: false }, { value: '胶体液', text: '胶体液', disable: false }],
  /** 用药时长类型 */
  drugFlagList: [{ value: '1', text: '持续', disabled: false }, { value: '0', text: '单次', disabled: false }],
  has: [{ text: '无', value: '无', disabled: false }, { text: '有', value: '有', disabled: false }],
  comToLifeState: [{ text: '完全清醒-2分', value: 2, disabled: false }, { text: '对刺激有反应-1分', value: 1, disabled: false }, { text: '对刺激无反应-0分', value: 0, disabled: false }],
  breathActiveState: [{ text: '可以呼叫、自主咳嗽、咳痰-2分', value: 2, disabled: false }, { text: '可以保留呼吸道通畅-1分', value: 1, disabled: false }, { text: '呼吸道不能保持通畅-0分', value: 0, disabled: false }],
  bodyActiveState: [{ text: '有意识的肢体活动-2分', value: 2, disabled: false }, { text: '无意识的肢体活动-1分', value: 1, disabled: false }, { text: '无任何肢体活动-0分', value: 0, disabled: false }],
  passTo: [{ text: '恢复室', value: '恢复室', disabled: false }, { text: '观察室', value: '观察室', disabled: false }, { text: '其他', value: '其他', disabled: false }],
  canLeave: [{ text: '可', value: '可', disabled: false }, { text: '否', value: '否', disabled: false }],
  // 离院标准
  vitalsignState: [{ text: '波动在术前值得20%以内-2分', value: 2, disabled: false }, { text: '波动在术前值的20-40%-1分', value: 1, disabled: false }, { text: '波动大于术前值的40%-0分', value: 0, disabled: false }],
  activeState: [{ text: '步态平稳而不感头晕或达到术前水平-2分', value: 2, disabled: false }, { text: '需要搀扶才可行走-1分', value: 1, disabled: false }, { text: '完全不能行走-0分', value: 0, disabled: false }],
  nauseaState: [{ text: '轻度:不需要治疗-2分', value: 2, disabled: false }, { text: '中度:药物治疗有效-1分', value: 1, disabled: false }, { text: '重度:治疗无效-0分', value: 0, disabled: false }],
  painState: [{ text: 'VAS 0~3分，离院前疼痛轻微或无疼痛-2分', value: 2, disabled: false }, { text: 'VAS 4~6分，中度疼痛-1分', value: 1, disabled: false }, { text: 'VAS 7~10分，重度疼痛-0分', value: 0, disabled: false }],
  bleedingState: [{ text: '轻度，不需要换药-2分', value: 2, disabled: false }, { text: '中度，最多换2次药，无继续出血-1分', value: 1, disabled: false }, { text: '重度，需换药3次以上，持续出血-0分', value: 0, disabled: false }],

  source: [{ text: '门诊', value: '门诊', disable: false }, { text: '住院', value: '住院', disable: false }],
  bloodType: [{ text: '未检测', value: '', disable: false }, { text: 'A型', value: 'a', disable: false }, { text: 'B型', value: 'b', disable: false }, { text: 'AB型', value: 'ab', disable: false }, { text: 'O型', value: 'o', disable: false }],
  bolldRH: [{ text: '未检测', value: '', disable: false }, { text: '阳性', value: '+', disable: false }, { text: '阴性', value: '-', disable: false }],
  operation: [{ text: '宫腔镜', value: 'gqj', disable: false }, { text: '气管检查镜', value: 'qgjcj', disable: false }, { text: '人流', value: 'rl', disable: false }],
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

/** 体征项目 */
export const monitorItems = ref<ApiResonseType.MonitorConfigInfo[]>([])

/** 详情页模板 */
export const packageInfo = ref<ApiResonseType.PackageInfo[]>([])

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

/** 初始化体征监测数据 */
export function initMonitorItems(patientId: string) {
  getMonitorItems(patientId).then(data => monitorItems.value = data)
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

export function narcoticItemsConvert(data: any) {
  const items: ApiRequestType.NarcoticItemInfo[] = []
  Object.entries(data).forEach(([key, value]) => {
    switch (key) {
      // 术中特殊情况：
      case 'specific':
        PatientDetailDict.has.forEach((item) => {
          items.push({
            ItemName: `术中特殊情况${item.text}`,
            ItemValue: item.value === value,
            ControlType: 'InputTextBox',
          })
        })
        if (value === '有') {
          items.push({
            ItemName: '术中特殊情况',
            ItemValue: data.specificText,
            ControlType: 'InputTextBox',
          })
        }
        break
      // Steward评分：
      case 'comToLifeState':
        items.push({
          ItemName: 'Steward1',
          ItemValue: PatientDetailDict.comToLifeState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'breathActiveState':
        items.push({
          ItemName: 'Steward2',
          ItemValue: PatientDetailDict.breathActiveState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'bodyActiveState':
        items.push({
          ItemName: 'Steward3',
          ItemValue: PatientDetailDict.bodyActiveState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      // 术后转：
      case 'passTo':
        PatientDetailDict.passTo.forEach((item) => {
          items.push({
            ItemName: `术后转${item.text}`,
            ItemValue: item.value === value,
            ControlType: 'InputTextBox',
          })
        })
        if (value === '其他') {
          items.push({
            ItemName: '术后转其他内容',
            ItemValue: data.passToText,
            ControlType: 'InputTextBox',
          })
        }
        break
      // 签名
      case 'narcoticDoctorName':
        items.push({
          ItemName: '麻醉医师签名1#BTN#',
          ItemValue: value as string,
          ControlType: 'InputComboBox',
        })
        break
      case 'narcoticDoctorSign':
        items.push({
          ItemName: '麻醉医师签名1#IMG#',
          ItemValue: value as string,
          ControlType: 'InputImage',
        })
        break
      case 'narcoticDoctorDate':
        items.push({
          ItemName: '麻醉医师签名1#DATE#',
          ItemValue: dateFormat(value as string),
          ControlType: 'InputDatePicker',
        }, {
          ItemName: '麻醉医师签名1#TIME#',
          ItemValue: dateFormat(value as string, 'HH:mm:ss'),
          ControlType: 'InputTimePicker',
        })
        break
      case 'narcoticDoctor2Name':
        items.push({
          ItemName: '麻醉医师签名2#BTN#',
          ItemValue: value as string,
          ControlType: 'InputComboBox',
        })
        break
      case 'narcoticDoctor2Sign':
        items.push({
          ItemName: '麻醉医师签名2#IMG#',
          ItemValue: value as string,
          ControlType: 'InputImage',
        })
        break
      case 'narcoticDoctor2Date':
        items.push({
          ItemName: '麻醉医师签名2#DATE#',
          ItemValue: dateFormat(value as string),
          ControlType: 'InputDatePicker',
        }, {
          ItemName: '麻醉医师签名2#TIME#',
          ItemValue: dateFormat(value as string, 'HH:mm:ss'),
          ControlType: 'InputTimePicker',
        })
        break
      case 'nurseName':
        items.push({
          ItemName: '护士签名1#BTN#',
          ItemValue: value as string,
          ControlType: 'InputComboBox',
        })
        break
      case 'nurseSign':
        items.push({
          ItemName: '护士签名1#IMG#',
          ItemValue: value as string,
          ControlType: 'InputImage',
        })
        break
      case 'nurseDate':
        items.push({
          ItemName: '护士签名1#DATE#',
          ItemValue: dateFormat(value as string),
          ControlType: 'InputDatePicker',
        }, {
          ItemName: '护士签名1#TIME#',
          ItemValue: dateFormat(value as string, 'HH:mm:ss'),
          ControlType: 'InputTimePicker',
        })
        break
      // 恢复室内情况：
      case 'recoverySpecific':
        PatientDetailDict.has.forEach((item) => {
          items.push({
            ItemName: `恢复室内情况${item.text}`,
            ItemValue: item.value === value,
            ControlType: 'InputTextBox',
          })
        })
        if (value === '有') {
          items.push({
            ItemName: '恢复室内情况',
            ItemValue: data.recoverySpecificText,
            ControlType: 'InputTextBox',
          })
        }
        break
      // PADS
      case 'vitalsignState':
        items.push({
          ItemName: 'PADS1',
          ItemValue: PatientDetailDict.vitalsignState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'activeState':
        items.push({
          ItemName: 'PADS2',
          ItemValue: PatientDetailDict.activeState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'nauseaState':
        items.push({
          ItemName: 'PADS3',
          ItemValue: PatientDetailDict.nauseaState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'painState':
        items.push({
          ItemName: 'PADS4',
          ItemValue: PatientDetailDict.painState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      case 'bleedingState':
        items.push({
          ItemName: 'PADS5',
          ItemValue: PatientDetailDict.bleedingState.find(x => x.value === value)?.text ?? '',
          ControlType: 'InputComboBox',
        })
        break
      // 可否出科：
      case 'canLeave':
        PatientDetailDict.canLeave.forEach((item) => {
          items.push({
            ItemName: `离院${item.text}`,
            ItemValue: item.value === value,
            ControlType: 'InputTextBox',
          })
        })
        break
    }
  })
  return items
}

export function narcoticItemRevert({ Items }: ApiResonseType.NarcoticResult, model: any) {
  if (!Items.length)
    return

  Items.forEach((item) => {
    switch (item.ItemName) {
      case '术中特殊情况无':
        if (item.ItemValue === 'true')
          model.specific = '无'
        break
      case '术中特殊情况有':
        if (item.ItemValue === 'true')
          model.specific = '有'
        break
      case '术中特殊情况':
        model.specificText = item.ItemValue
        break
      case 'Steward1':
        model.comToLifeState = PatientDetailDict.comToLifeState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'Steward2':
        model.breathActiveState = PatientDetailDict.breathActiveState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'Steward3':
        model.bodyActiveState = PatientDetailDict.bodyActiveState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'Steward总分':
        model.StewardCount = item.ItemValue
        break
      case '术后转恢复室':
        if (item.ItemValue === 'true')
          model.passTo = '恢复室'
        break
      case '术后转观察室':
        if (item.ItemValue === 'true')
          model.passTo = '观察室'
        break
      case '术后转其他':
        if (item.ItemValue === 'true')
          model.passTo = '其他'
        break
      case '术后转其他内容':
        model.passToText = item.ItemValue
        break
      case '麻醉医师签名1#BTN#':
        model.narcoticDoctorName = item.ItemValue
        break
      case '麻醉医师签名1#IMG#':
        model.narcoticDoctorSign = item.ItemValue
        break

      case '麻醉医师签名1#DATE#':
        if (model.narcoticDoctorDate) {
          if (model.narcoticDoctorDate.includes(':'))
            model.narcoticDoctorDate = `${item.ItemValue} ${model.narcoticDoctorDate}`
        }
        else {
          model.narcoticDoctorDate = item.ItemValue
        }
        break
      case '麻醉医师签名1#TIME#':
        if (model.narcoticDoctorDate) {
          if (model.narcoticDoctorDate.includes('-'))
            model.narcoticDoctorDate += ` ${item.ItemValue}`
        }
        else {
          model.narcoticDoctorDate = item.ItemValue
        }
        break
      case '恢复室内情况无':
        if (item.ItemValue === 'true')
          model.recoverySpecific = '无'
        break
      case '恢复室内情况有':
        if (item.ItemValue === 'true')
          model.recoverySpecific = '有'
        break
      case '恢复室内情况':
        if (item.ItemValue === 'true')
          model.recoverySpecificText = '有'
        break
      case 'PADS1':
        model.vitalsignState = PatientDetailDict.vitalsignState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'PADS2':
        model.activeState = PatientDetailDict.activeState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'PADS3':
        model.nauseaState = PatientDetailDict.nauseaState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'PADS4':
        model.painState = PatientDetailDict.painState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'PADS5':
        model.bleedingState = PatientDetailDict.bleedingState.find(x => x.text === item.ItemValue)?.value || 0
        break
      case 'PADS评分':
        model.PADSCount = item.ItemValue
        break
      case '离院可':
        if (item.ItemValue === 'true')
          model.canLeave = '可'
        break
      case '离院否':
        if (item.ItemValue === 'true')
          model.canLeave = '否'
        break
      case '麻醉医师签名2#BTN#':
        model.narcoticDoctor2Name = item.ItemValue
        break
      case '麻醉医师签名2#IMG#':
        model.narcoticDoctor2Sign = item.ItemValue
        break
      case '麻醉医师签名2#DATE#':
        if (model.narcoticDoctor2Date) {
          if (model.narcoticDoctor2Date.includes(':'))
            model.narcoticDoctor2Date = `${item.ItemValue} ${model.narcoticDoctor2Date}`
        }
        else {
          model.narcoticDoctor2Date = item.ItemValue
        }
        break
      case '麻醉医师签名2#TIME#':
        if (model.narcoticDoctor2Date) {
          if (model.narcoticDoctor2Date.includes('-'))
            model.narcoticDoctor2Date += ` ${item.ItemValue}`
        }
        else {
          model.narcoticDoctor2Date = item.ItemValue
        }
        break
      case '护士签名1#BTN#':
        model.nurseName = item.ItemValue
        break
      case '护士签名1#IMG#':
        model.nurseSign = item.ItemValue
        break
      case '护士签名1#DATE#':
        if (model.nurseDate) {
          if (model.nurseDate.includes(':'))
            model.nurseDate = `${item.ItemValue} ${model.nurseDate}`
        }
        else {
          model.nurseDate = item.ItemValue
        }
        break
      case '护士签名1#TIME#':
        if (model.nurseDate) {
          if (model.nurseDate.includes('-'))
            model.nurseDate += ` ${item.ItemValue}`
        }
        else {
          model.nurseDate = item.ItemValue
        }
        break
      default:
        break
    }
  })
}

/**
 * 病人详情信息
 */
export const patientInfo = reactive<ApiResonseType.PatientDetailInfo>({
  AccessPacuTime: '',
  AccessTime: '',
  AnesthesiaBeginTime: '',
  AnesthesiaEndTime: '',
  AnesthesiaMethodCode: '',
  AnesthesiaMethodName: '',
  Anesthetist1Code: '',
  Anesthetist1Name: '',
  Anesthetist3Code: '',
  Anesthetist3Name: '',
  AppointmentCancel: '',
  AssessTime: '',
  DiagnosisCode: '',
  DiagnosisName: '',
  DoctorCode: '',
  DoctorName: '',
  ExamineTime: '',
  ExamineType: '',
  ExtubationTime: '',
  Id: '',
  IntubateTime: '',
  IsChecked: true,
  IsEmergency: false,
  LeavePacuTime: '',
  LeaveTime: '',
  NurseCode: '',
  NurseName: '',
  OperateCancel: '',
  OperatingRoomCode: '',
  OperatingRoomName: '',
  OperationBeginTime: '',
  OperationCode: '',
  OperationEndTime: '',
  OperationName: '',
  OperatorCode: '',
  OperatorName: '',
  Opinion: '',
  PatientAge: '',
  PatientBedCode: '',
  PatientBedName: '',
  PatientBirthday: '',
  PatientDepartmentCode: '',
  PatientDepartmentName: '',
  PatientIdCard: '',
  PatientIdentity: '',
  PatientMrn: '',
  PatientName: '',
  PatientNumber: '',
  PatientSex: '',
  PatientSource: '',
  PatientWardCode: '',
  PatientWardName: '',
  PlanStartTime: '',
  SpecialInfect: '',
  SubscribeDate: '',
  SubscribeId: '',
  PatientHeight: '',
  PatientWeight: '',
})

/** 当前详情页是否可以编辑 */
export const canEdit = computed(() => patientInfo.IsChecked !== true)

/**
 * 初始化病人详情信息
 */
export const initPatientInfo = () => {
  patientInfo.AccessPacuTime = ''
  patientInfo.AccessTime = ''
  patientInfo.AnesthesiaBeginTime = ''
  patientInfo.AnesthesiaEndTime = ''
  patientInfo.AnesthesiaMethodCode = ''
  patientInfo.AnesthesiaMethodName = ''
  patientInfo.Anesthetist1Code = ''
  patientInfo.Anesthetist1Name = ''
  patientInfo.Anesthetist3Code = ''
  patientInfo.Anesthetist3Name = ''
  patientInfo.AppointmentCancel = ''
  patientInfo.AssessTime = ''
  patientInfo.DiagnosisCode = ''
  patientInfo.DiagnosisName = ''
  patientInfo.DoctorCode = ''
  patientInfo.DoctorName = ''
  patientInfo.ExamineTime = ''
  patientInfo.ExamineType = ''
  patientInfo.ExtubationTime = ''
  patientInfo.Id = ''
  patientInfo.IntubateTime = ''
  patientInfo.IsChecked = true
  patientInfo.IsEmergency = false
  patientInfo.LeavePacuTime = ''
  patientInfo.LeaveTime = ''
  patientInfo.NurseCode = ''
  patientInfo.NurseName = ''
  patientInfo.OperateCancel = ''
  patientInfo.OperatingRoomCode = ''
  patientInfo.OperatingRoomName = ''
  patientInfo.OperationBeginTime = ''
  patientInfo.OperationCode = ''
  patientInfo.OperationEndTime = ''
  patientInfo.OperationName = ''
  patientInfo.OperatorCode = ''
  patientInfo.OperatorName = ''
  patientInfo.Opinion = ''
  patientInfo.PatientAge = ''
  patientInfo.PatientBedCode = ''
  patientInfo.PatientBedName = ''
  patientInfo.PatientBirthday = ''
  patientInfo.PatientDepartmentCode = ''
  patientInfo.PatientDepartmentName = ''
  patientInfo.PatientIdCard = ''
  patientInfo.PatientIdentity = ''
  patientInfo.PatientMrn = ''
  patientInfo.PatientName = ''
  patientInfo.PatientNumber = ''
  patientInfo.PatientSex = ''
  patientInfo.PatientSource = ''
  patientInfo.PatientWardCode = ''
  patientInfo.PatientWardName = ''
  patientInfo.PlanStartTime = ''
  patientInfo.SpecialInfect = ''
  patientInfo.SubscribeDate = ''
  patientInfo.SubscribeId = ''
  patientInfo.PatientHeight = ''
  patientInfo.PatientWeight = ''
}

/** 刷新病人信息 */
export const refreshPatientInfo = (id: string) => getPatientDetail(id).then((data) => {
  patientInfo.AccessPacuTime = data.AccessPacuTime
  patientInfo.AccessTime = data.AccessTime
  patientInfo.AnesthesiaBeginTime = data.AnesthesiaBeginTime
  patientInfo.AnesthesiaEndTime = data.AnesthesiaEndTime
  patientInfo.AnesthesiaMethodCode = data.AnesthesiaMethodCode
  patientInfo.AnesthesiaMethodName = data.AnesthesiaMethodName
  patientInfo.Anesthetist1Code = data.Anesthetist1Code
  patientInfo.Anesthetist1Name = data.Anesthetist1Name
  patientInfo.Anesthetist3Code = data.Anesthetist3Code
  patientInfo.Anesthetist3Name = data.Anesthetist3Name
  patientInfo.AppointmentCancel = data.AppointmentCancel
  patientInfo.AssessTime = data.AssessTime
  patientInfo.DiagnosisCode = data.DiagnosisCode
  patientInfo.DiagnosisName = data.DiagnosisName
  patientInfo.DoctorCode = data.DoctorCode
  patientInfo.DoctorName = data.DoctorName
  patientInfo.ExamineTime = data.ExamineTime
  patientInfo.ExamineType = data.ExamineType
  patientInfo.ExtubationTime = data.ExtubationTime
  patientInfo.Id = data.Id
  patientInfo.IntubateTime = data.IntubateTime
  patientInfo.IsChecked = data.IsChecked
  patientInfo.IsEmergency = data.IsEmergency
  patientInfo.LeavePacuTime = data.LeavePacuTime
  patientInfo.LeaveTime = data.LeaveTime
  patientInfo.NurseCode = data.NurseCode
  patientInfo.NurseName = data.NurseName
  patientInfo.OperateCancel = data.OperateCancel
  patientInfo.OperatingRoomCode = data.OperatingRoomCode
  patientInfo.OperatingRoomName = data.OperatingRoomName
  patientInfo.OperationBeginTime = data.OperationBeginTime
  patientInfo.OperationCode = data.OperationCode
  patientInfo.OperationEndTime = data.OperationEndTime
  patientInfo.OperationName = data.OperationName
  patientInfo.OperatorCode = data.OperatorCode
  patientInfo.OperatorName = data.OperatorName
  patientInfo.Opinion = data.Opinion
  patientInfo.PatientAge = data.PatientAge
  patientInfo.PatientBedCode = data.PatientBedCode
  patientInfo.PatientBedName = data.PatientBedName
  patientInfo.PatientBirthday = dateFormat(data.PatientBirthday)
  patientInfo.PatientDepartmentCode = data.PatientDepartmentCode
  patientInfo.PatientDepartmentName = data.PatientDepartmentName
  patientInfo.PatientIdCard = data.PatientIdCard
  patientInfo.PatientIdentity = data.PatientIdentity
  patientInfo.PatientMrn = data.PatientMrn
  patientInfo.PatientName = data.PatientName
  patientInfo.PatientNumber = data.PatientNumber
  patientInfo.PatientSex = data.PatientSex
  patientInfo.PatientSource = data.PatientSource
  patientInfo.PatientWardCode = data.PatientWardCode
  patientInfo.PatientWardName = data.PatientWardName
  patientInfo.PlanStartTime = data.PlanStartTime
  patientInfo.SpecialInfect = data.SpecialInfect
  patientInfo.SubscribeDate = dateFormat(data.SubscribeDate)
  patientInfo.PatientHeight = data.PatientHeight
  patientInfo.PatientWeight = data.PatientWeight
})

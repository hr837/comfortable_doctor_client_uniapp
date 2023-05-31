import queryString from 'query-string'
import dayJs from 'dayjs'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
interface GridMenuInfo {
  /** 显示文字 */
  text: string
  /** Icon名称 */
  icon: string
  /** 对应页面路径 */
  path: string
  roleName: string[]
}

/** 宫格菜单配置 */
export const GridMenuSetting: GridMenuInfo[] = [
  {
    text: '患者查询',
    icon: 'icon-yiliao_dianzishebaoka',
    path: '/pages/patient-query/patient-query',
    roleName: ['Anesthetist', 'OpDoctor'],
  },
  {
    text: '麻醉记录',
    icon: 'icon-yiliao_xindianyi',
    path: '/pages/patient-query/patient-narcotic-query',
    roleName: ['Anesthetist', 'OpDoctor'],
  },
  {
    text: '安全核查',
    icon: 'icon-yiliao_yiliaowendang',
    path: '/pages/patient-query/patient-safe-check-query',
    roleName: ['AnNurse'],
  },
  {
    text: '检查计费',
    icon: 'icon-yiliao_baocunbaogao',
    path: '/pages/patient-query/patient-fee-type-query',
    roleName: ['AnNurse'],
  },
]

export type DetailPageQueryType = Pick<ApiResonseType.PatientInfo, 'PatientName' | 'PatientSex' | 'PatientAge' | 'Id'>

/**
 * 跳转到病人麻醉详情页面
 * @param data 含有病人基本信息的数据
 */
export function goToNarcoticDetailPage(data: ApiResonseType.PatientInfo) {
  const query: DetailPageQueryType = {
    PatientName: data.PatientName,
    PatientSex: data.PatientAge,
    PatientAge: data.PatientSex,
    Id: data.Id,
  }
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-narcotic-detail',
    query: { ...query },
  })

  uni.navigateTo({
    url,
  })
}

/**
 * 跳转到安全核查列表
 * @param patientId 病人ID
 * @param isAnalgesia 是否无痛
 */
export function goToCheckDetailPage(patientId: string, isAnalgesia: boolean) {
  const query = {
    Id: patientId,
    IsAnalgesia: isAnalgesia,
  }
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-safe-check-detail',
    query,
  })

  uni.navigateTo({
    url,
  })
}

/**
 * 跳转到计费明细页面
 * @param patientId 病人ID
 * @param isAnalgesia 是否无痛
 */
export function goToFeeTypeDetailPage(patientId: string, isAnalgesia: boolean) {
  const query = {
    Id: patientId,
    IsAnalgesia: isAnalgesia,
  }
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-fee-type-detail',
    query,
  })

  uni.navigateTo({
    url,
  })
}

/**
 * 跳转到附件查看页面
 * @param data 含有病人基本信息的数据
 */
export function goToPatientAttchPage(data: ApiResonseType.PatientInfo, command: PopupCommandType) {
  const query = {
    name: data.PatientName,
    age: data.PatientAge,
    sex: data.PatientSex,
    // file: command === 'contract' ? data.contractFile : data.visitRecordFile,
    file: '31.pdf',
  }
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-attach-file',
    query,
  })

  uni.navigateTo({
    url,
  })
}

/** 日期格式化 */
export function dateFormat(date: string, fmt = 'YYYY-MM-DD') {
  const tmpDayjs = dayJs(date)
  return tmpDayjs.isValid() ? tmpDayjs.format(fmt) : ''
}

/** 时间r格式化 */
export function dateTimeFormat(date: string, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dateFormat(date, fmt)
}

export function roleFormat(roleName: ApiRequestType.RoleCode) {
  let name = '管理员'
  switch (roleName) {
    case 'Anesthetist':
      name = '麻醉医生'
      break
    case 'OpDoctor':
      name = '手术医生'
      break
    case 'AnNurse':
      name = '护士'
      break
  }
  return name
}

import queryString from 'query-string'
import type { GridMenuInfo } from '@/types/index-page.type'
import type { PatientBaseInfo, PreOperativePatientInfo } from '@/types/patient.type'

/** 宫格菜单配置 */
export const GridMenuSetting: GridMenuInfo[] = [
  {
    text: '患者查询',
    icon: 'icon-yiliao_dianzishebaoka',
    path: '/pages/patient-query/patient-query',
  },
  {
    text: '麻醉记录',
    icon: 'icon-yiliao_xindianyi',
    path: '/pages/patient-query/patient-narcotic-query',
  },
]

// /** 数据字典 */
// export const DictData = {
//   /** 科室 */
//   department: [
//     { text: '消化内科', value: 'xhnk' },
//     { text: '妇产科', value: 'fck' },
//     { text: '耳鼻喉科', value: 'ebhk' },
//   ],
//   /** 性别 */
//   gender: [
//     { text: '男', value: 'nan' },
//     { text: '女', value: 'nv' },
//   ],
//   /**  */
//   ageUnit: [
//     { text: '岁', value: 'y' },
//     { text: '月', value: 'm' },
//     { text: '日', value: 'd' },
//   ],
// }

/**
 * 简化数据 ：获取病人基本信息
 * @param data 列表的数据
 */
export function getPatientBaseData(data: PatientBaseInfo): PatientBaseInfo {
  return {
    name: data.name,
    code: data.code,
    sex: data.sex,
    age: data.age,
    expense: data.expense,
  }
}

/**
 * 跳转到病人麻醉详情页面
 * @param data 含有病人基本信息的数据
 */
export function goToNarcoticDetailPage(data: PatientBaseInfo) {
  const query = getPatientBaseData(data)
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-narcotic-detail',
    query: { ...query },
  })

  uni.navigateTo({
    url,
  })
}

/**
 * 跳转到附件查看页面
 * @param data 含有病人基本信息的数据
 */
export function goToPatientAttchPage(data: PreOperativePatientInfo, command: PopupCommandType) {
  const query = {
    name: data.name,
    age: data.age,
    sex: data.sex,
    file: command === 'contract' ? data.contractFile : data.visitRecordFile,
  }
  const url = queryString.stringifyUrl({
    url: '/pages/patient-detail/patient-attach-file',
    query,
  })

  uni.navigateTo({
    url,
  })
}

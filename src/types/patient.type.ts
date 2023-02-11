/** 患者基本信息 */
export interface PatientBaseInfo {
  /** 姓名 */
  name: string
  /** 性别 */
  sex: string
  /** 年龄 */
  age: number
  /** 就诊卡号 */
  code: string
  /** 报销方式 */
  expense: string
}

/** 术前患者信息 */
export interface PreOperativePatientInfo extends PatientBaseInfo {
  /** 病人来源 */
  source: string
  /** 就诊卡号 */
  code: string
  /** 科室 */
  dept: string
  /** 诊断 */
  result: string
  /** 申请医生 */
  doctor: string
  /** 申请日期 */
  date: string
  /** 其他病情 */
  extend: string
}

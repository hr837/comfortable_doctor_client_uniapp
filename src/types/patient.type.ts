/** 患者基本信息 */
export interface PatientBaseInfo {
  /** 姓名 */
  name: string
  /** 性别 */
  sex: string
  /** 年龄 */
  age: string
  /** 就诊卡号 */
  code: string
  /** 报销方式 */
  expense: string
  /** 身份证号 */
  idCard: string
  id: string
}

/** 术前患者信息 */
export interface PreOperativePatientInfo extends PatientBaseInfo {
  /** 病人来源 */
  source: string
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
  /** 访视记录单 */
  visitRecordFile: string
  /** 知情同意书 */
  contractFile: string
}

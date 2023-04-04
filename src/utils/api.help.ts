import type { Department } from '@/types/department.type'
import type { PreOperativePatientInfo } from '@/types/patient.type'

export namespace ApiRequestType {
  /**  登录 */
  export interface Login {
    LoginName: string
    Password: string
  }

  /** 查询病人 */
  export interface Patient {
    /**
     * 科室名称
     */
    DepartmentName: string
    /**
     * 检查日期
     */
    ExamineDate: string
    /**
     * 姓名或就诊号
     */
    KeyWord: string
    /**
     * 0：未完成、1：已完成、-1：全部
     */
    OperateState: number
    /**
     * 患者来源，参数为字符串”门诊”或”住院”或”全部”
     */
    PatientSource: string
  }

}

export namespace ApiResonseType {
  /**  登录返回数据 */
  export interface Login {
    /**
     * 科室编码
     */
    DepartmentCode: string
    /**
     * 科室名称
     */
    DepartmentName: string
    /**
     * 登录账号
     */
    LoginName: string
    /**
     * 姓名拼音码
     */
    Spell?: string
    /**
     * 用户ID
     */
    UserId: string
    /**
     * 姓名
     */
    UserName: string
    /**
     * 角色，麻醉医生：Anesthetist、手术护士：OpNurse
     */
    UserRole: string
  }

  /** 部门查询返回列表 */
  export type DepartmentList = Department[]

  /** 查询返回病人列表 */
  export interface PatientInfo {
    /**
     * 评估时间
     */
    AssessTime: string
    /**
    * 诊断
    */
    DiagnosisName: string
    /**
    * 申请医生
    */
    DoctorName: string
    /**
    * 检查时间
    */
    ExamineTime: string
    /**
    * 检查类型
    */
    ExamineType: string
    Id: string
    /**
    * 急诊标志
    */
    IsEmergency: boolean
    /**
    * 手术间（治疗室）
    */
    OperatingRoomName: string
    PatientAge: string
    PatientDepartmentName: string
    /**
    * 身份证号
    */
    PatientIdCard: string
    PatientMrn: string
    PatientName: string
    /**
    * 就诊号
    */
    PatientNumber: string
    PatientSex: string
    /**
    * 患者来源（门诊、住院）
    */
    PatientSource: string
    SpecialInfect: string
    /**
    * 申请时间
    */
    SubscribeDate: string
  }

  export interface PatientDetailInfo {
    AccessPacuTime: string
    AccessTime: string
    AnesthesiaBeginTime: string
    AnesthesiaEndTime: string
    AnesthesiaMethodCode: string
    AnesthesiaMethodName: string
    Anesthetist1Code: string
    Anesthetist1Name: string
    Anesthetist3Code: string
    Anesthetist3Name: string
    AppointmentCancel: string
    AssessTime: string
    DiagnosisCode: string
    DiagnosisName: string
    DoctorCode: string
    DoctorName: string
    ExamineTime: string
    ExamineType: string
    ExtubationTime: string
    Id: string
    IntubateTime: string
    IsChecked: boolean
    IsEmergency: boolean
    LeavePacuTime: string
    LeaveTime: string
    NurseCode: string
    NurseName: string
    OperateCancel: string
    OperatingRoomCode: string
    OperatingRoomName: string
    OperationBeginTime: string
    OperationCode: string
    OperationEndTime: string
    OperationName: string
    OperatorCode: string
    OperatorName: string
    Opinion: string
    PatientAge: string
    PatientBedCode: string
    PatientBedName: string
    PatientBirthday: string
    PatientDepartmentCode: string
    PatientDepartmentName: string
    PatientIdCard: string
    PatientIdentity: string
    PatientMrn: string
    PatientName: string
    PatientNumber: string
    PatientSex: string
    PatientSource: string
    PatientWardCode: string
    PatientWardName: string
    PlanStartTime: string
    SpecialInfect: string
    SubscribeDate: string
    SubscribeId: string
  }
}

export namespace ApiDataConvert {
  export function PatientInfoConvert(data: ApiResonseType.PatientInfo): PreOperativePatientInfo {
    return {
      // base
      name: data.PatientName,
      sex: data.PatientSex,
      age: data.PatientAge,
      code: data.PatientNumber,
      expense: '未知',
      // extend
      source: data.PatientSource,
      dept: data.PatientDepartmentName,
      result: data.DiagnosisName,
      doctor: data.DoctorName,
      date: data.SubscribeDate,
      extend: data.SpecialInfect,
      visitRecordFile: '32.pdf',
      contractFile: '31.pdf',
      idCard: data.PatientIdCard,
    }
  }
}

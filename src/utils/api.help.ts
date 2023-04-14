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

  /** 输液、麻醉用药 */
  export interface Transfusion {
    /**
     * 药品类型，2输液、3麻醉用药
     */
    TypeCode: string
    /**
     * 手术患者ID，患者详情或患者列表中的ID
     */
    AnesthesiaId: string
    /**
     * 药品名称
     */
    DrugName: string
    /**
     * 药品编码
     */
    DrugCode: string
    /**
     * 0单次，1持续
     */
    DrugFlag: string
    /**
     * 晶体液或胶体液，麻醉用药时可为空
     */
    DrugType: string
    /**
     * 剂量或用量
     */
    Dose: number
    /**
     * 单位
     */
    Unit: string
    /**
    * 持续用药开始时间，单次用药时该值为Min
    */
    BeginTime: string
    /**
     * 持续用药结束时间，单次用药时该值为Min
     */
    EndTime: string
    /**
     * 用药方式
     */
    Mode: string
    /**
     * 单次用药时间，持续用药时该值为Min
     */
    PointTime: string
    /**
     * 药品规格，可以为空
     */
    Spect?: string
    /**
    * 记录ID，添加时该参数为空
    */
    Id?: string
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
  export type DepartmentList = ItemInfo[]

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

  /** 获取用药单位返回列表 */
  export type DrugUnitList = ItemInfo[]
  /** 获取用药单位返回列表 */
  export type DrugWayList = ItemInfo[]

  /** 药品信息 */
  export interface DrugInfo {
    /**
     * 剂量，自定义剂量，添加药品是时默认的剂量
     */
    CustomDose: number
    /**
     * 用药单位，自定义的默认用药单位
     */
    CustomUnit: string
    /**
     * 药品编码
     */
    DrugCode: string
    /**
     * 药品名称
     */
    DrugName: string
    /**
     * 拼音码
     */
    DrugSpell: string
    /**
     * 规格
     */
    Dspec: string
    /**
     * 用药方式
     */
    InjectionMode: string
  }

  /** 输液信息 */
  export type Transfusion = Required<ApiRequestType.Transfusion>

  /** 体征检测数据 */
  export interface MonitorInfo {
    /**
     * ID，数据主键
     */
    Id: string
    /**
     * 体征项目值
     */
    ItemValues: Array<MonitorItem & {
      /** 体征值 */
      ItemValue: string
    }>
    /**
     * 数据时间
     */
    RecordTime: string

  }

  /** 体征检测项目 */
  export type MonitorItem = Omit<ItemInfo, 'Spell'>
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
      id: data.Id,
    }
  }
}

/** 项目 */
export interface ItemInfo {
  /**
   * 单位编码
   */
  ItemCode: string
  /**
   * 单位名称
   */
  ItemName: string
  /**
   * 拼音码
   */
  Spell?: string
}

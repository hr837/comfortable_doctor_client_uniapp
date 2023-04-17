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

  /** 体征检测数据 */
  export interface MonitorInfo {
    /**
     * ID，数据主键
     */
    Id?: string
    /** 患者ID */
    AnesthesiaId: string
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
    /**
     * 入恢复室时间
     */
    AccessPacuTime: string
    /**
     * 入手术室时间
     */
    AccessTime: string
    /**
     * 麻醉开始时间
     */
    AnesthesiaBeginTime: string
    /**
     * 麻醉结束时间
     */
    AnesthesiaEndTime: string
    /**
     * 麻醉方法编码
     */
    AnesthesiaMethodCode: string
    /**
     * 麻醉方法名称
     */
    AnesthesiaMethodName: string
    /**
     * 麻醉医生编码
     */
    Anesthetist1Code: string
    /**
     * 麻醉医生姓名
     */
    Anesthetist1Name: string
    /**
     * 麻醉护士编码
     */
    Anesthetist3Code: string
    /**
     * 麻醉护士姓名
     */
    Anesthetist3Name: string
    /**
     * 预约取消原因
     */
    AppointmentCancel: string
    /**
     * 评估时间
     */
    AssessTime: string
    /**
     * 诊断编码
     */
    DiagnosisCode: string
    /**
     * 诊断名称
     */
    DiagnosisName: string
    /**
     * 申请医生编码
     */
    DoctorCode: string
    /**
     * 申请医生姓名
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
    /**
     * 拔罐时间
     */
    ExtubationTime: string
    /**
     * ID主键
     */
    Id: string
    /**
     * 插管时间
     */
    IntubateTime: string
    /**
     * 是否审核
     */
    IsChecked: boolean
    /**
     * 是否急诊
     */
    IsEmergency: boolean
    /**
     * 出恢复室时间
     */
    LeavePacuTime: string
    /**
     * 出手术室时间
     */
    LeaveTime: string
    /**
     * 护士编码
     */
    NurseCode: string
    /**
     * 护士姓名
     */
    NurseName: string
    /**
     * 手术取消原因
     */
    OperateCancel: string
    /**
     * 手术间编码
     */
    OperatingRoomCode: string
    /**
     * 手术间名称
     */
    OperatingRoomName: string
    /**
     * 手术开始时间
     */
    OperationBeginTime: string
    /**
     * 手术编码
     */
    OperationCode: string
    /**
     * 手术结束时间
     */
    OperationEndTime: string
    /**
     * 手术名称
     */
    OperationName: string
    /**
     * 手术医生编码
     */
    OperatorCode: string
    /**
     * 手术医生姓名
     */
    OperatorName: string
    /**
     * 处理意见
     */
    Opinion: string
    /**
     * 年龄
     */
    PatientAge: string
    /**
     * 床号
     */
    PatientBedCode: string
    /**
     * 床号名称
     */
    PatientBedName: string
    /**
     * 患者生日
     */
    PatientBirthday: string
    /**
     * 科室编码
     */
    PatientDepartmentCode: string
    /**
     * 科室名称
     */
    PatientDepartmentName: string
    /**
     * 身份证号
     */
    PatientIdCard: string
    /**
     * 医保类型
     */
    PatientIdentity: string
    /**
     * 病历号
     */
    PatientMrn: string
    /**
     * 患者姓名
     */
    PatientName: string
    /**
     * 就诊号，住院号/门诊号
     */
    PatientNumber: string
    /**
     * 患者性别
     */
    PatientSex: string
    /**
     * 患者来源，门诊或住院
     */
    PatientSource: string
    /**
     * 病区编码
     */
    PatientWardCode: string
    /**
     * 病区名称
     */
    PatientWardName: string
    /**
     * 预约开始时间
     */
    PlanStartTime: string
    /**
     * 特殊感染
     */
    SpecialInfect: string
    /**
     * 申请日期
     */
    SubscribeDate: string
    /**
     * HIS申请单ID
     */
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
  export type MonitorInfo = Required<ApiRequestType.MonitorInfo>

}

/** 体征检测项目 */
export type MonitorItem = Omit<ItemInfo, 'Spell'>

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

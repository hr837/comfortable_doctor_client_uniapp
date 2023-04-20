import { request } from './http'
import type { ApiRequestType, ApiResonseType, MonitorItem } from './api.help'

/**
 *  登录验证
 */
export function login(data: ApiRequestType.Login) {
  return request<ApiResonseType.UserInfo>({
    path: '/api/User/UserLogin',
    data,
    method: 'POST',
  })
}

/**
 *  获取手术间信息
 */
export function getOperateRooms() {
  return request<ApiResonseType.OperateRoomInfo[]>({
    path: '/api/OperatingRoom/GetList',
    method: 'GET',
    loading: true,
  })
}

/**
 *  获取用户列表
 */
export function getUserList(roleCode: ApiRequestType.RoleCode) {
  return request<ApiResonseType.UserInfo[]>({
    path: '/api/User/UserList',
    data: { roleCode },
    method: 'GET',
  })
}

/**
 *  获取用户签名图片
 */
export function getUserSign(loginName: string) {
  return request<ArrayBuffer>({
    path: '/api/User/UserSign',
    data: { loginName },
    method: 'GET',
    responseType: 'arraybuffer',
  })
}

/**
 *  科室信息
 */
export function getDeptList() {
  return request<ApiResonseType.DepartmentList>({
    path: '/api/Deptpartment/DeptList',
    method: 'GET',
  })
}

/**
 *  查询患者列表
 */
export function queryPatients(data: ApiRequestType.Patient) {
  return request<ApiResonseType.PatientInfo[]>({
    path: '/api/Patient/GetPatientList',
    data,
    method: 'POST',
    loading: true,
  })
}

/**
 *  获取患者详细信息
 * @param id 患者列表中患者信息
 */
export function getPatientDetail(id: string) {
  return request<ApiResonseType.PatientDetailInfo>({
    path: `/api/Patient/GetPatient/${id}`,
    method: 'GET',
    loading: true,
  })
}

/**
 *  获取用药单位
 */
export function getDrugUnitList() {
  return request<ApiResonseType.DrugUnitList>({
    path: '/api/Drug/GetDrugUnitList',
    method: 'GET',
  })
}

/**
 *  获取用药方式
 */
export function getDrugWayList() {
  return request<ApiResonseType.DrugWayList>({
    path: '/api/Drug/GetDrugWayList',
    method: 'GET',
  })
}

/**
 *  获取药品信息
 */
export function getDrugList(typeCode: '2' | '3') {
  return request<ApiResonseType.DrugInfo[]>({
    path: '/api/Drug/GetDrugList',
    data: { typeCode },
    method: 'GET',
  })
}

/**
 *  获取病人输液记录
 * @param anesId 病人ID
 * @param typeCode 药品类型
 */
export function getTransfusionList(anesId: string, typeCode: '2' | '3') {
  return request<ApiResonseType.Transfusion[]>({
    path: '/api/Transfusion/GetList',
    data: { anesId, typeCode },
    method: 'GET',
    loading: true,
  })
}

/**
 *  添加麻醉用药、输液信息
 */
export function addTransfusionRecord(data: ApiRequestType.Transfusion) {
  return request<ApiResonseType.DrugInfo[]>({
    path: '/api/Transfusion/Add',
    data,
    method: 'POST',
    loading: true,
  })
}

/**
 *  添加麻醉用药、输液信息
 */
export function updateTransfusionRecord(data: ApiRequestType.Transfusion) {
  return request<ApiResonseType.DrugInfo[]>({
    path: '/api/Transfusion/Edit',
    data,
    method: 'PUT',
    loading: true,
  })
}

/**
 *  删除输液、麻醉用药
 */
export function delTransfusion(id: string) {
  return request({
    path: `/api/Transfusion/Del/${id}`,
    method: 'DELETE',
  })
}

/**
 *  获取输液、麻醉用药记录数据
 */
export function getTransfusionInfo(id: string) {
  return request<ApiResonseType.Transfusion>({
    path: `/api/Transfusion/GetModel/${id}`,
    method: 'GET',
    loading: true,
  })
}

/**
 *  获取体征数据
 * @param id 病人ID
 */
export function getPatientMonitorRecords(id: string) {
  return request<ApiResonseType.MonitorInfo[]>({
    path: '/api/MonitorRecord/GetList',
    data: { anesId: id },
    method: 'GET',
    loading: true,
  })
}

/**
 *  删除体征数据
 * @param id 监测ID
 */
export function delPatientMonitorRecord(id: string) {
  return request<ApiResonseType.MonitorInfo[]>({
    path: `/api/MonitorRecord/Del/${id}`,
    method: 'DELETE',
    loading: true,
  })
}

/**
 *  获取生命体征配置项目
 * @param id 病人ID,可空
 */
export function getMonitorItems(id?: string) {
  return request<MonitorItem[]>({
    path: '/api/MonitorRecord/GetConfig',
    data: { anesId: id },
    method: 'GET',
  })
}

/**
 *  添加病人体征检测数据
 */
export function addMonitorRecord(data: ApiRequestType.MonitorInfo) {
  return request({
    path: '/api/MonitorRecord/Add',
    data,
    method: 'POST',
    loading: true,
  })
}

/**
 *  修改病人体征检测数据
 */
export function updateMonitorRecord(data: ApiRequestType.MonitorInfo) {
  return request({
    path: '/api/MonitorRecord/Edit',
    data,
    method: 'PUT',
    loading: true,
  })
}

/** 麻醉小结中获取术中特殊情况模板 */
export function getTempOperating() {
  return request<ApiResonseType.TemplateInfo[]>({
    path: '/api/AnesCustom/GetTempOperating',
    method: 'GET',
  })
}

/** 麻醉小结获取恢复室内情况模板 */
export function GetTempPacu() {
  return request<ApiResonseType.TemplateInfo[]>({
    path: '/api/AnesCustom/GetTempPacu',
    method: 'GET',
  })
}

/** 保存麻醉小结项目内容 */
export function saveNarcoticResult(id: string, items: ApiRequestType.NarcoticItemInfo[]) {
  return request<boolean>({
    path: '/api/AnesCustom/Save',
    data: {
      AnesthesiaId: id,
      Items: items,
    },
    method: 'POST',
    loading: true,
  })
}

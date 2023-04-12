import { request } from './http'
import type { ApiRequestType, ApiResonseType } from './api.help'

/**
 *  登录验证
 */
export function login(data: ApiRequestType.Login) {
  return request<ApiResonseType.Login>({
    path: '/api/User/UserLogin',
    data,
    method: 'POST',
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
 *  科室信息
 */
export function queryPatients(data: ApiRequestType.Patient) {
  return request<ApiResonseType.PatientInfo[]>({
    path: '/api/Patient/GetPatientList',
    data,
    method: 'POST',
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
export function getDrugList() {
  return request<ApiResonseType.DrugWayList>({
    path: '/api/Drug/GetDrugList',
    method: 'GET',
  })
}

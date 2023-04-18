// export const server = 'https://mock.apifox.cn/m1/2536589-0-default'
// export const server = 'http://172.16.1.28:8088'

import { STORE_KEY_SERVER } from './app.constant'

interface RequestParam {
  /**
   * api 路径
   */
  path: string
  /**
   * 请求方法
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  /**
   * 请求数据
   */
  data?: any
  /**
   * 是否启用loading
   */
  loading?: boolean
  /** 超时时间 */
  timeout?: number
  /** 接口请求loading文字 */
  loadingMsg?: string
}

/**
 * 封装的网络请求，支持Get,Post请求
 * @param params 请求参数对象
 */
export function request<T>(params: RequestParam) {
  return new Promise<T>((resolve, reject) => {
    const server = uni.getStorageSync(STORE_KEY_SERVER)
    if (!server)
      throw new Error('未配置Server地址')

    if (params.loading) {
      uni.showLoading({
        title: params.loadingMsg ?? '加载中...',
      })
    }

    uni.request({
      url: server + params.path,
      method: params.method,
      data: params.data,
      header: getHeader(),
      timeout: params.timeout ?? 60 * 1000,
      success(res: any) {
        if (res.statusCode < 200 || res.statusCode > 399) {
          reject(res.data)
        }
        else {
          // HTTP 状态码正常就通过业务结构状态判断业务是否成功
          if (res.data === null)
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject(null)
          else resolve(res.data)
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {
        if (params.loading)
          uni.hideLoading()
      },
    })
  })
}

function getHeader() {
  const token = uni.getStorageSync('token')
  return token ? { token } : undefined
}

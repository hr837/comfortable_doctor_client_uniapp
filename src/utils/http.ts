export const server = 'https://mock.apifox.cn/m1/2536589-0-default'

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

/** HTTP数据返回类型 */
interface HttpResponseType<T> {
  /** 业务状态码 */
  code: string
  /** 业务返回数据 */
  data: T
  /** API响应状态 */
  success: boolean
  /** API返回消息 */
  msg: string
}

/**
 * 封装的网络请求，支持Get,Post请求
 * @param params 请求参数对象
 */
export function request<T>(params: RequestParam) {
  return new Promise<T>((resolve, reject) => {
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
          resolve(res.data)
          // const { msg, success, data } = res.data;
          // if (success) {
          //   resolve(data);
          // } else {
          //   reject(res.data);
          // }
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

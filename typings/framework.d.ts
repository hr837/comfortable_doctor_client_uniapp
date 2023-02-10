/** UniApp 基础事件类型 */
declare type UniEvent<T> = import("@uni-helper/uni-app-types").CustomEvent<T>

/** UniFormRef */
declare type UniForm = {
  validate: () => Promise<void>
}

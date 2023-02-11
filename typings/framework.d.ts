/** UniApp 基础事件类型 */
declare type UniEvent<T> = import("@uni-helper/uni-app-types").CustomEvent<T>

/** UniFormRef */
declare interface UniForm  {
  validate: UniHelper.UniFormsValidate
}

/** 弹出框点击按钮事件类型 */
declare type PopupCommandType = 'visitRecord' | 'contract' | 'narcotizingRecord'

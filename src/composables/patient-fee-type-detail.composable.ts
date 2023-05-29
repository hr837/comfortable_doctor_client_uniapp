import { getFeeTempaltes } from '@/utils/api'

export const consumeFeeItems = ref<UniHelper.UniDataCheckboxLocaldata[]>([])
export const groupFeeItems = ref<UniHelper.UniDataCheckboxLocaldata[]>([])

export function initFeeConfig() {
  const itemsCount = consumeFeeItems.value.length + groupFeeItems.value.length
  if (itemsCount)
    return
  getFeeTempaltes('耗材').then((data) => {
    consumeFeeItems.value = data.map((item) => {
      return {
        text: item.ItemName,
        value: item.ItemCode,
        disabled: false,
      }
    })
  })
  getFeeTempaltes('组套').then((data) => {
    groupFeeItems.value = data.map((item) => {
      return {
        text: item.ItemName,
        value: item.ItemCode,
        disabled: false,
      }
    })
  })
}

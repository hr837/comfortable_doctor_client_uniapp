import { getFeeTempaltes } from '@/utils/api'

export const consumeFeeItems = ref<UniHelper.UniDataCheckboxLocaldata[]>([])
export const groupFeeItems = ref<UniHelper.UniDataCheckboxLocaldata[]>([])

export async function initFeeConfig() {
  const itemsCount = consumeFeeItems.value.length + groupFeeItems.value.length
  if (itemsCount)
    return true

  return Promise.all([getFeeTempaltes('耗材'), getFeeTempaltes('组套')]).then(([r1, r2]) => {
    consumeFeeItems.value = r1.map((item) => {
      return {
        text: item.ItemName,
        value: item.ItemCode,
        disabled: false,
      }
    })

    groupFeeItems.value = r2.map((item) => {
      return {
        text: item.ItemName,
        value: item.ItemCode,
        disabled: false,
      }
    })

    return true
  }).catch(() => false)
}

import { getFeeTempaltes } from '@/utils/api'
import type { ItemInfo } from '@/utils/api.help'

export const consumeFeeItems = ref<ItemInfo[]>([])
export const groupFeeItems = ref<ItemInfo[]>([])

export async function initFeeConfig() {
  const itemsCount = consumeFeeItems.value.length + groupFeeItems.value.length
  if (itemsCount)
    return true

  return Promise.all([getFeeTempaltes('耗材'), getFeeTempaltes('组套')]).then(([r1, r2]) => {
    consumeFeeItems.value = r1
    groupFeeItems.value = r2
    return true
  }).catch(() => false)
}

<script lang="ts" setup>
import { consumeFeeItems, groupFeeItems } from "@/composables/patient-fee-type-detail.composable";
import type { FeeTypeItem } from "@/utils/api.help";

defineProps<{ disabled: boolean }>()

/** 编辑时费用项 */
type EditFeeTypeInfo = FeeTypeItem & {
  /** 是否被选择 */
  checked: boolean
}



const editConsumeFeeItems = ref<EditFeeTypeInfo[]>([])
const editGroupFeeItems = ref<EditFeeTypeInfo[]>([])

function revertData(data: FeeTypeItem[]) {
  editConsumeFeeItems.value = []
  for (const item of consumeFeeItems.value) {
    const tmpData = data.find(x => x.ItemCode === item.ItemCode)
    const initalNumber = tmpData ? tmpData.ItemNumber ?? '1' : ''
    editConsumeFeeItems.value.push({
      ...item,
      ItemNumber: initalNumber,
      checked: !!tmpData
    })
  }

  editGroupFeeItems.value = []
  for (const item of groupFeeItems.value) {
    const tmpData = data.find(x => x.ItemCode === item.ItemCode)
    const initalNumber = tmpData ? tmpData.ItemNumber ?? '1' : ''
    editGroupFeeItems.value.push({
      ...item,
      ItemNumber: initalNumber,
      checked: !!tmpData
    })
  }
}

function getData() {
  const items: FeeTypeItem[] = []

  for (const item of editConsumeFeeItems.value) {
    if (!item.checked) continue;
    const num = Math.abs((Number.parseInt(item.ItemNumber) || 1))
    items.push({
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      ItemNumber: num.toFixed(0)
    })
  }

  for (const item of editGroupFeeItems.value) {
    if (!item.checked) continue;
    const num = Math.abs((Number.parseInt(item.ItemNumber) || 1))
    items.push({
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      ItemNumber: num.toFixed(0)
    })
  }

  return items
}


function onItemClick(item: EditFeeTypeInfo) {
  console.log(123)
  if (item.checked) {
    item.checked = false
    item.ItemNumber = ''
  } else {
    item.checked = true
    item.ItemNumber = '1'
  }
}

defineExpose({
  revertData,
  getData
})


</script>

<template>
  <view class="component patient-fee-type-set">
    <uni-section title="耗材" type="line" />
    <uni-row :gutter="10" class="patient-fee-type-group">
      <uni-col :span="6" v-for="item of editConsumeFeeItems" :key="item.ItemCode" class="patient-fee-type-item">
        <button :type="item.checked ? 'primary' : 'info'" class="patient-fee-type-item-btn" :disabled="disabled"
          @click="() => onItemClick(item)">{{ item.ItemName }}</button>
        <uni-easyinput v-model="item.ItemNumber" class="patient-fee-type-item-number" type="number" inputmode="numeric"
          :step="1" :clearable="false" :maxlength="2" :disabled="disabled || !item.checked" />
      </uni-col>
    </uni-row>

    <uni-section title="组套" type="line" />
    <uni-row :gutter="10" class="patient-fee-type-group">
      <uni-col :span="6" v-for="item of editGroupFeeItems" :key="item.ItemCode" class="patient-fee-type-item">
        <button :type="item.checked ? 'primary' : 'info'" class="patient-fee-type-item-btn" :disabled="disabled"
          @click="() => onItemClick(item)">{{ item.ItemName
          }}</button>
        <uni-easyinput v-model="item.ItemNumber" class="patient-fee-type-item-number" type="number" inputmode="numeric"
          :step="1" :clearable="false" :maxlength="2" :disabled="disabled || !item.checked" />
      </uni-col>
    </uni-row>
  </view>
</template>

<style lang="scss" scoped>
.patient-fee-type-set {
  padding: 0 16px;

  ::v-deep uni-button {
    &[type='info'][disabled] {
      color: #666 !important;
    }

    &[type='primary'][disabled] {
      color: #fff !important;
    }
  }

  .patient-fee-type {
    &-group {
      min-height: 100px
    }

    &-item {
      @apply row m-b-4;

      &-btn {
        @apply flex-1 text-sm min-h-45px p-2 inline-flex flex-center;
        line-height: 1.2em !important;
      }

      &-number {
        width: 40px !important;
        flex: none;

        ::v-deep .uni-easyinput__content {
          &.is-disabled {
            color: #666 !important;
          }

          &-input {
            height: 45px;
          }
        }
      }
    }
  }
}
</style>

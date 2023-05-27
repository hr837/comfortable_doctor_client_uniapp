<script lang="ts" setup>
import { editSafeCheckList } from '@/composables/patient-safe-check-detail.composable'
interface PropType {
  /** 是否禁用 */
  disabled: boolean
}
defineProps<PropType>()

function onItemValueChange(index: number, e: any) {
  const checked = e.detail!.value ? 'true' : 'false'
  editSafeCheckList.value[index].ItemValue = checked
  // const editIndex = safeCheckConfigList.findIndex(x => x.ItemName === name)
  // if (editIndex < 0)
  //   return
  // safeCheckConfigList[editIndex].ItemValue = checked
}

// const safeCheckList = computed(() => safeCheckConfigList.filter(item => !(item.ItemName === 'Item09' && props.isAnalgesia)))
</script>

<template>
  <view class="component patient-safe-check-table">
    <uni-table border stripe>
      <uni-tr class="patient-safe-check-table-th ">
        <uni-th align="center">
          三方核查内容（小儿患者由亲属配合完成）
        </uni-th>
        <uni-th align="center" width="180">
          确认
        </uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in editSafeCheckList" :key="item.ItemName">
        <uni-td align="center">
          {{ item.title }}
        </uni-td>
        <uni-td align="center">
          <switch
            :checked="item.ItemValue === 'true'" color="#13ce66" :disabled="disabled"
            @change="(e) => onItemValueChange(index, e)"
          />
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

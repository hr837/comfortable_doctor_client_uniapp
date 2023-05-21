<script lang="ts" setup>
const configList = ref([
  { name: '查看患者是否佩戴腕带', value: '0' },
  { name: '患者姓名、性别、门诊号/住院号', value: '0' },
  { name: '患者检查/治疗手术申请单/病历、检查项目、检查部位', value: '0' },
  { name: '患方、医师是否签署诊疗知情同意书', value: '0' },
  { name: '患者检查报告单是否齐全', value: '0' },
  { name: '患者禁饮食情况', value: '0' },
  { name: '患者过敏史、药物史', value: '0' },
  { name: '患者检查/治疗体位是否正确', value: '0' },
  { name: '患者检查/治疗镇静方式', value: '0' },
  { name: '植入物和特殊器材准备就绪', value: '0' },
  { name: '检查/治疗时需用设备、物品是否完善', value: '0' },
  { name: '检查/治疗时需用药品是否齐全', value: '0' },
])

function onItemValueChange(index: number, e: any) {
  const checked = e.detail!.value
  configList.value[index].value = checked ? '1' : '0'
}
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
      <uni-tr v-for="(item, index) in configList" :key="item.name">
        <uni-td align="center">
          {{ item.name }}
        </uni-td>
        <uni-td align="center">
          <switch :checked="item.value === '1'" color="#13ce66" @change="(e) => onItemValueChange(index, e)" />
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

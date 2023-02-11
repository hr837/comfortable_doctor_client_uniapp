<script lang="ts" setup>
import type { PreOperativePatientInfo } from '@/types/patient.type'

const props = defineProps<{
  data: PreOperativePatientInfo[]
}>()

const emits = defineEmits(['rowClick'])

const title = $computed(() => `共有${props.data.length}条记录`)

const onClick = (row: any) => emits('rowClick', { ...row })
</script>

<template>
  <view class="component patient-query-table">
    <uni-section :title="title" type="line" />
    <uni-table border stripe>
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center" width="80px">
          姓名
        </uni-th>
        <uni-th align="center" width="50px">
          性别
        </uni-th>
        <uni-th align="center" width="50px">
          年龄
        </uni-th>
        <uni-th align="center" width="70px">
          来源
        </uni-th>
        <uni-th align="center" width="100px">
          科室
        </uni-th>
        <uni-th align="center" width="260px">
          诊断
        </uni-th>
        <uni-th align="center" width="80px">
          申请医生
        </uni-th>
        <uni-th align="center" width="120px">
          申请日期
        </uni-th>
        <uni-th align="center" width="100px">
          医保类型
        </uni-th>
        <uni-th align="center" width="100px">
          特殊感染
        </uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(row, rIndex) in data" :key="`row-${rIndex}`" @click="onClick(row)">
        <uni-td align="center">
          {{ row.name }}
        </uni-td>
        <uni-td align="center">
          {{ row.sex }}
        </uni-td>
        <uni-td align="center">
          {{ row.age }}
        </uni-td>
        <uni-td align="center">
          {{ row.source }}
        </uni-td>
        <uni-td align="center">
          {{ row.dept }}
        </uni-td>
        <uni-th align="left">
          <text class="w-260px truncate">
            {{ row.result }}
          </text>
        </uni-th>
        <uni-td align="center">
          {{ row.doctor }}
        </uni-td>
        <uni-td align="center">
          {{ row.date }}
        </uni-td>
        <uni-td align="center">
          {{ row.expense }}
        </uni-td>
        <uni-td align="center">
          {{ row.extend }}
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

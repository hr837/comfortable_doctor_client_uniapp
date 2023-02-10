<script lang="ts" setup>
import { getPatienData } from '@/composables/patient-query'

let dataSet = $ref<any[]>([])
const formRef = ref<UniForm>()

const model = $ref({
  query: '',
  date: '',
  department: '',
})

const departmentList = $ref([
  {
    text: '科室1',
    value: 'dept1',
  },
  {
    text: '科室2',
    value: 'dept2',
  },
  {
    text: '科室3',
    value: 'dept3',
  },
])

async function onSubmit() {
  const validate = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!validate)
    return
  const data = await getPatienData()
  if (data && data.length)
    dataSet = data
}
</script>

<template>
  <view class="page  patient-query">
    <uni-forms ref="formRef" :model="model" class="p-4">
      <uni-forms-item name="query" class="patient-query_form-item--query">
        <view class="flex items-center ">
          <uni-easyinput v-model="model.query" placeholder="姓名/就诊卡号" class="flex-1" />
          <button type="primary" class="m-l-4 leading-9" @click="onSubmit">
            查询
          </button>
        </view>
      </uni-forms-item>
      <uni-row :gutter="100">
        <uni-col :span="12">
          <uni-forms-item label="手术日期" name="date" :label-width="75">
            <uni-datetime-picker v-model="model.date" type="date" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="12">
          <uni-forms-item label="科室" name="department" :label-width="45">
            <uni-data-picker v-model="model.department" :localdata="departmentList" popup-title="请选择科室" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>

    <uni-table border stripe>
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center">
          姓名
        </uni-th>
        <uni-th align="center">
          性别
        </uni-th>
        <uni-th align="center">
          年龄
        </uni-th>
        <uni-th align="center">
          来源
        </uni-th>
        <uni-th align="center">
          科室
        </uni-th>
        <uni-th align="center">
          诊断
        </uni-th>
        <uni-th align="center">
          申请医生
        </uni-th>
        <uni-th align="center">
          申请日期
        </uni-th>
        <uni-th align="center">
          医保类型
        </uni-th>
        <uni-th align="center">
          特殊感染
        </uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(row, rIndex) in dataSet" :key="`row-${rIndex}`">
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
          {{ row.result }}
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

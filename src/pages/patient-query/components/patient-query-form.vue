<script lang="ts" setup>
const emits = defineEmits(['submit'])

const formRef = ref<UniForm>()

const model = $ref({
  query: '',
  date: '',
  department: '',
})

const departmentList = $ref<any[]>([
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

// 提交事件回调
const onSubmit = () => emits('submit', { ...model })
</script>

<template>
  <view class="component patient-query-form p-4">
    <uni-forms ref="formRef" :model="model" label-width="100px" label-align="right">
      <uni-forms-item name="query" class="patient-query_form-item--query">
        <view class="flex items-center ">
          <uni-easyinput v-model="model.query" placeholder="姓名/就诊卡号" class="flex-1" />
          <button type="primary" class="m-l-4" size="mini" @click="onSubmit">
            查询
          </button>
        </view>
      </uni-forms-item>
      <uni-row>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="手术日期" name="date">
            <uni-datetime-picker v-model="model.date" type="date" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12">
          <uni-forms-item label="科室" name="department">
            <uni-data-select v-model="model.department" :localdata="departmentList" popup-title="请选择科室" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>

</style>

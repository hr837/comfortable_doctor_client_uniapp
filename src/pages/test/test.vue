<script lang="ts" setup>
const val = $ref('')
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

const dataTree = [{
  text: '一年级',
  value: '1-0',
  children: [{
    text: '1.1班',
    value: '1-1',
  },
  {
    text: '1.2班',
    value: '1-2',
  },
  ],
},
{
  text: '二年级',
  value: '2-0',
  children: [{
    text: '2.1班',
    value: '2-1',
  },
  {
    text: '2.2班',
    value: '2-2',
  },
  ],
},
{
  text: '三年级',
  value: '3-0',
  disable: true,
},
]
</script>

<template>
  <view class="component ">
    <uni-data-picker v-model="val" :localdata="dataTree" />
  </view>
</template>

<style lang="scss" scoped>

</style>

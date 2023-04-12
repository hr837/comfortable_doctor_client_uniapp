<script lang="ts" setup>
const currentIndex = $ref(0)
const CHAR = '✓'
</script>

<template>
  <view class="component patient-vital-sign-record">
    <uni-section title="生命体征" type="line">
      <template #right>
        <button type="primary" size="mini">
          检测项目
        </button>
        <button class="m-l-4" type="primary" size="mini">
          添加时间
        </button>
      </template>
    </uni-section>

    <!-- fixed table header -->
    <!-- <uni-table border stripe class="patient-vital-sign-record-table--fixed">
      <uni-tr>
        <uni-th align="center" width="200px">
          时间
        </uni-th>
        <uni-th align="center" width="100px">
          收缩压
        </uni-th>
        <uni-th align="center" width="100px">
          舒张压
        </uni-th>
        <uni-th align="center" width="100px">
          血氧
        </uni-th>
        <uni-th align="center" width="100px">
          呼吸
        </uni-th>
        <uni-th align="center" width="100px">
          心率
        </uni-th>
        <uni-th align="center" width="100px">
          操作
        </uni-th>
      </uni-tr>
    </uni-table> -->
    <uni-table border stripe class="patient-vital-sign-record-table">
      <uni-tr class="patient-vital-sign-record-table-tr-hidden">
        <uni-th align="center" width="200px">
          时间
        </uni-th>
        <uni-th align="center" width="100px">
          收缩压
        </uni-th>
        <uni-th align="center" width="100px">
          舒张压
        </uni-th>
        <uni-th align="center" width="100px">
          血氧
        </uni-th>
        <uni-th align="center" width="100px">
          呼吸
        </uni-th>
        <uni-th align="center" width="100px">
          心率
        </uni-th>
        <uni-th align="center" width="100px">
          操作
        </uni-th>
      </uni-tr>
      <uni-tr v-for="index in 20" :key="`row-${index}`" @click="() => currentIndex = index">
        <uni-td align="center">
          11:{{ 5 + index * 2 }}
        </uni-td>
        <uni-td align="center">
          {{ index % 3 === 0 ? CHAR : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 3 === 0 ? CHAR : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 2 === 0 ? CHAR : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 5 === 0 ? CHAR : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 4 === 0 ? CHAR : '' }}
        </uni-td>
        <uni-td align="center">
          <uni-icons v-show="currentIndex === index" class="leading-none" type="trash" size="20" color="#d9001b" />
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<!-- <style lang="scss" scoped>
.patient-vital-sign-record {
  @apply page h-full;

  &-table {
    @apply flex-1 overflow-auto;
    // &-tr-hidden{
    //   visibility: hidden;
    //   th{
    //     height: 0;
    //     overflow: hidden;
    //     padding: 0;
    //   }
    //   ::v-deep .uni-table-th-content{
    //     display: block;
    //     height: 0px;
    //     overflow: hidden;
    //   }
    // }

    // &--fixed {
    //   ::v-deep .uni-table-loading {
    //     display: none;
    //   }
    // }
  }
}
</style> -->

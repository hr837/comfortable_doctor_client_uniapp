<script lang="ts" setup>
import RecordItem from './record-item.vue'
</script>

<template>
  <view class="component patient-drug-record">
    <uni-section title="麻醉用药" type="line">
      <template #right>
        <button type="primary" size="mini">
          添加
        </button>
      </template>
    </uni-section>

    <view class="patient-drug-record-container">
      <RecordItem v-for="index of 10" :key="`record-item-${index}`" tag="单次">
        <view class="row">
          <text class="text-gray-900 patient-drug-record-text">
            利多卡因
          </text>
          <text class="patient-drug-record-text">
            2ml/h
          </text>
          <text>注射</text>
        </view>
        <view class="row m-t-2">
          <text class="patient-drug-record-text">
            时间：2023-01-22 11:24
          </text>
          <text class="patient-drug-record-text">
            开始时间：2023-01-22 09:24
          </text>
          <text class="patient-drug-record-text">
            结束时间：2023-01-22 11:24
          </text>
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-drug-record-container {
  @apply: p-x-4;
}

.patient-drug-record-text {
  @apply: p-r-6;
}
</style>

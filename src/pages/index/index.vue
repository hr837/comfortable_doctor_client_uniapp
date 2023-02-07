<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
</script>

<template>
  <view class="page">
    <!-- <image class="logo" src="/static/logo.png" /> -->
    <uni-grid class="p-x-6 p-y-4" :column="5" :show-border="false">
      <uni-grid-item>
        <view class="i-carbon-purchase grid-icon"></view>
        <text>患者查询</text>
      </uni-grid-item>
      <uni-grid-item>
        <view class="i-carbon-cloud-monitoring grid-icon"></view>
        <text>麻醉记录</text>
      </uni-grid-item>
      <uni-grid-item>
        <view class="i-carbon-purchase grid-icon"></view>
        <text>患者查询</text>
      </uni-grid-item>
      <uni-grid-item>
        <view class="i-carbon-purchase grid-icon"></view>
        <text>患者查询</text>
      </uni-grid-item>
      <uni-grid-item>
        <view class="i-carbon-purchase grid-icon"></view>
        <text>患者查询</text>
      </uni-grid-item>
      <uni-grid-item>
        <view class="i-carbon-purchase grid-icon"></view>
        <text>患者查询</text>
      </uni-grid-item>
      <!-- <uni-grid-item>
        <view class="grid-item-warp">
          <view class="i-carbon-purchase grid-icon"></view>
          <text>患者查询</text>
        </view>
      </uni-grid-item> -->
    </uni-grid>
  </view>
</template>


<style lang="scss" scoped>
.uni-grid-item {
  padding: 1em;

  :deep(.uni-grid-item__box) {
    border: 1px solid #e5e7eb !important;
    border-radius: 0.5em;
    justify-content: center;
    align-items: center;
  }

  .grid-icon {
    font-size: 3em;
    color: #087e6a;
    margin-bottom: 0.25em;
  }
}
</style>

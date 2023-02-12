<script lang="ts" setup>
const currentIndex = $ref(0)
</script>

<template>
  <view class="component ">
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

    <uni-table border stripe>
      <uni-tr>
        <uni-th align="center">
          时间
        </uni-th>
        <uni-th align="center">
          收缩压
        </uni-th>
        <uni-th align="center">
          舒张压
        </uni-th>
        <uni-th align="center">
          血氧
        </uni-th>
        <uni-th align="center">
          呼吸
        </uni-th>
        <uni-th align="center">
          心率
        </uni-th>
        <uni-th align="center">
          操作
        </uni-th>
      </uni-tr>
      <uni-tr v-for="index in 20" :key="`row-${index}`" @click="() => currentIndex = index">
        <uni-td align="center">
          11:{{ 5 + index * 2 }}
        </uni-td>
        <uni-td align="center">
          {{ index % 3 === 0 ? '✓' : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 3 === 0 ? '✓' : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 2 === 0 ? '✓' : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 5 === 0 ? '✓' : '' }}
        </uni-td>
        <uni-td align="center">
          {{ index % 4 === 0 ? '✓' : '' }}
        </uni-td>
        <uni-td align="center">
          <uni-icons v-show="currentIndex === index" class="leading-none" type="trash" size="20" color="#d9001b" />
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
defineProps<{
  /** 标签名称 */
  tag?: string
}>()
defineEmits(['delete', 'click'])
</script>

<template>
  <view class="component record-item">
    <view v-if="!!tag" class="record-item-tag">
      <uni-tag :text="tag" type="warning" size="small" />
    </view>
    <view class="record-item_content" @click="$emit('click')">
      <!-- 记录内容 -->
      <slot />
    </view>
    <view class="record-item-action" @click="$emit('delete')">
      <uni-icons class="leading-none" type="trash" size="28" color="#d9001b" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.record-item {
  @apply: m-b-4 bg-gray-100 rounded-2 row items-start overflow-hidden;
  ;
}

.record-item-tag,
.record-item_content,
.record-item-action {
  @apply: p-4;
}

.record-item_content {
  @apply: flex-1 text-gray-500 text-sm active: bg-gray-2 duration-200;
}

.record-item-action {
  @apply: self-stretch active: bg-gray-2 duration-200;
}
</style>

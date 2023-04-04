<script lang="ts" setup>
const props = defineProps<{
  modelValue: number
}>()

const emits = defineEmits(['update:modelValue'])

const Values = ['未完成', '已完成', '全部']

const current = computed(() => props.modelValue === -1 ? 2 : props.modelValue)

function onClickItem(e: { currentIndex: number }) {
  const value = e.currentIndex === 2 ? -1 : e.currentIndex
  emits('update:modelValue', value)
}
</script>

<template>
  <view class="component patient-query-select-status">
    <uni-segmented-control :current="current" :values="Values" @click-item="onClickItem" />
  </view>
</template>

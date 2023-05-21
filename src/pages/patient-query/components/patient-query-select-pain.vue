<script lang="ts" setup>
const props = defineProps<{
  modelValue: number
}>()

const emits = defineEmits(['update:modelValue'])

const Values = ['全部', '非无痛', '无痛']

const current = computed(() => props.modelValue + 1)

function onClickItem(e: { currentIndex: number }) {
  const value = e.currentIndex - 1
  emits('update:modelValue', value)
}
</script>

<template>
  <view class="component patient-query-select-pain">
    <uni-segmented-control :current="current" :values="Values" @click-item="onClickItem" />
  </view>
</template>

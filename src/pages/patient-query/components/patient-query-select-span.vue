<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])

const Values = ['全部', '上午', '下午']

const current = computed(() => Values.indexOf(props.modelValue || '全部'))

function onClickItem(e: { currentIndex: number }) {
  const value = Values.at(e.currentIndex)
  emits('update:modelValue', value === '全部' ? '' : value)
}
</script>

<template>
  <view class="component patient-query-select-span">
    <uni-segmented-control :current="current" :values="Values" @click-item="onClickItem" />
  </view>
</template>

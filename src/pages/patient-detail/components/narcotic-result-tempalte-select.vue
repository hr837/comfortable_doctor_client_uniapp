<script lang="ts" setup>
import { GetTempPacu, getTempOperating } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
const props = defineProps<{

  /** 输液/麻醉用药ID */
  /** 模板弹窗标题 */
  title: string
  type: 'OPERATE' | 'PACU'
}>()

const emits = defineEmits(['confirm', 'close'])

const list = ref<ApiResonseType.TemplateInfo[]>([])
const currentItem = ref<ApiResonseType.TemplateInfo | undefined>(undefined)

function onConfirm() {
  if (!currentItem.value) {
    uni.showToast({
      title: '请选择模板',
      icon: 'none',
    })
  }
  else {
    const val = `${currentItem.value.TemplateName}:${currentItem.value.TemplateContent}`
    emits('confirm', val)
  }
}

function onItemClick(item: ApiResonseType.TemplateInfo) {
  currentItem.value = item
}

onMounted(() => {
  if (props.type === 'OPERATE')
    getTempOperating().then(data => list.value = data)

  else
    GetTempPacu().then(data => list.value = data)
})
</script>

<template>
  <uni-popup-dialog
    class="component narcotic-result-tempalte-select" mode="base" type="info" :title="title" before-close
    @confirm="onConfirm" @close="$emit('close')"
  >
    <uni-list class="h-full">
      <uni-list-item
        v-for="(item, index) of list" :key="`list-item-${index}`"
        :class="[item === currentItem ? 'narcotic-result-tempalte-select-selectd-item' : '']" clickable
        :title="item.TemplateName" :note="item.TemplateContent" @click="onItemClick(item)"
      />
    </uni-list>
  </uni-popup-dialog>
</template>

<style lang="scss" scoped>
.narcotic-result-tempalte-select {
  &-selectd-item {
    background-color: #d4e4ff !important;
  }
}
</style>

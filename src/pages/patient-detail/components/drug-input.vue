<script lang="ts" setup>
import { drugNarcoticList, drugTransfusionList } from '@/composables/patient-narcotic-detail.composable'

interface PropsType {
  /** 药品类型
   * @description SY 输液
   * @description MZ 输液
   */
  type: 'SY' | 'MZ'
}

const props = defineProps<PropsType>()
const emits = defineEmits(['selected'])

const drugInput = ref('')
const drug = computed({
  get: () => {
    return drugInput.value
  },
  set: (val) => {
    drugInput.value = val.toUpperCase()
  },
})
const drugList = ref<string[]>([])

onMounted(() => {
  const source = props.type === 'MZ' ? drugNarcoticList : drugTransfusionList
  drugList.value = source.value.map((x) => {
    const spell = x.DrugSpell.toUpperCase()
    return `${spell}|${x.DrugName}`
  })
})

function onSubmit() {
  const [s] = drug.value.split('|')
  const source = props.type === 'MZ' ? drugNarcoticList : drugTransfusionList
  const item = source.value.find(x => x.DrugSpell.toUpperCase() === s)
  emits('selected', item)
}
</script>

<template>
  <view class="component drug-input row h-8">
    <uni-combox v-model="drug" label="药品筛选" placeholder="请输入药品拼音码或名称" :candidates="drugList" class="flex-1" />
    <button type="primary" plain size="mini" class="p-x-2" @click="onSubmit">
      使用
    </button>
  </view>
</template>

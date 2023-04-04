<script lang="ts" setup>
import type { PatientBaseInfo } from '@/types/patient.type'
// prop
const props = defineProps<{ data: PatientBaseInfo; show: boolean }>()
// event
const emits = defineEmits(['command', 'update:show'])
// ref
const popupRef = ref<UniHelper.UniPopupProps>()

function onClick(name: PopupCommandType) {
  popupRef.value?.close()
  emits('command', name)
  emits('update:show', false)
}

watch(() => props.show, (val) => {
  if (val === true && popupRef.value)
    popupRef.value.open()
})

function onPopupChange(e: UniEvent<{ val: boolean }>) {
  const show = e.detail?.val
  if (!show)
    emits('update:show', false)
}
</script>

<template>
  <view class="component  patient-query-popup">
    <uni-popup ref="popupRef" @change="onPopupChange">
      <view class="component patient-query-popup-content w-220px bg-white">
        <view class="flex justify-center text-xl p-y-2 bg-gray-200 font-500">
          <text>{{ props.data.name }}</text>
          <text class="m-x-4">
            {{ props.data.sex }}
          </text>
          <text>{{ props.data.age }}</text>
        </view>
        <view class=" column p-8">
          <button class="w-full" @click="onClick('visitRecord')">
            术前访视记录单
          </button>
          <button class="w-full m-y-4" @click="onClick('contract')">
            知情同意书
          </button>
          <button class="w-full" @click="onClick('narcotizingRecord')">
            麻醉记录单
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>

</style>

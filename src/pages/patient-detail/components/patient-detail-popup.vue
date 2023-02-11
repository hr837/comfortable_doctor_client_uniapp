<script lang="ts" setup>
// prop
const props = defineProps<{ show: boolean }>()
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
  <view class="component  patient-detail-popup">
    <uni-popup ref="popupRef" type="top" @change="onPopupChange">
      <view class="component patient-detail-popup-content float-right w-220px  bg-white ">
        <view class=" column p-8">
          <button class="w-full" @click="onClick('visitRecord')">
            术前访视记录单
          </button>
          <button class="w-full m-t-4" @click="onClick('contract')">
            知情同意书
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-detail-popup-content {
  margin-top: var(--window-top);
}
</style>

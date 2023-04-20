<script lang="ts" setup>
import { getUserSign } from '@/utils/api'

const props = defineProps<{ loginCode: string }>()
const emits = defineEmits(['signed', 'click'])

const imageSrc = ref('/static/sign.png')

watch(
  () => props.loginCode,
  (code: string) => {
    if (!code)
      return
    getUserSign(code).then((data) => {
      const blobData = new Blob([data], { type: 'image/*' })
      imageSrc.value = URL.createObjectURL(blobData)
      emits('signed', data)
    })
  },
)

onBeforeUnmount(() => {
  URL.revokeObjectURL(imageSrc.value)
})
</script>

<template>
  <view class="component doctor-sign">
    <image :src="imageSrc" class="doctor-sign-image" @click="$emit('click')" />
  </view>
</template>

<style lang="scss" scoped>
.doctor-sign{
  &-image{
    width: 192px;
    height: 70px;
  }
}
</style>

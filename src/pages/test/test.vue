<script lang="ts" setup>
import { getUserSign } from '@/utils/api'

const imageSrc = ref('/static/sign.png')

function onClick() {
  getUserSign('001668').then((data) => {
    console.log(data)
    // const result = uni.arrayBufferToBase64(data)
    // console.log(result)
    // imageSrc.value = `data:image/*;base64,${result}`
    const blobData = new Blob([data], { type: 'image/*' })
    const url = URL.createObjectURL(blobData)
    imageSrc.value = url
  })
}
</script>

<template>
  <view class="page">
    <button @click="onClick">
      获取图片
    </button>

    <image :src="imageSrc" />
  </view>
</template>

<style lang="less" scoped></style>

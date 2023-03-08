<script lang="ts" setup>
let src = '/static/mobile-viewer/viewer.html'

onLoad((query) => {
  if (query === undefined)
    return
  const { name, sex, age, file } = query
  const title = `${name} ${sex} ${age}岁`
  uni.setNavigationBarTitle({ title })
  src += `?file=${file}`
})
</script>

<template>
  <view class="component patient-attach-file">
    <web-view :src="src" />
  </view>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
// let src = '/static/mobile-viewer/viewer.html'
let src = 'http://10.0.2.2'

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

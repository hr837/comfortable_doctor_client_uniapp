<script setup lang="ts">
import { GridMenuSetting } from '@/composables'

onMounted(() => {

  // const webView = this.$mp.page.$getAppWebview();
})

onNavigationBarButtonTap((o) => {
  if (o.index !== 0)
    return
  setTitleButtonText((Math.random() * 10000).toFixed(0))
})

function setTitleButtonText(text: string) {
  const [page] = getCurrentPages().slice(-1)
  if (!page)
    return
  if (!page.$getAppWebview)
    return
  const webView = page.$getAppWebview()
  webView.setTitleNViewButtonStyle(1, { text })
}

function onChagne(e: UniEvent<{ index: number }>) {
  const index = e.detail?.index
  if (index !== undefined && index > -1) {
    const { path } = GridMenuSetting[index]
    uni.navigateTo({
      url: path,
    })
  }
}
</script>

<template>
  <view class="page">
    <uni-grid class="px-6 py-4" :column="5" :show-border="false" @change="onChagne">
      <uni-grid-item v-for="(item, index) of GridMenuSetting" :key="`grid-item-${index + 1}`" :index="index">
        <uni-icons custom-prefix="iconfont" :type="item.icon" />
        <text>{{ item.text }}</text>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<style lang="scss" scoped>
.uni-grid-item {
  padding: 1em;

  :deep(.uni-grid-item__box) {
    @apply: rounded-2 justify-center items-center border border-solid border-gray-2 #{!important};
  }

  .uni-icons.iconfont {
    font-size: 4em !important;
    line-height: 1.2;
  }
}
</style>

<script setup lang="ts">
import { GridMenuSetting } from "@/composables";
import type { UniGridOnChange } from "@uni-helper/uni-ui-types";
import { ref } from 'vue'
const title = ref('Hello')


onMounted(() => {

  // const webView = this.$mp.page.$getAppWebview();
})

onNavigationBarButtonTap((o) => {
  if (o.index !== 0) return;
  setTitleButtonText((Math.random() * 10000).toFixed(0))
})

function setTitleButtonText(text: string) {
  const [page] = getCurrentPages().slice(-1);
  if (!page) return
  if (!page.$getAppWebview) return
  const webView = page.$getAppWebview();
  webView.setTitleNViewButtonStyle(1, { text })
}

function onChagne({ detail: { index } }: UniEvent<{ index: number }>) {
  const info = GridMenuSetting[index]
  uni.showToast({
    title: info.text
  })
}

</script>

<template>
  <view class="page">
    <uni-grid class="px-6 py-4" :column="5" :show-border="false" @change="onChagne">
      <uni-grid-item v-for="(item, index) of GridMenuSetting" :index="index" :key="`grid-item-${index + 1}`">
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
    border: 1px solid #e5e7eb !important;
    border-radius: 0.5em;
    justify-content: center;
    align-items: center;
  }

  .uni-icons.iconfont {
    font-size: 4em !important;
    line-height: 1.2;
  }
}
</style>

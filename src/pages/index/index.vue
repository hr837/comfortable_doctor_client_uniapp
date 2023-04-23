<script setup lang="ts">
import { GridMenuSetting } from '@/composables'
import { STORE_KEY_USER } from '@/utils/app.constant'

const goToLogin = () =>
  uni.redirectTo({
    url: '/pages/login/login',
  })

onLoad(() => {
  const userInfo = uni.getStorageSync(STORE_KEY_USER)
  if (!userInfo) {
    uni.setNavigationBarTitle({
      title: '未登录',
    })
    goToLogin()
  }
  else {
    const { UserName, UserId, UserRole } = userInfo
    const title = `${UserName} (${UserId}) ${UserRole}`
    uni.setNavigationBarTitle({ title })
  }
})

onNavigationBarButtonTap(({ index }) => {
  if (index === 0)
    goToLogin()
})

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
    <uni-grid class="px-6 py-4" :column="4" :show-border="false" @change="onChagne">
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

<script lang="ts" setup>
import { getPackages } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { STORE_KEY_USER } from '@/utils/app.constant'

const emits = defineEmits(['onClose', 'onConfirm'])

const packageInfo = ref<ApiResonseType.PackageInfo[]>([])
const current = ref(0)
const currentPackageId = ref('')

onMounted(() => {
  const userInfo: ApiResonseType.UserInfo | undefined = uni.getStorageSync(STORE_KEY_USER)
  if (userInfo) {
    getPackages(userInfo.LoginName).then((data) => {
      packageInfo.value = data
    })
  }
})

function onItemClick(e: { currentIndex: number }) {
  current.value = e.currentIndex
}

function onPackageClick(id: string) {
  currentPackageId.value = id
}

function onClose() {
  emits('onClose')
}

function onConfirm() {
  emits('onConfirm')
}

const packgeType = computed(() => current.value === 0 ? '个人' : '公共')
const list = computed(() => packageInfo.value.filter(x => x.PackageType === packgeType.value))
</script>

<template>
  <uni-popup-dialog
    class="component doctor-template-select" mode="base" type="info" title="选择模板" confirm-text="保存"
    before-close @close="onClose" @confirm="onConfirm"
  >
    <view class="doctor-template-select-container">
      <uni-segmented-control :current="current" :values="['个人模板', '公共模板']" @click-item="onItemClick" />
      <view class="doctor-template-select-list">
        <view
          v-for="item of list" :key="item.PackageId" class="doctor-template-select-item"
          :class="{ actived: item.PackageId === currentPackageId }" @click="() => onPackageClick(item.PackageId)"
        >
          {{ item.PackageName }}
        </view>
      </view>
    </view>
  </uni-popup-dialog>
</template>

<style lang="scss" scoped>
.doctor-template-select {
  &-container {
    @apply w-full p-x-4 p-y-2;
  }

  &-list {
    @apply h-200px overflow-auto;
  }

  &-item {
    @apply text-center p-1 m-y-2 bg-gray-1 border border-solid border-gray-2 rounded ;

    &.actived{
      @apply bg-gray-3;
    }
  }

}
</style>

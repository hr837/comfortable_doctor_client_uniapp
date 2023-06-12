<script lang="ts" setup>
import { getPrinterList, print } from '@/utils/api'
import type { ApiResonseType, ItemInfo } from '@/utils/api.help'
import { STORE_KEY_USER } from '@/utils/app.constant'

const emits = defineEmits(['update:visable'])
const props = defineProps<{
  id: string,
  formType: "1" | "2",
  visable: boolean
}>()


const currentPrinter = ref('')
const loginName = ref("")

const list = ref<ItemInfo[]>([])
const popupRef = ref()

onMounted(() => {
  const userInfo: ApiResonseType.UserInfo | undefined = uni.getStorageSync(STORE_KEY_USER)
  if (userInfo) {
    loginName.value = userInfo.LoginName
  }
})
watch(() => props.visable, (val) => {
  if (val) {
    currentPrinter.value = ''
    getPrinterList().then((data) => {
      list.value = data
      if (!data.length) {
        uni.showToast({
          title: '无可用打印机',
          icon: 'error',
        })
      }
    }).catch(() => {
      uni.showToast({
        title: '获取打印机列表失败',
        icon: 'error',
      })
    })
    popupRef.value.open()
  }
})

function onItemClick(printerCode: string) {
  currentPrinter.value = printerCode
}



function closePopup() {
  popupRef.value.close()
  emits('update:visable', false)
}

function onConfirm() {
  if (!currentPrinter.value) {
    return uni.showToast({
      title: '请选择打印机',
      icon: 'none',
    })
  }
  print(props.id, props.formType, currentPrinter.value, loginName.value).then(() => {
    uni.showToast({
      title: '已提交打印',
      icon: 'success',
    })
    closePopup()
  }).catch(() => {
    uni.showToast({
      title: '打印失败',
      icon: 'error',
    })
  })
}

</script>

<template>
  <uni-popup class="component print-select" ref="popupRef">
    <uni-popup-dialog mode="base" type="info" title="选择打印机" confirm-text="确认" before-close @close="closePopup"
      @confirm="onConfirm">
      <view class="print-select-container">
        <view class="print-select-list">
          <view v-for="item of list" :key="item.ItemCode" class="print-select-item"
            :class="{ actived: item.ItemCode === currentPrinter }" @click="() => onItemClick(item.ItemCode)">
            {{ item.ItemName }}
          </view>
        </view>
      </view>
    </uni-popup-dialog>
  </uni-popup>
</template>

<style lang="scss" scoped>
.print-select {
  &-container {
    @apply w-full p-x-4 p-y-2;
  }

  &-list {
    @apply h-200px overflow-auto;
  }

  &-item {
    @apply text-center p-1 m-y-2 bg-gray-1 border border-solid border-gray-2 rounded;

    &.actived {
      @apply bg-gray-3;
    }
  }

}
</style>

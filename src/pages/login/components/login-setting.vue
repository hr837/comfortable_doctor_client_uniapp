<script lang="ts" setup>
import { STORE_KEY_SERVER } from '@/utils/app.constant'

const emits = defineEmits(['settinged'])
const defaultValue = ref('')
const inputDialog = ref()
onMounted(() => {
  defaultValue.value = uni.getStorageSync(STORE_KEY_SERVER) ?? ''
})

function onSettingClick() {
  inputDialog.value?.open()
}

function onDialogClose() {
  inputDialog.value?.close()
}

function dialogInputConfirm(val: any) {
  if (!val)
    return
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
  if (!reg.test(val)) {
    uni.showToast({
      icon: 'none',
      title: '请输入合法的URL地址',
    })
  }
  else {
    uni.setStorage({
      key: STORE_KEY_SERVER,
      data: val,
      success: () => {
        defaultValue.value = val
        emits('settinged')
        onDialogClose()
      },
    })
  }
}
</script>

<template>
  <view class="component login-setting">
    <uni-icons type="gear-filled" size="24" @click="onSettingClick" />
  </view>

  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog
      mode="input" title="服务器地址设置" before-close :value="defaultValue!" placeholder="请输入内容"
      @confirm="dialogInputConfirm" @close="onDialogClose"
    />
  </uni-popup>
</template>

<script lang="ts" setup>
import { getOperateRooms } from '@/utils/api'
import { STORE_KEY_SERVER, STORE_ROOM_LIST } from '@/utils/app.constant'

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

function resetOperateRooms() {
  getOperateRooms().then((data) => {
    const localData = data.map(item => ({
      text: item.RoomName,
      value: item.RoomCode,
      disable: false,
    }))
    uni.setStorage({
      key: STORE_ROOM_LIST,
      data: localData,
      success: () => {
        emits('settinged')
        onDialogClose()
      },
    })
  }).catch(() => {
    uni.showToast({
      title: '获取操作间列表失败',
      icon: 'error',
    })
  })
}

function dialogInputConfirm(val: any) {
  if (!val)
    return
  // 验证Server
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
  if (!reg.test(val)) {
    uni.showToast({
      icon: 'none',
      title: '请输入合法的URL地址',
    })
  }
  else {
    uni.setStorageSync(STORE_KEY_SERVER, val)
    defaultValue.value = val
    resetOperateRooms()
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

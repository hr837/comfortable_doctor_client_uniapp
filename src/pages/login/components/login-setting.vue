<script lang="ts" setup>
import { getOperateRooms } from '@/utils/api'
import { STORE_KEY_SERVER, STORE_KEY_SYSNAME, STORE_ROOM_LIST } from '@/utils/app.constant'

const emits = defineEmits(['settinged'])

const formModel = reactive({
  serverBase: '',
  sysName: '',
})

const rules: UniHelper.UniFormsRules = {
  serverBase: {
    rules: [
      { required: true, errorMessage: '请输入服务地址' },
      { format: 'url', errorMessage: '请输入正确的URL地址' },
    ],
  },
  sysName: {
    rules: [{ required: true, errorMessage: '系统名称' }],
  },
}

const pupupRef = ref()
const formRef = ref()

onMounted(() => {
  formModel.serverBase = uni.getStorageSync(STORE_KEY_SERVER) ?? ''
  formModel.sysName = uni.getStorageSync(STORE_KEY_SYSNAME) ?? ''
})

function onSettingClick() {
  pupupRef.value?.open()
}

function onCancel() {
  pupupRef.value?.close()
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
        onCancel()
      },
    })
  }).catch(() => {
    uni.showToast({
      title: '获取操作间列表失败',
      icon: 'error',
    })
  })
}

function onSubmit() {
  formRef.value.validate().then(() => {
    let url = formModel.serverBase
    if (url.slice(-1) === '/')
      url = url.slice(0, -1)

    uni.setStorageSync(STORE_KEY_SERVER, url)
    uni.setStorageSync(STORE_KEY_SYSNAME, formModel.sysName)
    resetOperateRooms()
  }).catch(() => { })
}
</script>

<template>
  <view class="component login-setting">
    <uni-icons type="gear-filled" size="24" @click="onSettingClick" />
  </view>

  <uni-popup ref="pupupRef" background-color="#fff">
    <view class="login-setting-popup-container">
      <view class="login-setting-popup-title">
        系统设置
      </view>
      <uni-forms ref="formRef" class="login-setting-popup-form" :model="formModel" :rules="rules" label-width="100">
        <uni-forms-item label="服务地址" name="serverBase" required>
          <uni-easyinput v-model="formModel.serverBase" placeholder="http[s]://example.com" />
        </uni-forms-item>
        <uni-forms-item label="系统名称" name="sysName" required>
          <uni-easyinput v-model="formModel.sysName" placeholder="系统名称" />
        </uni-forms-item>
      </uni-forms>
      <view class="login-setting-popup-buttons">
        <button class="login-setting-popup-button" @click="onCancel">
          取消
        </button>
        <button class="login-setting-popup-button login-setting-popup-button--save " type="primary" @click="onSubmit">
          保存
        </button>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss" scoped>
.login-setting-popup {
  &-container {
    @apply w-460px;
  }

  &-title {
    @apply text-center p-3 border-b border-solid border-b-gray-200 font-bold;
  }

  &-form {
    @apply p-8 p-b-6;
  }

  &-buttons {
    @apply row p-b-8 p-r-8 justify-end;
  }

  &-button {
    @apply w-120px m-0;

    &--save {
      @apply m-l-4;
    }
  }
}
</style>

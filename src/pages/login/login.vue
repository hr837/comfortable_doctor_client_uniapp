<script lang="ts" setup>
import LoginSetting from './components/login-setting.vue'
import { getDeptList, login } from '@/utils/api'
import type { ApiRequestType } from '@/utils/api.help'
import { STORE_KEY_ROOM, STORE_KEY_USER, STORE_ROOM_LIST } from '@/utils/app.constant'

const loginModel = reactive<ApiRequestType.Login & { RoomCode: string }>({
  LoginName: '',
  Password: '',
  RoomCode: '',
})

const rules = {
  LoginName: {
    rules: [{ required: true, errorMessage: '请输入登录账号' }],
  },
  Password: {
    rules: [{ required: true, errorMessage: '请输入登录密码' }],
  },
}

const formRef = ref<UniForm>()
const goToIndex = () => uni.redirectTo({
  url: '/pages/index/index',
})
const roomList = ref<UniHelper.UniDataSelectLocaldata[]>([])

function refreshRoomList() {
  const localData = uni.getStorageSync(STORE_ROOM_LIST)
  if (!localData) {
    uni.showToast({
      title: '或许还没有设置服务器地址',
      icon: 'none',
    })
  }
  else {
    roomList.value = localData
    const localCode = uni.getStorageSync(STORE_KEY_ROOM)
    nextTick(() => loginModel.RoomCode = localCode ?? '')
  }
}

onMounted(refreshRoomList)

const toLogin = () => login(loginModel).then((data) => {
  // 缓存默认手术间
  uni.setStorageSync(STORE_KEY_ROOM, loginModel.RoomCode)
  // 缓存用户信息
  uni.setStorage({
    key: STORE_KEY_USER,
    data,
    success: goToIndex,
  })
  // 全局存放部门数据
  getDeptList().then((dataDept) => {
    getApp().globalData!.deptList = dataDept
  })
}).catch(() => uni.showToast({
  title: '用户名或密码错误',
  icon: 'error',
}))

function submitForm() {
  formRef.value?.validate([], (err) => {
    if (!err)
      toLogin()
  })
}
</script>

<template>
  <view class="page login">
    <view class="login-setting">
      <LoginSetting @settinged="refreshRoomList" />
    </view>
    <image class="login-logo" src="/static/login-logo.png" />
    <view class="login-title">
      麻醉舒适化管理信息系统
    </view>

    <view class="login-form-container">
      <uni-forms ref="formRef" class="login-form" :model="loginModel" :rules="rules">
        <uni-forms-item name="LoginName">
          <uni-easyinput v-model="loginModel.LoginName" prefix-icon="person" placeholder="账号" confirm-type="next" />
        </uni-forms-item>
        <uni-forms-item name="Password">
          <uni-easyinput ref="inputPwdRef" v-model="loginModel.Password" prefix-icon="locked" type="password" placeholder="密码" />
        </uni-forms-item>
        <uni-forms-item name="RoomCode">
          <uni-data-select v-model="loginModel.RoomCode" class="login-form-select" :localdata="roomList" placeholder="请选择手术间" />
        </uni-forms-item>
      </uni-forms>

      <button type="primary" class="login-submit" @click="submitForm">
        立即登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login {
  background-color: #0093E9;
  background-image: linear-gradient(45deg, #0093E9 0%, #80D0C7 100%);

  @apply absolute top-0 right-0 bottom-0 left-0 items-center;

  .login-logo {
    height: 400px;
    width: 450px;
  }

  .login-setting {
    @apply absolute top-8 right-8;
  }

  .login-title {
    @apply m-b-60px text-4xl font-bold text-gray-600;
  }

  .login-form-container {
    width: 400px;
  }

  .login-form-select {
    ::v-deep .uni-select {
      background-color: #fff;
    }
  }

  .login-submit{
    padding: 12px;
  }
}
</style>

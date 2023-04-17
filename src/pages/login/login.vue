<script lang="ts" setup>
import LoginSetting from './components/login-setting.vue'
import { getDeptList, getOperateRooms, login } from '@/utils/api'
import type { ApiRequestType } from '@/utils/api.help'
import { STORE_KEY_USER } from '@/utils/app.constant'

const loginModel = reactive<ApiRequestType.Login>({
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
  getOperateRooms().then((data) => {
    roomList.value = data.map(item => ({
      text: item.RoomName,
      value: item.RoomCode,
      disable: false,
    }))
  })
}

onMounted(refreshRoomList)

const toLogin = () => login(loginModel).then((data) => {
  uni.setStorage({
    key: STORE_KEY_USER,
    data,
    success: goToIndex,
  })
  getDeptList().then((dataDept) => {
    getApp().globalData!.deptList = dataDept
  })
})
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
    <view class="login-title">
      舒适化治疗医生客户端
    </view>

    <view class="login-form-container">
      <uni-forms ref="formRef" class="login-form" :model="loginModel" :rules="rules">
        <uni-forms-item name="LoginName">
          <uni-easyinput v-model="loginModel.LoginName" prefix-icon="person" placeholder="账号" />
        </uni-forms-item>
        <uni-forms-item name="Password">
          <uni-easyinput v-model="loginModel.Password" prefix-icon="locked" type="password" placeholder="密码" />
        </uni-forms-item>
        <uni-forms-item name="RoomCode">
          <uni-data-select v-model="loginModel.RoomCode" :localdata="roomList" placeholder="请选择手术间" />
        </uni-forms-item>
      </uni-forms>

      <button type="primary" @click="submitForm">
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

  .login-setting {
    @apply absolute top-8 right-8;
  }

  .login-title {
    @apply m-y-150px text-4xl font-bold text-gray-600;
  }

  .login-form-container {
    width: 400px;
  }
}
</style>

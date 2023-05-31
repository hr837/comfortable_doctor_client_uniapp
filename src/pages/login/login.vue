<script lang="ts" setup>
import LoginSetting from './components/login-setting.vue'
import { getDeptList, login } from '@/utils/api'
import type { ApiRequestType } from '@/utils/api.help'
import { STORE_KEY_ROOM, STORE_KEY_SYSNAME, STORE_KEY_USER, STORE_ROOM_LIST, SYS_NAME_DEFAULT } from '@/utils/app.constant'

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

const formRef = ref()
const goToIndex = () => uni.redirectTo({
  url: '/pages/index/index',
})
const roomList = ref<UniHelper.UniDataSelectLocaldata[]>([])

const sysName = ref(SYS_NAME_DEFAULT)

function refreshRoomList() {
  const localData = uni.getStorageSync(STORE_ROOM_LIST)
  sysName.value = uni.getStorageSync(STORE_KEY_SYSNAME) ?? SYS_NAME_DEFAULT

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
  formRef.value?.validate().then(toLogin).catch(() => { })
}
</script>

<template>
  <view class="page login">
    <view class="login-setting">
      <uni-data-select
        v-model="loginModel.RoomCode" class="login-setting-room" :localdata="roomList" :clear="false"
        placeholder="手术间"
      />
      <LoginSetting @settinged="refreshRoomList" />
    </view>
    <image class="login-logo" src="/static/login-logo.png" />
    <view class="login-title">
      {{ sysName }}
    </view>
    <view class="login-form-container">
      <uni-forms ref="formRef" class="login-form" :model="loginModel" :rules="rules">
        <uni-forms-item name="LoginName">
          <uni-easyinput v-model="loginModel.LoginName" prefix-icon="person" placeholder="账号" confirm-type="next" />
        </uni-forms-item>
        <uni-forms-item name="Password">
          <uni-easyinput
            ref="inputPwdRef" v-model="loginModel.Password" prefix-icon="locked" type="password"
            placeholder="密码"
          />
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
    @apply row items-center absolute top-8 right-8;

    &-room {
      margin-right: 8px;

      ::v-deep .uni-select {
        background-color: transparent;
        border: none;

        .uni-select__input-text,
        .uni-icons {
          color: #fff;
          margin-right: 4px;
        }

        .uni-icons {
          color: #fff !important;
        }
      }
    }
  }

  .login-title {
    @apply m-b-80px text-4xl font-bold text-gray-600;
  }

  .login-form-container {
    width: 400px;
  }

  // #ifdef APP-PLUS
  .login-submit {
    padding: 12px;
  }

  // #endif
}
</style>

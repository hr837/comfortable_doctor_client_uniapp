<script lang="ts" setup>
import DoctorInput from './doctor-input.vue'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { getUserSign, login } from '@/utils/api'
import { STORE_KEY_USER } from '@/utils/app.constant'

interface PropsType {
  /** 医生类型 */
  roleCode: ApiRequestType.RoleCode
  /** 签名Code */
  signCode: string
  disabled: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
})
const emits = defineEmits(['signed', 'click'])

const DEFAULT_SRC = '/static/sign.png'
const imageSrc = ref(DEFAULT_SRC)
const showDoctorSelect = ref(false)
const popupTitle = ref('签名')
const popupPwdRef = ref<UniHelper.UniPopupProps>()

const currentUser = reactive({
  userCode: '',
  userName: '',
})

// 用户选择之后
function onUserSelectd(userInfo?: ApiResonseType.UserInfo) {
  if (!userInfo)
    return
  currentUser.userCode = userInfo.LoginName
  currentUser.userName = userInfo.UserName
  popupTitle.value = `签名-${userInfo.UserName}【${userInfo.LoginName}】`
  popupPwdRef.value?.open()
}

/** 校验密码后获取签名 */
function dialogInputConfirm(pwd: any) {
  login({
    LoginName: currentUser.userCode,
    Password: pwd,
  })
    .then(() => {
      emits('signed', currentUser)
      showDoctorSelect.value = false
    })
    .catch(() => {
      uni.showToast({
        title: '验证失败',
        icon: 'none',
      })
    })
}

// 询问
function onImageClick() {
  if (props.disabled)
    return
  emits('click')
  if (props.roleCode === 'Anesthetist') {
    uni.showModal({
      title: '提示',
      content: '是否使用当前用户',
      cancelText: '否',
      confirmText: '是',
      success: ({ confirm }) => {
        if (!confirm) {
          emits('signed', null)
          showDoctorSelect.value = true
        }
        else {
          onUserSelectd(uni.getStorageSync(STORE_KEY_USER))
        }
      },
    })
  }
  else {
    // 显示用户选择框
    showDoctorSelect.value = true
  }
}

/** 监听属性签名code 显示用户签名 */
watch(() => props.signCode, (val: string) => {
  if (!val) {
    imageSrc.value = '/static/sign.png'
  }
  else {
    getUserSign(val).then((data) => {
      const baseStr = uni.arrayBufferToBase64(data)
      imageSrc.value = `data:image/*;base64,${baseStr}`
    })
  }
})
</script>

<template>
  <view class="component doctor-sign">
    <!-- 密码弹窗 -->
    <uni-popup ref="popupPwdRef" type="dialog">
      <uni-popup-dialog
        ref="inputDialogRef" mode="input" :title="popupTitle" input-type="password" value=""
        placeholder="请输入密码验证" @confirm="dialogInputConfirm"
      />
    </uni-popup>
    <image :src="imageSrc" class="doctor-sign-image" @click="onImageClick" />
    <DoctorInput
      v-show="showDoctorSelect" :role-code="roleCode" class="form-item-doctor-name"
      @selected="onUserSelectd"
    />
  </view>
</template>

<style lang="scss" scoped>
.doctor-sign {
  &-image {
    width: 192px;
    height: 70px;
  }
}
</style>

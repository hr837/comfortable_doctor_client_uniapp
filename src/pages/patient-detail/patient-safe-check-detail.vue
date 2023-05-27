<script lang="ts" setup>
import ThePatientSafeCheckHeader from './components/the-patient-safe-check-header.vue'
import PatientSafeCheckTable from './components/patient-safe-check-table.vue'
import PatientSafeCheckSign from './components/patient-safe-check-sign.vue'
import { getCheckDetail, getSafeCheckData } from '@/composables/patient-safe-check-detail.composable'
import { checkCustomFormData, saveCustomFormList } from '@/utils/api'
import { STORE_KEY_USER } from '@/utils/app.constant'
import type { ApiResonseType } from '@/utils/api.help'
const isAnalgesia = ref(false)
const disabledEdit = ref(false)

const requestData = {
  AnesthesiaId: '',
  FormType: '1',
  LoginName: '',
}

const headerRef = ref()
onLoad((query) => {
  if (query === undefined)
    return

  requestData.AnesthesiaId = query.Id
  isAnalgesia.value = query.IsAnalgesia === 'true'
  setTimeout(() => {
    headerRef.value?.revertData(query)
  }, 100)
  getCheckDetail(query.Id, isAnalgesia.value)
    .then(val => disabledEdit.value = val)

  const user: ApiResonseType.UserInfo = uni.getStorageSync(STORE_KEY_USER)
  if (user)
    requestData.LoginName = user.LoginName
})

function onSave() {
  const _requestData = {
    ...requestData,
    IsChecked: false,
    Items: getSafeCheckData(),
  }
  saveCustomFormList(_requestData).then(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })
  })
}

function onVerify() {
  checkCustomFormData(requestData.AnesthesiaId, requestData.LoginName).then(() => {
    uni.showToast({
      title: '已提交',
      icon: 'success',
    })
    disabledEdit.value = true
  })
}
</script>

<template>
  <view class="page patient-safe-check-detail">
    <ThePatientSafeCheckHeader ref="headerRef" />
    <PatientSafeCheckTable :disabled="disabledEdit" />
    <PatientSafeCheckSign :disabled="disabledEdit" :is-analgesia="isAnalgesia" />
    <view v-if="!disabledEdit" class="patient-safe-check-detail-bottom ">
      <button type="primary" class="submit-button" @click="onSave">
        保存
      </button>
      <button type="primary" class="submit-button submit-button-verify" @click="onVerify">
        审核
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-safe-check-detail-bottom {
  @apply row justify-center m-t-4;

  .submit-button {
    width: 120px;
    margin: 0;

    &.submit-button-verify {
      margin-left: 40px;
    }
  }
}
</style>

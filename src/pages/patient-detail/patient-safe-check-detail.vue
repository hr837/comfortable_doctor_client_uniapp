<script lang="ts" setup>
import PatientSafeCheckHeader from './components/patient-safe-check-header.vue'
import PatientSafeCheckTable from './components/patient-safe-check-table.vue'
import PatientSafeCheckSign from './components/patient-safe-check-sign.vue'
import { editSafeCheckSignData, getCheckDetail, getSafeCheckData } from '@/composables/patient-safe-check-detail.composable'
import { checkCustomFormData, checkPrinted, saveCustomFormList, unCheckCustomFormData } from '@/utils/api'
import { STORE_KEY_USER } from '@/utils/app.constant'
import type { ApiResonseType } from '@/utils/api.help'
import { goToFeeTypeDetailPage } from '@/composables'
import PrinterSelect from './components/printer-select.vue'

const isAnalgesia = ref(false)
const patientId = ref('')
const disabledEdit = ref(false)

const requestData = {
  AnesthesiaId: '',
  FormType: '1',
  LoginName: '',
}

onLoad((query) => {
  if (query === undefined)
    return

  patientId.value = query.Id
  requestData.AnesthesiaId = query.Id
  isAnalgesia.value = query.IsAnalgesia === 'true'
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

async function onVerify() {
  let validated = true
  if (!editSafeCheckSignData.doctorSign || !editSafeCheckSignData.nurseSign)
    validated = false
  if (isAnalgesia.value && !editSafeCheckSignData.narcoticDoctorSign)
    validated = false

  if (!validated) {
    const agreed = await uni.showModal({
      title: '数据验证提醒',
      content: '签名信息不完整，是否继续提交？',
    }).then(v => v.confirm === true)
      .catch(() => false)
    if (!agreed)
      return
  }

  const _requestData = {
    ...requestData,
    IsChecked: false,
    Items: getSafeCheckData(),
  }
  const saved = await saveCustomFormList(_requestData).then(() => true).catch(() => false)

  if (!saved)
    return
  checkCustomFormData(requestData.AnesthesiaId, requestData.LoginName).then(() => {
    uni.showToast({
      title: '已提交',
      icon: 'success',
    })
    disabledEdit.value = true
  })
}

function onCancelVerify() {
  unCheckCustomFormData(requestData.AnesthesiaId, requestData.LoginName).then(() => {
    uni.showToast({
      title: '已取消核查',
      icon: 'success',
    })
    disabledEdit.value = false
  })
}

onNavigationBarButtonTap(({ index }) => {
  if (index !== 0)
    return
  goToFeeTypeDetailPage(requestData.AnesthesiaId, isAnalgesia.value)
})

const visablePrint = ref(false);

function onPrintClick() {
  checkPrinted(requestData.AnesthesiaId, "1").then(() => {
    uni.showModal({
      title: '打印确认',
      content: '已经打印，是否重新打印？',
    }).then(res => {
      visablePrint.value = res.confirm
    })

  }).catch(() => visablePrint.value = true)
}
</script>

<template>
  <view class="page patient-safe-check-detail">
    <PrinterSelect :id="requestData.AnesthesiaId" form-type="1" v-model:visable="visablePrint" />
    <PatientSafeCheckHeader :id="patientId" />
    <PatientSafeCheckTable :disabled="disabledEdit" />
    <PatientSafeCheckSign :disabled="disabledEdit" :is-analgesia="isAnalgesia" />
    <view class="patient-safe-check-detail-bottom ">
      <button v-if="!disabledEdit" type="primary" class="submit-button" @click="onSave">
        保存
      </button>
      <button v-if="!disabledEdit" type="primary" class="submit-button submit-button-verify" @click="onVerify">
        审核
      </button>
      <button v-if="disabledEdit" type="primary" class="submit-button submit-button-verify-cancel"
        @click="onCancelVerify">
        取消审核
      </button>
      <button v-if="disabledEdit" type="primary" class="submit-button submit-button-print" @click="onPrintClick">
        打印
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-safe-check-detail-bottom {
  @apply row justify-center m-y-4;

  .submit-button {
    width: 120px;
    margin: 0;

    &.submit-button-verify,
    &.submit-button-verify-cancel,
    &.submit-button-print {
      margin-left: 40px;
    }
  }
}
</style>

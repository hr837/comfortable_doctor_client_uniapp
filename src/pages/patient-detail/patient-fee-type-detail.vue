<script lang="ts" setup>
import PatientFeeTypeHeader from './components/patient-fee-type-header.vue'
import DoctorSign from './components/doctor-sign.vue'
import { dateTimeFormat, goToCheckDetailPage } from '@/composables'
import { feeItemsChecked, feeItemsUnChecked, getRecordFeeItems, saveFeeItems } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { STORE_KEY_USER } from '@/utils/app.constant'
import { initFeeConfig } from '@/composables/patient-fee-type-detail.composable'
import PatientFeeTypeSet from "./components/patient-fee-type-set.vue";

const disabledEdit = ref(false)
const isAnalgesia = ref(false)
const requestData = reactive({
  AnesthesiaId: '',
  RecordTime: '',
  RecorderCode: '',
})

const feeTypeRef = ref();

onLoad((query) => {
  if (query === undefined)
    return

  requestData.AnesthesiaId = query.Id
  isAnalgesia.value = query.IsAnalgesia === 'true'
  initFeeConfig().then(revertCheckFeeItems)
})

function revertCheckFeeItems() {
  getRecordFeeItems(requestData.AnesthesiaId).then((data) => {
    if (!data) {
      nextTick(() => {
        feeTypeRef.value.revertData([])
      })
      return
    }
    requestData.RecordTime = dateTimeFormat(data.RecordTime)
    requestData.RecorderCode = data.RecorderCode
    disabledEdit.value = data.IsChecked
    nextTick(() => {
      feeTypeRef.value.revertData(data.FeeItems)
    })
  }).catch(() => { })
}

function setSignInfo(data?: any) {
  const dateStr = dateTimeFormat(new Date().toLocaleString())
  requestData.RecorderCode = data?.userCode ?? ''
  requestData.RecordTime = data ? dateStr : ''
}

function onSave() {
  const items = feeTypeRef.value.getData()
  const _requestData = {
    ...requestData,
    IsChecked: false,
    FeeItems: items,
  }
  saveFeeItems(_requestData).then(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })
  })
}

async function onVerify() {
  const items = feeTypeRef.value.getData()
  if (items.length < 1) {
    const agreed = await uni.showModal({
      title: '数据验证提醒',
      content: '还未设置费用项，是否继续提交？',
    }).then(v => v.confirm === true).catch(() => false)
    if (!agreed)
      return
  }

  if (!requestData.RecorderCode) {
    const agreed = await uni.showModal({
      title: '数据验证提醒',
      content: '还未签名，是否继续提交？',
    }).then(v => v.confirm === true).catch(() => false)
    if (!agreed)
      return
  }

  const _requestData = {
    ...requestData,
    IsChecked: false,
    FeeItems: items,
  }

  const saved = await saveFeeItems(_requestData).then(() => true).catch(() => false)

  if (!saved)
    return
  const user: ApiResonseType.UserInfo = uni.getStorageSync(STORE_KEY_USER)
  if (user) {
    feeItemsChecked(requestData.AnesthesiaId, user.LoginName).then(() => {
      uni.showToast({
        title: '已提交',
        icon: 'success',
      })
      disabledEdit.value = true
    })
  }
}

function onCancelVerify() {
  const user: ApiResonseType.UserInfo = uni.getStorageSync(STORE_KEY_USER)
  if (user) {
    feeItemsUnChecked(requestData.AnesthesiaId, user.LoginName).then(() => {
      uni.showToast({
        title: '已取消核查',
        icon: 'success',
      })
      disabledEdit.value = false
    })
  }
}

onNavigationBarButtonTap(({ index }) => {
  if (index !== 0)
    return
  goToCheckDetailPage(requestData.AnesthesiaId, isAnalgesia.value)
})
</script>

<template>
  <view class="page patient-fee-type-detail">
    <PatientFeeTypeHeader :id="requestData.AnesthesiaId" />
    <PatientFeeTypeSet :disabled="disabledEdit" ref="feeTypeRef" />
    <uni-forms class="patient-fee-type-detail-form" :model="requestData" label-width="70px" label-align="right">
      <view class="row justify-center">
        <uni-forms-item label="计费人" name="nurseName" class="patient-fee-type-detail-form-item-sign">
          <DoctorSign :disabled="disabledEdit" :sign-code="requestData.RecorderCode" role-code="AnNurse"
            @signed="setSignInfo" />
        </uni-forms-item>
        <uni-forms-item label="时间" name="nurseDate" :label-width="45">
          <uni-datetime-picker v-model="requestData.RecordTime" type="datetime" :disabled="disabledEdit" hide-second />
        </uni-forms-item>
      </view>
    </uni-forms>
    <view class="patient-fee-type-detail-bottom ">
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
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-fee-type-detail {

  .no-margin {
    margin-bottom: 4px;
  }

  .submit-button {
    width: 120px;
    margin: 0;

    &.submit-button-verify,
    &.submit-button-verify-cancel {
      margin-left: 40px;
    }
  }

  &-select {
    ::v-deep .uni-data-checklist {
      padding: 0px 16px;

      .checklist-box {
        flex-basis: 18%;
        height: 40px;

        .checklist-content {
          justify-content: center;
          font-size: 40px;
        }
      }
    }
  }

  &-form {
    @apply m-t-20;

    &-item-sign {
      ::v-deep .uni-forms-item__content {
        margin-top: -10px;
      }
    }
  }

  &-bottom {
    @apply row justify-center m-t-10;
  }
}
</style>

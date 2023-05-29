<script lang="ts" setup>
import PatientFeeTypeHeader from './components/patient-fee-type-header.vue'
import DoctorSign from './components/doctor-sign.vue'
import { refreshPatientInfo } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'
import { feeItemsChecked, getRecordFeeItems, saveFeeItems } from '@/utils/api'
import type { ApiResonseType, ItemInfo } from '@/utils/api.help'
import { STORE_KEY_USER } from '@/utils/app.constant'

import { consumeFeeItems, groupFeeItems } from '@/composables/patient-fee-type-detail.composable'

const disabledEdit = ref(false)

const requestData = reactive({
  AnesthesiaId: '',
  RecordTime: '',
  RecorderCode: '',
})

const checkedConsumeCodes = ref<string[]>([])
const checkedGroupCodes = ref<string[]>([])

onLoad((query) => {
  if (query === undefined)
    return

  requestData.AnesthesiaId = query.Id
  refreshPatientInfo(requestData.AnesthesiaId)
  revertCheckFeeItems(requestData.AnesthesiaId)
})

function revertCheckFeeItems(id: string) {
  checkedConsumeCodes.value = []
  checkedGroupCodes.value = []
  getRecordFeeItems(id).then((data) => {
    if (!data)
      return
    requestData.RecordTime = dateTimeFormat(data.RecordTime)
    requestData.RecorderCode = data.RecorderCode
    disabledEdit.value = data.IsChecked
    const checkedFeeCodes = data.FeeItems.map(x => x.ItemCode)

    checkedConsumeCodes.value = checkedFeeCodes.filter(x => consumeFeeItems.value.findIndex(item => item.value === x))
    checkedGroupCodes.value = checkedFeeCodes.filter(x => groupFeeItems.value.findIndex(item => item.value === x))
  }).catch(() => { })
}

function setSignInfo(data?: any) {
  const dateStr = dateTimeFormat(new Date().toLocaleString())
  requestData.RecorderCode = data?.userCode ?? ''
  requestData.RecordTime = data ? dateStr : ''
}

function onSave() {
  const items: ItemInfo[] = []
  for (const code of checkedConsumeCodes.value) {
    const item = consumeFeeItems.value.find(x => x.value === code)
    if (item) {
      items.push({
        ItemName: item.text,
        ItemCode: item.value as string,
      })
    }
  }
  for (const code of checkedGroupCodes.value) {
    const item = groupFeeItems.value.find(x => x.value === code)
    if (item) {
      items.push({
        ItemName: item.text,
        ItemCode: item.value as string,
      })
    }
  }
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
  const items: ItemInfo[] = []
  for (const code of checkedConsumeCodes.value) {
    const item = consumeFeeItems.value.find(x => x.value === code)
    if (item) {
      items.push({
        ItemName: item.text,
        ItemCode: item.value as string,
      })
    }
  }
  for (const code of checkedGroupCodes.value) {
    const item = groupFeeItems.value.find(x => x.value === code)
    if (item) {
      items.push({
        ItemName: item.text,
        ItemCode: item.value as string,
      })
    }
  }

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
</script>

<template>
  <view class="page patient-fee-type-detail">
    <PatientFeeTypeHeader />
    <view class="patient-fee-type-detail-select">
      <uni-section title="耗材" type="line" />
      <uni-data-checkbox
        v-model="checkedConsumeCodes" :localdata="consumeFeeItems" mode="tag" multiple
        :disabled="disabledEdit"
      />
      <uni-section title="组套" type="line" />
      <uni-data-checkbox
        v-model="checkedGroupCodes" :localdata="groupFeeItems" mode="tag" multiple
        :disabled="disabledEdit"
      />
    </view>
    <uni-forms class="patient-fee-type-detail-form" :model="requestData" label-width="70px" label-align="right">
      <view class="row justify-center">
        <uni-forms-item label="计费人" name="nurseName" class="patient-fee-type-detail-form-item-sign">
          <DoctorSign
            :disabled="disabledEdit" :sign-code="requestData.RecorderCode" role-code="AnNurse"
            @signed="setSignInfo"
          />
        </uni-forms-item>
        <uni-forms-item label="时间" name="nurseDate" :label-width="45">
          <uni-datetime-picker v-model="requestData.RecordTime" type="datetime" :disabled="disabledEdit" hide-second />
        </uni-forms-item>
      </view>
    </uni-forms>
    <view v-if="!disabledEdit" class="patient-fee-type-detail-bottom ">
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
.patient-fee-type-detail {

  .no-margin {
    margin-bottom: 4px;
  }

  .submit-button {
    width: 120px;
    margin: 0;

    &.submit-button-verify {
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

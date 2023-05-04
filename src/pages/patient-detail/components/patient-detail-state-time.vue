<script lang="ts" setup>
import type { Ref } from 'vue'
// import StateTimePicker from './state-time-picker.vue'
import { updateState } from '@/utils/api'
import { patientInfo } from '@/composables/patient-narcotic-detail.composable'
import type { ApiResonseType } from '@/utils/api.help'
import { dateTimeFormat } from '@/composables'
const emits = defineEmits(['onTime'])

const id = inject<Ref<string>>('id')

type ListItemKey = keyof Pick<ApiResonseType.PatientDetailInfo, 'AccessTime' | 'AnesthesiaBeginTime' | 'AnesthesiaEndTime' | 'OperationBeginTime' | 'OperationEndTime' | 'LeaveTime' | 'AccessPacuTime' | 'LeavePacuTime'>
interface listItem {
  title: string
  label: string
  key: ListItemKey
}

const list: listItem[] = [
  { title: '入室时间', label: '入室时间', key: 'AccessTime' },
  { title: '麻醉开始时间', label: '麻醉开始', key: 'AnesthesiaBeginTime' },
  { title: '手术开始时间', label: '手术开始', key: 'OperationBeginTime' },
  { title: '手术结束时间', label: '手术结束', key: 'OperationEndTime' },
  { title: '麻醉结束时间', label: '麻醉结束', key: 'AnesthesiaEndTime' },
  { title: '出室时间', label: '出室时间', key: 'LeaveTime' },
  { title: '入恢复室时间', label: '入PACU', key: 'AccessPacuTime' },
  { title: '出恢复室时间', label: '出PACU', key: 'LeavePacuTime' },
]

const popupRef = ref<UniHelper.UniPopupProps>()
const itemValue = ref('')
const editItem = ref<listItem>()
function openDialog(item: listItem) {
  editItem.value = item
  const tmpTime = patientInfo[item.key] ?? new Date().toLocaleString()
  itemValue.value = dateTimeFormat(tmpTime)
  popupRef.value?.open()
}

function onDialogComfirm() {
  updateState({
    StateName: editItem.value!.title,
    StateTime: itemValue.value,
    AnesthesiaId: id!.value,
  }).then(() => {
    const key = editItem.value!.key
    patientInfo[key] = itemValue.value
    if (patientInfo.AccessTime && patientInfo.AnesthesiaBeginTime && key === 'AnesthesiaEndTime')
      emits('onTime')
  }).catch(() => {
    uni.showToast({
      title: '保存失败，请稍后重试',
      icon: 'none',
    })
  })
}
</script>

<template>
  <view class="component patient-detail-state-time">
    <uni-popup ref="popupRef" type="dialog">
      <uni-popup-dialog :title="editItem?.title" mode="base" type="info" @confirm="onDialogComfirm">
        <uni-datetime-picker v-model="itemValue" class="patient-detail-state-time-picker" />
      </uni-popup-dialog>
    </uni-popup>
    <uni-forms :model="patientInfo" label-width="70px">
      <uni-row>
        <uni-col v-for="(item) of list" :key="item.key" :span="6">
          <uni-forms-item :label="item.label">
            <!-- <StateTimePicker :date="patientInfo[item.key] as string" @change="val => onChange(item.key, val)" /> -->
            <view class="patient-detail-state-time-item" @click="() => openDialog(item)">
              {{ dateTimeFormat(patientInfo[item.key], 'MM-DD HH:mm') }}
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.patient-detail-state-time {
  padding-left: 8px;

  .uni-forms-item {
    margin-bottom: 4px !important;

    ::v-deep .uni-forms-item__content {
      padding-right: 12px;
    }
  }

  &-item{
    height: 35px;
    line-height: 35px;
    border: solid 1px #f1f1f1;
    border-radius: 4px;
    padding-left: 8px;
  }

  &-picker {
    ::v-deep .uni-date-picker__container {
      .uni-date-single--x {
        position: fixed;
        top: calc(50% + 25px) !important;
      }
    }
  }
}
</style>

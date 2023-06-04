<script lang="ts" setup>
import { updateRoom } from '@/utils/api'
import type { ApiResonseType } from '@/utils/api.help'
import { STORE_KEY_ROOM, STORE_ROOM_LIST } from '@/utils/app.constant'
// prop
const props = defineProps<{ data: ApiResonseType.SafeCheckInfo; show: boolean }>()
// event
const emits = defineEmits(['command', 'update:show', 'confirm'])
// ref
const popupRef = ref<UniHelper.UniPopupProps>()
const roomList = ref<UniHelper.UniDataSelectLocaldata[]>([])
const localCode = ref('')
const patientRoom = ref('')

onMounted(() => {
  const _localCode = uni.getStorageSync(STORE_KEY_ROOM)
  const localRooms = uni.getStorageSync(STORE_ROOM_LIST)
  localCode.value = _localCode
  roomList.value = localRooms
})

function onClick() {
  if (localCode.value && patientRoom.value !== localCode.value) {
    uni.showModal({
      title: '手术间确认',
      content: '患者手术间与当前手术间不一致，确认是否更换手术间',

    }).then((res) => {
      // 点击是
      if (res.confirm)
        savePatientRoom()

      // 点击否
      if (res.cancel)
        closePopup()
    })
  }
  else {
    closePopup()
  }
}

function closePopup() {
  popupRef.value?.close()
  emits('update:show', false)
  emits('confirm')
}

function savePatientRoom() {
  updateRoom(props.data.Id, patientRoom.value).then((data) => {
    if (data) {
      closePopup()
    }
    else {
      uni.showToast({
        title: '修改手术间失败！',
        icon: 'none',
      })
    }
  })
}

watch(() => props.show, (val) => {
  if (val === true && popupRef.value) {
    patientRoom.value = props.data.OperatingRoomName
    popupRef.value.open()
  }
})

function onPopupChange(e: UniEvent<{ val: boolean }>) {
  const show = e.detail?.val
  if (!show)
    emits('update:show', false)
}
</script>

<template>
  <view class="component  patient-query-popup-patient-confirm">
    <uni-popup ref="popupRef" @change="onPopupChange">
      <view class="popup-patient-confirm-container">
        <view class="popup-patient-confirm-header">
          患者信息确认
        </view>
        <uni-forms class="popup-patient-confirm-form" label-width="70px" label-align="right">
          <uni-forms-item label="姓名">
            {{ data.PatientName }}
          </uni-forms-item>
          <uni-forms-item label="性别">
            {{ data.PatientSex }}
          </uni-forms-item>
          <uni-forms-item label="年龄">
            {{ data.PatientAge }}
          </uni-forms-item>
          <uni-forms-item label="科室">
            {{ data.PatientDepartmentName }}
          </uni-forms-item>
          <uni-forms-item label="术前诊断">
            {{ data.DiagnosisName }}
          </uni-forms-item>
          <uni-forms-item label="手术间" name="patientRoom">
            <uni-data-select v-model="patientRoom" :localdata="roomList" popup-title="请选择手术间" />
          </uni-forms-item>
        </uni-forms>
        <view class="popup-patient-confirm-footer">
          <button type="primary" @click="onClick">
            确认
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.patient-query-popup-patient-confirm {
  .popup-patient-confirm {
    &-container {
      @apply w-300px bg-white;
    }

    &-header {
      @apply text-xl p-y-2 bg-gray-200 font-500 text-center;
    }

    &-form {
      @apply w-200px m-auto p-y-4;

      .uni-forms-item {
        ::v-deep .uni-forms-item__content {
          line-height: 36px;
        }

        &:last-of-type {
          margin-bottom: 0 !important;
        }
      }
    }

    &-footer {
      @apply p-4;
    }
  }
}
</style>

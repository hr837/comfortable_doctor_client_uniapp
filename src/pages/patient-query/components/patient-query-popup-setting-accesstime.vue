<script lang="ts" setup>
import { getPatientDetail, updateState } from '@/utils/api'
import { dateTimeFormat } from '@/composables'
// prop
const props = defineProps<{ patientId: string; show: boolean }>()
// event
const emits = defineEmits(['command', 'update:show', 'saved'])
// ref
const popupRef = ref<UniHelper.UniPopupProps>()
const accessTime = ref('')
function onClick() {
  // popupRef.value?.close()
  // emits('update:show', false)
  // emis('saved')
  if (!accessTime.value) {
    uni.showToast({
      title: '请选择时间',
      icon: 'none',
    })
    return
  }

  updateState({
    StateName: '入室时间',
    StateTime: accessTime.value,
    AnesthesiaId: props.patientId,
  }).then(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })
    setTimeout(() => {
      popupRef.value?.close()
      emits('update:show', false)
      emits('saved')
    }, 300)
  }).catch(() => {
    uni.showToast({
      title: '保存失败',
      icon: 'error',
    })
  })
}

watch(() => props.show, (val) => {
  if (val === true && popupRef.value) {
    popupRef.value.open()

    getPatientDetail(props.patientId).then(data => initAccessTime(data.AccessTime)).catch(initAccessTime)
  }
})

function initAccessTime(time?: string) {
  setTimeout(() => {
    accessTime.value = dateTimeFormat(time ?? new Date().toLocaleString())
  }, 100)
}

function onPopupChange(e: UniEvent<{ val: boolean }>) {
  const show = e.detail?.val
  if (!show)
    emits('update:show', false)
}
</script>

<template>
  <view class="component  patient-query-popup-setting-accesstime">
    <uni-popup ref="popupRef" @change="onPopupChange">
      <view class="popup-patient-confirm-container">
        <view class="popup-patient-confirm-header">
          入室时间确认
        </view>
        <uni-forms class="popup-patient-confirm-form" label-width="70px" label-align="right">
          <uni-forms-item label="入室时间">
            <uni-datetime-picker
              v-model="accessTime" class="patient-query-popup-setting-accesstime-picker"
              :hide-second="true"
            />
          </uni-forms-item>
        </uni-forms>
        <view class="popup-patient-confirm-footer">
          <button type="primary" @click="onClick">
            保存
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.patient-query-popup-setting-accesstime {
  .popup-patient-confirm {
    &-container {
      @apply w-330px bg-white;
    }

    &-header {
      @apply text-xl p-y-2 bg-gray-200 font-500 text-center;
    }

    &-form {
      @apply m-auto p-4 p-t-8;

      .uni-forms-item {
        margin-bottom: 0 !important;
      }
    }

    &-footer {
      @apply p-4;
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
}
</style>

<script lang="ts" setup>
import type { ApiResonseType } from '@/utils/api.help'
// prop
const props = defineProps<{ data: ApiResonseType.SafeCheckInfo; show: boolean }>()
// event
const emits = defineEmits(['command', 'update:show', 'confirm'])
// ref
const popupRef = ref<UniHelper.UniPopupProps>()

function onClick() {
  popupRef.value?.close()
  emits('update:show', false)
  emits('confirm')
}

watch(() => props.show, (val) => {
  if (val === true && popupRef.value)
    popupRef.value.open()
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

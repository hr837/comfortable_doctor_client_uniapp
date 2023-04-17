<script lang="ts" setup>
import dayJs from 'dayjs'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { addMonitorRecord, updateMonitorRecord } from '@/utils/api'
import { monitorItems } from '@/composables/patient-narcotic-detail.composable'

const props = defineProps<{
  /** 病人ID */
  pid: string
  /** 检测记录ID */
  data?: ApiResonseType.MonitorInfo
}>()

const emits = defineEmits(['close', 'success'])

interface ModelType {
  RecordTime: string
  [key: string]: string
}
const modelData = reactive<ModelType>({
  RecordTime: '',
})

monitorItems.value.forEach((item) => {
  modelData[item.ItemCode] = ''
})

const rules = {
  RecordTime: {
    rules: [{ required: true, errorMessage: '请选择检测时间' }],
  },
}

const form = ref<UniForm>()
/** 时间格式 */
const DATE_TEMPLATE = 'YYYY-MM-DD HH:mm:00'

function getNextTime() {
  let nextDate = dayJs(Date.now()).add(5, 'minute')
  const count = Math.floor(nextDate.minute() / 5)
  nextDate = nextDate.set('minute', count * 5)
  return nextDate.format(DATE_TEMPLATE)
}

function onConfirm() {
  form.value?.validate([], (err) => {
    if (err)
      return

    const obj: ApiRequestType.MonitorInfo = {
      AnesthesiaId: props.pid,
      RecordTime: modelData.RecordTime,
      ItemValues: [],
    }
    monitorItems.value.forEach((item) => {
      obj.ItemValues.push({
        ItemCode: item.ItemCode,
        ItemName: item.ItemName,
        ItemValue: modelData[item.ItemCode] ?? '',
      })
    })

    if (props.data) {
      obj.Id = props.data.Id
      updateMonitorRecord(obj).then(onSuccess)
    }
    else { addMonitorRecord(obj).then(onSuccess) }
  })
}

function onSuccess() {
  uni.showToast({
    title: '操作成功',
    icon: 'success',
    duration: 1000,
  })
  setTimeout(() => {
    emits('success')
    emits('close')
  }, 1500)
}

function onClose() {
  emits('close')
}

onMounted(() => {
  modelData.AnesthesiaId = props.pid
  nextTick(() => {
    if (!props.data) {
      modelData.RecordTime = getNextTime()
    }
    else {
      modelData.Id = props.data.Id
      modelData.RecordTime = props.data.RecordTime
      props.data.ItemValues.forEach((item) => {
        modelData[item.ItemCode] = item.ItemValue ?? ''
      })
    }
  })
})

const title = computed(() => props.data ? '更新监测信息' : '添加监测信息')
</script>

<template>
  <uni-popup-dialog
    class="component vital-sign-info-edit" mode="base" type="info" :title="title"
    confirm-text="保存" before-close @close="onClose" @confirm="onConfirm"
  >
    <uni-forms
      ref="form" :model="modelData" class="transfusion-info-edit-form" label-width="100px" label-align="right"
      :rules="rules"
    >
      <uni-forms-item label="监测时间" name="RecordTime">
        <uni-datetime-picker v-model="modelData.RecordTime" type="datetime" />
      </uni-forms-item>
      <uni-row>
        <uni-col v-for="item of monitorItems" :key="item.ItemCode" :span="12">
          <uni-forms-item :label="item.ItemName">
            <uni-easyinput v-model="modelData[item.ItemCode]" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>
  </uni-popup-dialog>
</template>

<style lang="scss" scoped>
.vital-sign-info-edit {
  width: 600px;

  &-form {
    width: 100%;
  }
}
</style>

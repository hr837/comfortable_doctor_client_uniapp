<script lang="ts" setup>
import dayJs from 'dayjs'
import type { ApiRequestType } from '@/utils/api.help'
import { addMonitorRecord, getPatientMonitorRecord, updateMonitorRecord } from '@/utils/api'
import { monitorItems } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'

interface ModelType {
  AnesthesiaId: string
  RecordTime: string
  [key: string]: string
}
const modelData = reactive<ModelType>({
  AnesthesiaId: '',
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

function getNextTime(time?: string) {
  let nextDate = dayJs(time)
  const minute = nextDate.minute()
  if (minute % 5 !== 0) {
    const count = Math.floor(minute / 5) + 1
    nextDate = nextDate.set('minute', count * 5)
  }
  return nextDate.format(DATE_TEMPLATE)
}

onLoad((query: any) => {
  const { rId, pId } = query
  if (pId && !rId) {
    uni.setNavigationBarTitle({
      title: '添加体征记录',
    })
    modelData.AnesthesiaId = pId
    modelData.RecordTime = getNextTime()
  }
  if (rId) {
    uni.setNavigationBarTitle({
      title: '编辑体征记录',
    })
    fetchModelInfo(rId)
  }
})

function onTimeChange(val: string) {
  nextTick(() => {
    modelData.RecordTime = getNextTime(`${val}:00`)
  })
}

onNavigationBarButtonTap(({ index }) => {
  if (index !== 0)
    return

  form.value?.validate([], (err) => {
    if (err)
      return

    const obj: ApiRequestType.MonitorInfo = {
      AnesthesiaId: modelData.paient,
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

    if (modelData.Id) {
      obj.Id = modelData.Id
      updateMonitorRecord(obj).then(onSuccess)
    }
    else { addMonitorRecord(obj).then(onSuccess) }
  })
})

function onSuccess() {
  uni.showToast({
    title: '操作成功',
    icon: 'success',
    duration: 1000,
  })
  setTimeout(() => {
    // eslint-disable-next-line vue/custom-event-name-casing
    uni.$emit('refreshList:patient-vital-sign-record')
    uni.navigateBack()
  }, 1000)
}

function fetchModelInfo(rId: string) {
  getPatientMonitorRecord(rId).then((data) => {
    modelData.Id = data.Id
    modelData.AnesthesiaId = data.AnesthesiaId
    modelData.RecordTime = dateTimeFormat(data.RecordTime)
    data.ItemValues.forEach((item) => {
      modelData[item.ItemCode] = item.ItemValue ?? ''
    })
  })
}
</script>

<template>
  <uni-forms
    ref="form" :model="modelData" class="component vital-sign-info-edit p-4" label-width="100px"
    label-align="right" :rules="rules"
  >
    <uni-forms-item label="监测时间" name="RecordTime">
      <uni-datetime-picker
        v-model="modelData.RecordTime" type="datetime" hide-second
        @change="val => onTimeChange(val as string)"
      />
    </uni-forms-item>
    <template v-for="item of monitorItems" :key="item.ItemCode">
      <uni-forms-item :label="item.ItemName">
        <uni-easyinput v-model="modelData[item.ItemCode]" type="digit" />
      </uni-forms-item>
    </template>
  </uni-forms>
</template>

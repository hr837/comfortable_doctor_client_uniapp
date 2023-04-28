<script lang="ts" setup>
import { dateTimeFormat } from '@/composables'
const props = defineProps<{ date: string }>()
const emits = defineEmits(['change'])

const dateValue = ref('')
const dateTextValue = ref('')
const timeValue = ref('')
const datePickerVal = ref()
const timePickerVal = ref()

watch(() => props.date, (val: string) => {
  if (dateTime.isValid()) {
    dateValue.value = dateTimeFormat(val, 'YYYY-MM-DD')
    dateTextValue.value = dateTimeFormat(val, 'MM-DD')
    timeValue.value = dateTimeFormat(val, 'HH:mm')
  }
  else {
    dateValue.value = ''
    dateTextValue.value = ''
    timeValue.value = ''
  }
})

function onDateChange(e: UniEvent<{ value: string }>) {
  const value = e.detail!.value
  if (value) {
    dateValue.value = value
    dateTextValue.value = value.substring(5)
    checkValue()
  }
}

function onTimeChange(e: UniEvent<{ value: string }>) {
  const value = e.detail!.value
  if (value) {
    timeValue.value = value
    checkValue()
  }
}

function checkValue() {
  if (dateValue.value && timeValue.value)
    emits('change', `${dateValue.value} ${timeValue.value}:00`)

  if (dateValue.value && !timeValue.value)
    timePickerVal.value.$el.click()

  if (!dateValue.value && timeValue.value)
    datePickerVal.value.$el.click()
}

function setCurrentDate() {
  if (!props.date) {
    const date = dateTimeFormat(new Date().toLocaleString())
    emits('change', date)
  }
}
</script>

<template>
  <view class="component state-time-picker" @click="setCurrentDate">
    <picker class="state-time-picker-date" mode="date" :value="dateValue" @change="onDateChange">
      <view ref="datePickerVal">
        {{ dateTextValue }}
      </view>
    </picker>
    <picker class="state-time-picker-time m-l-1" mode="time" :value="timeValue" @change="onTimeChange">
      <view ref="timePickerVal">
        {{ timeValue }}
      </view>
    </picker>
  </view>
</template>

<style lang="scss" scoped>
.state-time-picker {
  @apply flex items-center h-full border-solid border-gray-200 border-1 p-l-2 rounded-md;
}
</style>

<script lang="ts" setup>
import type { PatientBaseInfo } from '@/types/patient.type'

let pageQueryData: PatientBaseInfo

onLoad((query) => {
  if (query === undefined)
    return
  pageQueryData = query as PatientBaseInfo
  const { name, sex, age } = pageQueryData
  const title = `${name} ${sex} ${age}岁`
  uni.setNavigationBarTitle({ title })
})
</script>

<template>
  <view class="component patient-attach-file">
    patient-attach-file--附件查看
  </view>
</template>

<style lang="scss" scoped>

</style>

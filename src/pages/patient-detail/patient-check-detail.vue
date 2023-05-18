<script lang="ts" setup>
import ThePatientCheckHeader from './components/the-patient-check-header.vue'
const id = ref('')

const headerRef = ref()
onLoad((query) => {
  if (query === undefined)
    return
  id.value = query.Id
  setTimeout(() => {
    headerRef.value?.revertData(query)
  }, 100)
})
</script>

<template>
  <view class="page patient-check-detail">
    <ThePatientCheckHeader ref="headerRef" />
  </view>
</template>

<style lang="less" scoped></style>

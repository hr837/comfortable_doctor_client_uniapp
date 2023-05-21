<script lang="ts" setup>
import ThePatientSafeCheckHeader from './components/the-patient-safe-check-header.vue'
import PatientSafeCheckTable from './components/patient-safe-check-table.vue'
import PatientSafeCheckSign from './components/patient-safe-check-sign.vue'
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
  <view class="page patient-safe-check-detail">
    <ThePatientSafeCheckHeader ref="headerRef" />
    <PatientSafeCheckTable />
    <PatientSafeCheckSign />
    <view class="patient-safe-check-detail-bottom ">
      <button type="primary" class="submit-button">
        保存
      </button>
      <button type="primary" class="submit-button submit-button-verify">
        审核
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-safe-check-detail-bottom {
  @apply row justify-center m-t-4;

  .submit-button {
    width: 120px;
    margin: 0;

    &.submit-button-verify {
      margin-left: 40px;
    }
  }
}
</style>

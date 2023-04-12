<script lang="ts" setup>
import RecordItem from './record-item.vue'
import TransfusionInfoEdit from './transfusion-info-edit.vue'

const popup = ref()

function open() {
  popup.value.open()
}

function close() {
  popup.value.close()
}
</script>

<template>
  <view class="component patient-transfusion-record">
    <uni-section title="输液" type="line">
      <template #right>
        <button type="primary" size="mini" @click="open">
          添加
        </button>
      </template>
    </uni-section>

    <uni-popup ref="popup" type="dialog" background-color="#fff">
      <!-- <uni-popup-dialog mode="base" type="info" title="添加输液记录" before-close> -->
      <TransfusionInfoEdit pid="123" @close="close" />
      <!-- </uni-popup-dialog> -->
    </uni-popup>

    <view class="patient-transfusion-record-container">
      <RecordItem v-for="index of 10" :key="`record-item-${index}`">
        <view class="row">
          <text class="text-gray-900 patient-transfusion-record-text">
            醋酸钠林格注射液
          </text>
          <text class="patient-transfusion-record-text">
            2ml/h
          </text>
          <text class="patient-transfusion-record-text">
            静滴
          </text>
          <text class="patient-transfusion-record-text">
            晶体液
          </text>
        </view>
        <view class="row m-t-2">
          <text class="patient-transfusion-record-text">
            开始时间：2023-01-22 09:24
          </text>
          <text v-if="(index % 3) === 0" class="patient-transfusion-record-text">
            结束时间：2023-01-22 11:24
          </text>
          <uni-icons v-else type="spinner-cycle" size="22" class="animate-spin" />
        </view>
      </RecordItem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-transfusion-record-container {
  @apply: p-x-4;
}

.patient-transfusion-record-text {
  @apply: p-r-6;
}

.animate-spin {
  animation-duration: 3s;
}
</style>

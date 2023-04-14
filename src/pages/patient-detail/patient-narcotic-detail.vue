<script lang="ts" setup>
import PatientDetailPopup from './components/patient-detail-popup.vue'
import { ComponentSetting, initSelectOptions } from '@/composables/patient-narcotic-detail.composable'
import { goToPatientAttchPage } from '@/composables'
import type { PatientBaseInfo } from '@/types/patient.type'

let pageQueryData: PatientBaseInfo

const pageData = $ref({
  show: false,
  current: 0,
  component: '',
  controlItems: ComponentSetting.map(x => x.label),
  id: '',
})

onLoad((query) => {
  if (query === undefined)
    return
  pageQueryData = query as PatientBaseInfo
  const { name, sex, age } = pageQueryData
  const title = `${name} ${sex} ${age}`
  pageData.id = pageQueryData.id
  uni.setNavigationBarTitle({ title })
})

onMounted(initSelectOptions)

onNavigationBarButtonTap(() => pageData.show = true)

function onCommand(command: PopupCommandType) {
  if (!pageQueryData)
    return
  goToPatientAttchPage(pageQueryData as any, command)
}

function onClickItem(e: { currentIndex: number }) {
  if (pageData.current !== e.currentIndex)
    pageData.current = e.currentIndex
}

const component = $computed(() => ComponentSetting[pageData.current].component)
</script>

<template>
  <PatientDetailPopup v-model:show="pageData.show" @command="onCommand" />
  <view class="page patient-narcotic-detail ">
    <uni-segmented-control
      :current="pageData.current" :values="pageData.controlItems" style-type="button"
      @click-item="onClickItem"
    />
    <view class="patient-narcotic-detail-container">
      <component :is="component" :id="pageData.id" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
page {
  // display: flex;
  // flex-flow: column nowrap;
  // height: 100%;
  @apply page h-full;
}

.patient-narcotic-detail,
{
@apply flex-1 overflow-hidden;
}

.patient-narcotic-detail-container {
  @apply flex-1 overflow-auto;
}
</style>

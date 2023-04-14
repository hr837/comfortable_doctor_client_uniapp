<script lang="ts" setup>
import PatientDetailPopup from './components/patient-detail-popup.vue'
import { ComponentSetting, initSelectOptions } from '@/composables/patient-narcotic-detail.composable'
import { goToPatientAttchPage } from '@/composables'
import type { ApiResonseType } from '@/utils/api.help'

let pageQueryData: Pick<ApiResonseType.PatientInfo, 'PatientName' | 'PatientSex' | 'PatientAge' | 'Id'>

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
  const { name, sex, age, id } = query
  const title = `${name} ${sex} ${age}`
  pageData.id = id
  pageQueryData = {
    Id: id,
    PatientName: name,
    PatientAge: age,
    PatientSex: sex,
  }
  uni.setNavigationBarTitle({ title })
})

onMounted(initSelectOptions)

onNavigationBarButtonTap(() => pageData.show = true)

function onCommand(command: PopupCommandType) {
  return
  if (!pageQueryData)
    return
  goToPatientAttchPage(pageQueryData as ApiResonseType.PatientInfo, command)
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

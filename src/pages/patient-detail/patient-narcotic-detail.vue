<script lang="ts" setup>
// import PatientDetailPopup from './components/patient-detail-popup.vue'
import PatientDetailStateTime from './components/patient-detail-state-time.vue'
import DoctorTemplateSelect from './components/doctor-template-select.vue'
import { ComponentSetting, initMonitorItems, initSelectOptions } from '@/composables/patient-narcotic-detail.composable'
// import { goToPatientAttchPage } from '@/composables'
import PatientBaseInfoForm from '@/pages/patient-detail/components/patient-base-info-form.vue'
import PatientNarcoticDrugRecord from '@/pages/patient-detail/components/patient-narcotic-drug-record.vue'
import PatientNarcoticResult from '@/pages/patient-detail/components/patient-narcotic-result.vue'
import PatientTransfusionRecord from '@/pages/patient-detail/components/patient-transfusion-record.vue'
import PatientVitalsignRecord from '@/pages/patient-detail/components/patient-vital-sign-record.vue'
import type { DetailPageQueryType } from '@/composables'

const pageData = reactive({
  show: false,
  current: 0,
  component: '',
  controlItems: ComponentSetting.map(x => x.label),
})

const id = ref('')
const packageRef = ref<UniHelper.UniPopupProps>()

provide('id', id)

onLoad((query) => {
  if (query === undefined)
    return

  let { Id, PatientName, PatientAge, PatientSex } = query as DetailPageQueryType
  PatientAge = decodeURIComponent(PatientAge)
  PatientSex = decodeURIComponent(PatientSex)
  PatientName = decodeURIComponent(PatientName)

  const title = `${PatientName} ${PatientSex} ${PatientAge}`
  id.value = Id
  uni.setNavigationBarTitle({ title })
})

onMounted(() => {
  setTimeout(() => {
    initSelectOptions()
    initMonitorItems(id.value)
  }, 1000)
})

// onNavigationBarButtonTap(() => pageData.show = true)

// function onCommand(command: PopupCommandType) {
//   return
//   // eslint-disable-next-line no-unreachable
//   if (!pageQueryData)
//     return
//   goToPatientAttchPage(pageQueryData as ApiResonseType.PatientInfo, command)
// }

function onClickItem(e: { currentIndex: number }) {
  if (pageData.current !== e.currentIndex) {
    pageData.current = e.currentIndex
    const currentName = pageData.controlItems[pageData.current]
    const setting = ComponentSetting.find(x => x.label === currentName)
    if (setting)
      scrollTo(setting.name)
  }
}

let pageScrollTop = 0
onPageScroll((data) => {
  pageScrollTop = data.scrollTop
})

function scrollTo(val: string) {
  uni.createSelectorQuery()
    .select(`#${val}`).boundingClientRect()
    .exec((res) => {
      const [info] = res
      const top = pageScrollTop + info.top - 36
      uni.pageScrollTo({ scrollTop: top, duration: 100 })
    })
}

function openTemplate() {
  packageRef.value?.open()
}

function closeTemplate() {
  packageRef.value?.close()
}
</script>

<template>
  <!-- <PatientDetailPopup v-model:show="pageData.show" @command="onCommand" /> -->
  <view class="page patient-narcotic-detail">
    <uni-popup ref="packageRef">
      <DoctorTemplateSelect @on-close="closeTemplate" />
    </uni-popup>

    <view class="patient-narcotic-detail-header">
      <uni-segmented-control
        class="patient-narcotic-detail-header-tabs" :current="pageData.current"
        :values="pageData.controlItems" style-type="button" @click-item="onClickItem"
      />
      <button class="patient-narcotic-detail-header-template-btn" size="mini" type="primary" @click="openTemplate">
        模板
      </button>
    </view>

    <view class="patient-narcotic-detail-container">
      <PatientBaseInfoForm id="patient-base-info-form" />
      <PatientNarcoticDrugRecord id="patient-narcotic-drug-record" />
      <PatientTransfusionRecord id="patient-transfusion-record" />
      <PatientVitalsignRecord id="patient-vital-sign-record" />
      <PatientNarcoticResult id="patient-narcotic-result" />
    </view>
    <view class="patient-narcotic-detail-bottom">
      <PatientDetailStateTime @on-time="openTemplate" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.patient-narcotic-detail {
  &-header {
    @apply row;
    position: fixed;
    background-color: #fff;
    width: 100%;
    z-index: 1;

    &-tabs {
      flex: 1;
    }

    &-template-btn {
      margin: auto 16px;
      line-height: 36px;
    }
  }

  &-container {
    padding-top: 36px;
    padding-bottom: 100px;
  }

  &-bottom {
    @apply fixed left-0 bottom-0 z-1 bg-white w-full p-y-2 border-t border-solid border-gray-200;
  }
}
</style>

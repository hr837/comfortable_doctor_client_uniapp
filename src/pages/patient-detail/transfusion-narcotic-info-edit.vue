<script lang="ts" setup>
import DrugInput from './components/drug-input.vue'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { addTransfusionRecord, getTransfusionInfo, updateTransfusionRecord } from '@/utils/api'
import { PatientDetailDict, drugUnitList, drugUseModeList } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'

const modelData = reactive<ApiRequestType.Transfusion>({
  DrugName: '',
  TypeCode: '3',
  DrugCode: '',
  BeginTime: '',
  EndTime: '',
  PointTime: '',
  DrugFlag: '',
  Dose: NaN,
  Unit: '',
  AnesthesiaId: '',
  DrugType: '晶体液',
  Mode: '',
})

onLoad((query: any) => {
  const { rId, pId } = query
  if (pId && !rId) {
    uni.setNavigationBarTitle({
      title: '添加麻醉用药记录',
    })
    modelData.AnesthesiaId = pId
    nextTick(() => {
      modelData.BeginTime = dateTimeFormat(new Date().toString())
      modelData.PointTime = modelData.BeginTime
    })
  }
  if (rId) {
    uni.setNavigationBarTitle({
      title: '编辑添加麻醉用药记录',
    })
    fetchModelInfo(rId)
  }
})

const rules = {
  DrugName: {
    rules: [{ required: true, errorMessage: '请选择药品信息' }, { validateFunction: drugValidator }],
  },
  BeginTime: {
    rules: [{ required: true, errorMessage: '请选择开始时间' }],
  },
  DrugFlag: {
    rules: [{ required: true, errorMessage: '请选择用药时长' }],
  },
  Mode: {
    rules: [{ required: true, errorMessage: '请选择注入方式' }],
  },
  Dose: {
    rules: [{ required: true, errorMessage: '请输入使用剂量' }, { validateFunction: doseValidator }],
  },
  PointTime: {
    rules: [{ required: true, errorMessage: '请选择时间' }],
  },
}

const form = ref<UniForm>()

/** 剂量验证 */
function doseValidator(_: any, value: number, __: any, callback: Function) {
  if (Number.isNaN(value))
    callback('请输入使用剂量')
  else if (value < 0)
    callback('请输入合理的剂量值')
  else if (modelData.Unit === '')
    callback('请选择剂量单位')
  else
    return true
}

/** 药品验证 */
function drugValidator(_: any, value: string, __: any, callback: Function) {
  if (value.trim() === '' || modelData.DrugCode === '')
    callback('请选择药品信息')
  else
    return true
}

/** 选择药品后填充Model */
function onDrugSelected(item?: ApiResonseType.DrugInfo) {
  modelData.DrugName = item?.DrugName ?? ''
  modelData.DrugCode = item?.DrugCode ?? ''
  modelData.Unit = item?.CustomUnit ?? ''
  modelData.Dose = item?.CustomDose ?? NaN
  modelData.Mode = item?.InjectionMode ?? ''
}

onNavigationBarButtonTap(({ index }) => {
  if (index !== 0)
    return

  form.value?.validate([], (err) => {
    if (err)
      return

    if (!modelData.EndTime)
      modelData.EndTime = null

    if (modelData.Id)
      updateTransfusionRecord(modelData).then(onSuccess)

    else addTransfusionRecord(modelData).then(onSuccess)
  })
})

function onSuccess() {
  uni.showToast({
    title: '操作成功',
    icon: 'success',
  })
  setTimeout(() => {
    // eslint-disable-next-line vue/custom-event-name-casing
    uni.$emit('refreshList:patient-narcotic-drug-record')
    uni.navigateBack()
  }, 1000)
}

function fetchModelInfo(id: string) {
  getTransfusionInfo(id).then((data) => {
    modelData.AnesthesiaId = data.AnesthesiaId
    modelData.BeginTime = dateTimeFormat(data.BeginTime)
    modelData.Dose = data.Dose
    modelData.DrugCode = data.DrugCode
    modelData.DrugName = data.DrugName
    modelData.DrugFlag = data.DrugFlag
    modelData.Id = data.Id
    modelData.Mode = data.Mode
    modelData.PointTime = dateTimeFormat(data.PointTime)
    modelData.Spect = data.Spect
    modelData.TypeCode = data.TypeCode
    modelData.Unit = data.Unit
    if (data.EndTime)
      modelData.EndTime = dateTimeFormat(data.EndTime)
  })
}

const showDateRange = computed(() => modelData.DrugFlag === '1')
</script>

<template>
  <uni-forms
    ref="form" :model="modelData" class="transfusion-narcotic-info-edit-form p-4" label-width="70px"
    label-align="right" :rules="rules"
  >
    <uni-forms-item v-if="!modelData.Id">
      <DrugInput type="MZ" @selected="onDrugSelected" />
    </uni-forms-item>
    <uni-forms-item label="药品名称" name="DrugName">
      <view class="row">
        <uni-easyinput :value="modelData.DrugName" :disabled="!!modelData.Id" />
      </view>
    </uni-forms-item>
    <uni-forms-item label="用药时长" name="DrugFlag">
      <uni-data-checkbox v-model="modelData.DrugFlag" :localdata="PatientDetailDict.drugFlagList" mode="button" />
    </uni-forms-item>
    <uni-forms-item label="注入方式" name="Mode">
      <uni-data-select v-model="modelData.Mode" :localdata="drugUseModeList" />
    </uni-forms-item>
    <uni-forms-item label="剂量" name="Dose">
      <view class="row">
        <uni-easyinput v-model="modelData.Dose" type="number" placeholder="剂量" />
        <uni-data-select v-model="modelData.Unit" :localdata="drugUnitList" placeholder="单位" />
      </view>
    </uni-forms-item>
    <template v-if="showDateRange">
      <uni-forms-item label="开始时间" name="BeginTime">
        <uni-datetime-picker v-model="modelData.BeginTime" type="datetime" />
      </uni-forms-item>
      <uni-forms-item label="结束时间" name="EndTime">
        <uni-datetime-picker v-model="modelData.EndTime" type="datetime" />
      </uni-forms-item>
    </template>
    <template v-else>
      <uni-forms-item label="时间" name="PointTime">
        <uni-datetime-picker v-model="modelData.PointTime" type="datetime" />
      </uni-forms-item>
    </template>
  </uni-forms>
</template>

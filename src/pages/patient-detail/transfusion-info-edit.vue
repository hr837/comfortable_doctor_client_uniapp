<script lang="ts" setup>
import DrugInput from './components/drug-input.vue'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { addTransfusionRecord, getTransfusionInfo, updateTransfusionRecord } from '@/utils/api'
import { PatientDetailDict, drugUnitList, drugUseModeList } from '@/composables/patient-narcotic-detail.composable'
import { dateTimeFormat } from '@/composables'

const modelData = reactive<ApiRequestType.Transfusion>({
  DrugName: '',
  TypeCode: '2',
  DrugCode: '',
  BeginTime: '',
  EndTime: '',
  PointTime: '',
  DrugFlag: '1',
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
      title: '添加输液记录',
    })
    modelData.AnesthesiaId = pId
    nextTick(() => {
      modelData.BeginTime = dateTimeFormat(new Date().toString())
    })
  }
  if (rId) {
    uni.setNavigationBarTitle({
      title: '编辑输液记录',
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
  DrugType: {
    rules: [{ required: true, errorMessage: '请选择液体种类' }],
  },
  Mode: {
    rules: [{ required: true, errorMessage: '请选择注入方式' }],
  },
  Dose: {
    rules: [{ required: true, errorMessage: '请输入使用剂量' }, { validateFunction: doseValidator }],
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

function fetchModelInfo(id: string) {
  getTransfusionInfo(id).then((data) => {
    modelData.AnesthesiaId = data.AnesthesiaId
    modelData.DrugName = data.DrugName
    modelData.TypeCode = data.TypeCode
    modelData.DrugCode = data.DrugCode
    modelData.BeginTime = dateTimeFormat(data.BeginTime)

    modelData.PointTime = ''
    modelData.DrugFlag = data.DrugFlag
    modelData.Dose = data.Dose
    modelData.Unit = data.Unit
    modelData.DrugType = data.DrugType
    modelData.Mode = data.Mode
    modelData.Id = data.Id
    if (data.EndTime)
      modelData.EndTime = dateTimeFormat(data.EndTime)
  })
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
    uni.$emit('refreshList:patient-transfusion-record')
    uni.navigateBack()
  }, 1000)
}
</script>

<template>
  <uni-forms
    ref="form" :model="modelData" class="transfusion-info-edit-form p-4" label-width="70px" label-align="right"
    :rules="rules"
  >
    <uni-forms-item v-if="!modelData.Id">
      <DrugInput type="SY" @selected="onDrugSelected" />
    </uni-forms-item>
    <uni-forms-item label="药品名称" name="DrugName">
      <view class="row">
        <uni-easyinput :value="modelData.DrugName" :disabled="!!modelData.Id" />
      </view>
    </uni-forms-item>
    <uni-forms-item label="液体种类" name="DrugType">
      <uni-data-select v-model="modelData.DrugType" :localdata="PatientDetailDict.drugTypeList" />
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
    <uni-forms-item label="开始时间" name="BeginTime">
      <uni-datetime-picker v-model="modelData.BeginTime" type="datetime" />
    </uni-forms-item>
    <uni-forms-item label="结束时间" name="EndTime">
      <uni-datetime-picker v-model="modelData.EndTime" type="datetime" />
    </uni-forms-item>
  </uni-forms>
</template>

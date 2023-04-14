<script lang="ts" setup>
import dayJs from 'dayjs'
import DrugInput from './drug-input.vue'
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { addTransfusionRecord, getTransfusionInfo, updateTransfusionRecord } from '@/utils/api'
import { PatientDetailDict, drugUnitList, drugUseModeList } from '@/composables/patient-narcotic-detail.composable'

const props = defineProps<{
  /** 病人ID */
  pid: string
  /** 输液/麻醉用药ID */
  rid?: string
}>()

const emits = defineEmits(['close', 'success'])

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

function onConfirm() {
  form.value?.validate([], (err) => {
    if (err)
      return

    if (modelData.EndTime) {
      const diff = dayJs(modelData.EndTime).diff(modelData.BeginTime)
      modelData.PointTime = dayJs(diff).format('YYYY-MM-DD HH:mm:ss')
    }
    else {
      modelData.PointTime = modelData.BeginTime
    }
    modelData.AnesthesiaId = props.pid
    if (props.rid) {
      modelData.Id = props.rid
      updateTransfusionRecord(modelData).then(onSuccess)
    }
    else { addTransfusionRecord(modelData).then(onSuccess) }
  })
}

function onSuccess() {
  uni.showToast({
    title: '操作成功',
    icon: 'success',
  })
  emits('success')
  emits('close')
}

function onClose() {
  emits('close')
}

onMounted(() => {
  if (!props.rid)
    return
  getTransfusionInfo(props.rid).then((data) => {
    modelData.AnesthesiaId = data.AnesthesiaId
    modelData.BeginTime = data.BeginTime
    modelData.Dose = data.Dose
    modelData.DrugCode = data.DrugCode
    modelData.DrugName = data.DrugName
    modelData.DrugFlag = data.DrugFlag
    modelData.EndTime = data.EndTime
    modelData.Id = data.Id
    modelData.Mode = data.Mode
    modelData.PointTime = data.PointTime
    modelData.Spect = data.Spect
    modelData.TypeCode = data.TypeCode
    modelData.Unit = data.Unit
  })
})

const title = computed(() => props.rid ? '更新麻醉用药信息' : '添加麻醉用药信息')
</script>

<template>
  <uni-popup-dialog
    class="component transfusion-narcotic-info-edit" mode="base" type="info" :title="title" confirm-text="保存"
    before-close @close="onClose" @confirm="onConfirm"
  >
    <uni-forms
      ref="form" :model="modelData" class="transfusion-narcotic-info-edit-form" label-width="70px" label-align="right"
      :rules="rules"
    >
      <uni-forms-item v-if="!rid">
        <DrugInput type="MZ" @selected="onDrugSelected" />
      </uni-forms-item>
      <uni-forms-item label="药品名称" name="DrugName">
        <view class="row">
          <uni-easyinput :value="modelData.DrugName" :disabled="!!rid" />
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
      <uni-forms-item label="开始时间" name="BeginTime">
        <uni-datetime-picker v-model="modelData.BeginTime" type="datetime" />
      </uni-forms-item>
      <uni-forms-item label="结束时间" name="EndTime">
        <uni-datetime-picker v-model="modelData.EndTime" type="datetime" />
      </uni-forms-item>
    </uni-forms>
  </uni-popup-dialog>
</template>

<style lang="scss" scoped>
.transfusion-narcotic-info-edit {
  width: 400px;

  &-form {
    width: 100%;
  }
}
</style>

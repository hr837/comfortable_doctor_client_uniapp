<script lang="ts" setup>
import type { ApiRequestType } from '@/utils/api.help'
import { getDrugUnitList, getDrugWayList } from '@/utils/api'

const props = defineProps<{
  /** 病人ID */
  pid: string
  /** 输液/麻醉用药ID */
  rid?: string
}>()

const emits = defineEmits(['close', 'success'])

const modelData = reactive<ApiRequestType.Transfusion>({
  DrugName: '',
  TypeCode: '2',
  DrugCode: '',
  BeginTime: '',
  EndTime: '',
  PointTime: 'Min',
  DrugFlag: '',
  Dose: NaN,
  Unit: '',
  AnesthesiaId: '',
  DrugType: '',
  Mode: '',
})

const drugList = ref()

const drugTypeList = [
  { value: '晶体液', text: '晶体液', disable: false },
  { value: '胶体液', text: '胶体液', disable: false },
]
const drugUseModeList = ref()
const drugUnitList = ref()

onMounted(() => {
  getDrugUnitList().then((data) => {
    drugUnitList.value = data.map(item => ({
      text: item.ItemName,
      value: item.ItemName,
      disable: false,
    }))
  })

  getDrugWayList().then((data) => {
    drugUseModeList.value = data.map(item => ({
      text: item.ItemName,
      value: item.ItemName,
      disable: false,
    }))
  })
})

function onConfirm() {
  emits('close')
}

function onClose() {
  emits('close')
}
</script>

<template>
  <uni-popup-dialog
    class="component transfusion-info-edit" mode="base" type="info" title="添加输液信息" before-close
    @close="onClose" @confirm="onConfirm"
  >
    <uni-forms :model="modelData" class="transfusion-info-edit-form" label-width="70px" label-align="right">
      <uni-forms-item label="药品名称" name="DrugName">
        <uni-easyinput />
      </uni-forms-item>
      <uni-forms-item label="液体种类" name="DrugType">
        <uni-data-select v-model="modelData.DrugType" :localdata="drugTypeList" />
      </uni-forms-item>
      <uni-forms-item label="注入方式" name="Mode">
        <uni-data-select v-model="modelData.Mode" :localdata="drugUseModeList" />
      </uni-forms-item>
      <uni-forms-item label="剂量" name="Unit">
        <view class="row">
          <uni-easyinput v-model="modelData.Dose" type="number" placeholder="剂量" />
          <uni-data-select v-model="modelData.Unit" :localdata="drugUnitList" placeholder="剂量单位" />
        </view>
      </uni-forms-item>
      <uni-forms-item label="开始时间" name="DrugName">
        <uni-datetime-picker type="datetime" />
      </uni-forms-item>
      <uni-forms-item label="结束时间" name="DrugName">
        <uni-datetime-picker type="datetime" />
      </uni-forms-item>
    </uni-forms>
  </uni-popup-dialog>
</template>

<style lang="scss" scoped>
.transfusion-info-edit {
  width: 440px;
  // padding: 16px 32px 32px;
  ::v-deep .uni-dialog-content{
    overflow: auto;
  }
}
</style>

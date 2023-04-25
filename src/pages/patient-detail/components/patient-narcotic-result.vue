<script lang="ts" setup>
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import NarcoticResultTempalteSelect from './narcotic-result-tempalte-select.vue'
import DoctorSign from './doctor-sign.vue'
import { PatientDetailDict, narcoticItemRevert, narcoticItemsConvert } from '@/composables/patient-narcotic-detail.composable'
import { getNarcoticResult, saveNarcoticResult } from '@/utils/api'

const id = inject<Ref<string>>('id')
// 模板ref
const popupSelectRef = ref<UniHelper.UniPopupProps>()
// form ref
const formRef = ref<UniForm>()
// true手术室情况模板 false 恢复室情况模板
const templateOperate = ref(true)
const templateDialogTitle = computed(() => templateOperate.value ? '术中特殊情况模板选择' : '恢复室内容情况模板')
const modelData = reactive({
  specific: '无',
  specificText: '',
  comToLifeState: 2,
  breathActiveState: 2,
  bodyActiveState: 2,
  StewardCount: 6,
  passTo: '观察室',
  passToText: '',
  narcoticDoctorName: '',
  narcoticDoctorSign: '',
  narcoticDoctorDate: '',
  recoverySpecific: '无',
  recoverySpecificText: '',
  vitalsignState: 2,
  activeState: 2,
  nauseaState: 2,
  painState: 2,
  bleedingState: 1,
  PADSCount: 10,
  canLeave: '可',
  narcoticDoctor2Name: '',
  narcoticDoctor2Sign: '',
  narcoticDoctor2Date: '',
  nurseName: '',
  nurseSign: '',
  nurseDate: '',
})

const rules = {
  narcoticDoctorName: {
    rules: [{ required: true, errorMessage: '请选择麻醉医师' }],
  },
  narcoticDoctorDate: {
    rules: [{ required: true, errorMessage: '请选择签字时间' }],
  },
  narcoticDoctor2Name: {
    rules: [{ required: true, errorMessage: '请选择麻醉医师' }],
  },
  narcoticDoctor2Date: {
    rules: [{ required: true, errorMessage: '请选择签字时间' }],
  },
  nurseName: {
    rules: [{ required: true, errorMessage: '请选择恢复室护士' }],
  },
  nurseDate: {
    rules: [{ required: true, errorMessage: '请选择签字时间' }],
  },
  passTo: {
    rules: [{ validateFunction: passToValidator }],
  },
  specificText: {
    rules: [{ required: true, errorMessage: '请输入术中特殊情况描述' }],
  },
  recoverySpecificText: {
    rules: [{ required: true, errorMessage: '请输入恢复室内情况描述' }],
  },
}

onMounted(() => {
  getNarcoticResult(id!.value).then((data) => {
    narcoticItemRevert(data, modelData)
  })
})

/** 术后转其他验证 */
function passToValidator(_: any, value: string, __: any, callback: Function) {
  if (value === '其它' && !modelData.passToText)
    callback('请输入术后转其他内容')
  else
    return true
}

const StewardCount = computed(() => modelData.comToLifeState + modelData.bodyActiveState + modelData.breathActiveState)
const PADSCount = computed(() => modelData.vitalsignState + modelData.activeState + modelData.painState + modelData.nauseaState + modelData.bleedingState)

const showSpecific = computed(() => modelData.specific === '有')
const showRecoverySpecific = computed(() => modelData.recoverySpecific === '有')
const showPassToText = computed(() => modelData.passTo === '其它')
const showCanLeaveText = computed(() => modelData.canLeave === '可')

/**
 * 打开模板选择弹窗
 * @description true手术室情况模板 false 恢复室情况模板
 */
function openSpecificTemplate(flag: boolean) {
  templateOperate.value = flag
  popupSelectRef.value?.open()
}

function onTemplateSelectd(val: string) {
  if (templateOperate.value)
    modelData.specificText = val

  else
    modelData.recoverySpecificText = val

  onTempalteClose()
}

function onTempalteClose() {
  popupSelectRef.value?.close()
}

const doctorKey = ref('')

function setSignInfo(data?: any) {
  const dateStr = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  switch (doctorKey.value) {
    case 'narcoticDoctor':
      modelData.narcoticDoctorName = data?.userName ?? ''
      modelData.narcoticDoctorSign = data?.userCode ?? ''
      modelData.narcoticDoctorDate = data ? dateStr : ''
      break
    case 'narcoticDoctor2':
      modelData.narcoticDoctor2Name = data?.userName ?? ''
      modelData.narcoticDoctor2Sign = data?.userCode ?? ''
      modelData.narcoticDoctor2Date = data ? dateStr : ''
      break
    default:
      modelData.nurseName = data?.userName ?? ''
      modelData.nurseSign = data?.userCode ?? ''
      modelData.nurseDate = data ? dateStr : ''
      break
  }
}

function onSubmit() {
  formRef.value?.validate([], (errs) => {
    if (!errs)
      saveData()
  })
}

function saveData() {
  const items = narcoticItemsConvert(modelData)
  items.push({
    ItemName: 'Steward总分',
    ItemValue: StewardCount.value.toString(),
    ControlType: 'InputComboBox',
  }, {
    ItemName: 'PADS评分',
    ItemValue: PADSCount.value.toString(),
    ControlType: 'InputComboBox',
  })

  saveNarcoticResult(id!.value, items).then((result) => {
    if (result) {
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      })
    }
    else {
      uni.showToast({
        title: '保存失败，请重试',
        icon: 'error',
      })
    }
  })
}
</script>

<template>
  <view class="component patient-narcotic-result p-x-4">
    <!-- 模板弹窗 -->
    <uni-popup ref="popupSelectRef" type="dialog">
      <NarcoticResultTempalteSelect
        :title="templateDialogTitle" :type="templateOperate ? 'OPERATE' : 'PACU'"
        @close="onTempalteClose" @confirm="onTemplateSelectd"
      />
    </uni-popup>

    <uni-section class="patient-narcotic-result-header" title="麻醉情况" type="line">
      <template #right>
        <button type="primary" size="mini" @click="onSubmit">
          保存
        </button>
      </template>
    </uni-section>
    <uni-forms
      ref="formRef" :rules="rules" :model="modelData" label-width="100px" label-align="right"
      class="patient-narcotic-result-form"
    >
      <uni-forms-item label="术中特殊情况" class="no-margin">
        <uni-data-checkbox v-model="modelData.specific" :localdata="PatientDetailDict.has" mode="button" />
      </uni-forms-item>
      <uni-forms-item v-if="showSpecific" name="specificText" label="情况描述">
        <view class="row">
          <uni-easyinput v-model="modelData.specificText" type="textarea" />
          <button size="mini" type="primary" plain class="self-start m-l-4" @click="() => openSpecificTemplate(true)">
            模板
          </button>
        </view>
      </uni-forms-item>
      <view class="m-y-2">
        Steward评分：{{ StewardCount }} 分
      </view>
      <uni-forms-item label="清醒程度" class="no-margin">
        <uni-data-checkbox
          v-model="modelData.comToLifeState" :localdata="PatientDetailDict.comToLifeState"
          mode="button"
        />
      </uni-forms-item>
      <uni-forms-item label="呼吸通畅程度" class="no-margin">
        <uni-data-checkbox
          v-model="modelData.breathActiveState" :localdata="PatientDetailDict.breathActiveState"
          mode="button"
        />
      </uni-forms-item>
      <uni-forms-item label="肢体活动程度" class="no-margin">
        <uni-data-checkbox
          v-model="modelData.bodyActiveState" :localdata="PatientDetailDict.bodyActiveState"
          mode="button"
        />
      </uni-forms-item>

      <uni-forms-item label="术后转" name="passTo">
        <div class="row">
          <uni-data-checkbox
            v-model="modelData.passTo" class="no-flex" :localdata="PatientDetailDict.passTo"
            mode="button"
          />
          <uni-easyinput v-if="showPassToText" v-model="modelData.passToText" class="m-l-2" />
        </div>
      </uni-forms-item>

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="麻醉医师" class="form-item-doctor" name="narcoticDoctorName">
            <DoctorSign :sign-code="modelData.narcoticDoctorSign" role-code="Anesthetist" @click="() => doctorKey = 'narcoticDoctor'" @signed="setSignInfo" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item label="时间" class="form-item-doctor" name="narcoticDoctorDate">
            <uni-datetime-picker v-model="modelData.narcoticDoctorDate" type="datetime" class="form-item-doctor-date" />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-forms-item label="恢复室内情况" name="recoverySpecific" class="no-margin">
        <uni-data-checkbox v-model="modelData.recoverySpecific" :localdata="PatientDetailDict.has" mode="button" />
      </uni-forms-item>
      <uni-forms-item v-if="showRecoverySpecific" name="recoverySpecificText" label="情况描述">
        <view class="row">
          <uni-easyinput v-model="modelData.recoverySpecificText" type="textarea" />
          <button size="mini" type="primary" plain class="self-start m-l-4" @click="() => openSpecificTemplate(false)">
            模板
          </button>
        </view>
      </uni-forms-item>

      <uni-section title="离开院返科标准" />
      <uni-forms-item label="1、生命体征" class="no-margin">
        <uni-data-checkbox
          v-model="modelData.vitalsignState" :localdata="PatientDetailDict.vitalsignState"
          mode="button"
        />
      </uni-forms-item>
      <uni-forms-item label="2、活动状态" class="no-margin">
        <uni-data-checkbox v-model="modelData.activeState" :localdata="PatientDetailDict.activeState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="3、恶心呕吐" class="no-margin">
        <uni-data-checkbox v-model="modelData.nauseaState" :localdata="PatientDetailDict.nauseaState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="4、疼痛" class="no-margin">
        <uni-data-checkbox v-model="modelData.painState" :localdata="PatientDetailDict.painState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="5、手术部位出血" class="no-margin">
        <uni-data-checkbox v-model="modelData.bleedingState" :localdata="PatientDetailDict.bleedingState" mode="button" />
      </uni-forms-item>
      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="PDSA评分">
            <view class="leading-8">
              {{ PADSCount }} 分
            </view>
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item label="可否出科">
            <uni-data-checkbox v-model="modelData.canLeave" :localdata="PatientDetailDict.canLeave" mode="button" />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <view v-if="showCanLeaveText" class="p-b-10 font-600 text-center">
        经复苏后，患者已达出室标准，麻醉医师已向患者及家属交代麻醉后注意事项，家属知晓并理解。
      </view>

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="麻醉医师" class="form-item-doctor" name="narcoticDoctor2Name">
            <DoctorSign :sign-code="modelData.narcoticDoctor2Sign" role-code="Anesthetist" @click="() => doctorKey = 'narcoticDoctor2'" @signed="setSignInfo" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item label="时间" class="form-item-doctor" name="narcoticDoctorDate">
            <uni-datetime-picker v-model="modelData.narcoticDoctor2Date" type="datetime" class="form-item-doctor-date" />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="恢复室护士" class="form-item-doctor" name="nurseName">
            <DoctorSign :sign-code="modelData.nurseSign" role-code="AnNurse" @click="() => doctorKey = 'nurse'" @signed="setSignInfo" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item label="时间" class="form-item-doctor" name="narcoticDoctorDate">
            <uni-datetime-picker v-model="modelData.nurseDate" type="datetime" class="form-item-doctor-date" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-narcotic-result {

  .form-item-doctor-date {
    width: 310px;
    flex: unset;
  }

  .no-flex {
    flex: unset;
  }

  .no-margin {
    margin-bottom: 4px;
  }

}
</style>

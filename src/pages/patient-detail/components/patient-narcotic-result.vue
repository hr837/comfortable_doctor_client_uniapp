<script lang="ts" setup>
import dayjs from 'dayjs'
import DoctorInput from './doctor-input.vue'
import NarcoticResultTempalteSelect from './narcotic-result-tempalte-select.vue'
import type { ApiResonseType } from '@/utils/api.help'
import { PatientDetailDict, narcoticItemsConvert } from '@/composables/patient-narcotic-detail.composable'
import { getUserSign, login, saveNarcoticResult } from '@/utils/api'
const props = defineProps<{ id: string }>()
const popupInputRef = ref<UniHelper.UniPopupProps>()
const popupSelectRef = ref<UniHelper.UniPopupProps>()
const popupTitle = ref('签名')
// true手术室情况模板 false 恢复室情况模板
const templateOperate = ref(true)
const templateDialogTitle = computed(() => templateOperate.value ? '术中特殊情况模板选择' : '恢复室内容情况模板')
const formRef = ref<UniForm>()
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

/** 选中的医生 */
const verifyInfo = reactive({
  key: '',
  userName: '',
  loginName: '',
})

/** 选中医生后密码验证 */
function onDoctorSelect(key: string, user?: ApiResonseType.UserInfo) {
  verifyInfo.key = key
  if (!user)
    return
  verifyInfo.userName = user.UserName
  verifyInfo.loginName = user.LoginName
  popupTitle.value = `签名-${user.UserName}【${user.LoginName}】`
  popupInputRef.value?.open()
}

/** 校验密码后获取签名 */
function dialogInputConfirm(pwd: any) {
  login({
    LoginName: verifyInfo.loginName,
    Password: pwd,
  }).then(() => getUserSign(verifyInfo.loginName).then(setSignInfo))
}

function setSignInfo(sign: any) {
  const dateStr = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  switch (verifyInfo.key) {
    case 'narcoticDoctor':
      modelData.narcoticDoctorName = verifyInfo.userName
      modelData.narcoticDoctorSign = sign
      modelData.narcoticDoctorDate = dateStr
      break
    case 'narcoticDoctor2':
      modelData.narcoticDoctor2Name = verifyInfo.userName
      modelData.narcoticDoctor2Sign = sign
      modelData.narcoticDoctor2Date = dateStr
      break
    default:
      modelData.nurseName = verifyInfo.userName
      modelData.nurseSign = sign
      modelData.nurseDate = dateStr
      break
  }

  verifyInfo.key = ''
}

function onSubmit() {
  formRef.value?.validate([], (errs) => {
    if (!errs)
      saveData()
  })
}

function saveData() {
  const items = narcoticItemsConvert(toRefs(modelData))
  items.push({
    ItemName: 'Steward总分',
    ItemValue: StewardCount.value.toString(),
    ControlType: 'InputComboBox',
  }, {
    ItemName: 'PADS评分',
    ItemValue: PADSCount.value.toString(),
    ControlType: 'InputComboBox',
  })

  saveNarcoticResult(props.id, items).then(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })
  })
}
</script>

<template>
  <!-- 密码弹窗 -->
  <uni-popup ref="popupInputRef" type="dialog">
    <uni-popup-dialog
      ref="inputDialogRef" mode="input" :title="popupTitle" input-type="password" value=""
      placeholder="请输入密码验证" @confirm="dialogInputConfirm"
    />
  </uni-popup>
  <!-- 模板弹窗 -->
  <uni-popup ref="popupSelectRef" type="dialog">
    <NarcoticResultTempalteSelect
      :title="templateDialogTitle" :type="templateOperate ? 'OPERATE' : 'PACU'"
      @close="onTempalteClose" @confirm="onTemplateSelectd"
    />
  </uni-popup>

  <view class="component patient-narcotic-result">
    <uni-section title="麻醉情况" type="line">
      <template #right>
        <button type="primary" size="mini" @click="onSubmit">
          保存
        </button>
      </template>
    </uni-section>
    <uni-forms ref="formRef" :rules="rules" :model="modelData" label-width="100px" label-align="right" class="p-4 p-t-0">
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

      <uni-forms-item label="麻醉医师" class="form-item-doctor" name="narcoticDoctorName">
        <view class="row">
          <DoctorInput
            role-code="Anesthetist" class="form-item-doctor-name"
            @selected="d => onDoctorSelect('narcoticDoctor', d)"
          />
          <image src="/static/sign.png" alt="sign" class="form-item-doctor-img" />
          <uni-datetime-picker v-model="modelData.narcoticDoctorDate" type="datetime" class="form-item-doctor-date" />
        </view>
      </uni-forms-item>

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
        <uni-col :span="12">
          <uni-forms-item label="PDSA评分" class="no-margin">
            <view class="leading-8">
              {{ PADSCount }} 分
            </view>
          </uni-forms-item>
        </uni-col>
        <uni-col :span="12">
          <uni-forms-item label="可否出科" class="no-margin">
            <uni-data-checkbox v-model="modelData.canLeave" :localdata="PatientDetailDict.canLeave" mode="button" />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <view class="p-b-4 font-600 text-center">
        经复苏后，患者已达出室标准，麻醉医师已向患者及家属交代麻醉后注意事项，家属知晓并理解。
      </view>

      <uni-forms-item label="麻醉医师" class="form-item-doctor" name="narcoticDoctor2Name">
        <view class="row">
          <DoctorInput
            role-code="Anesthetist" class="form-item-doctor-name"
            @selected="d => onDoctorSelect('narcoticDoctor2', d)"
          />
          <image src="/static/sign.png" alt="sign" class="form-item-doctor-img" />
          <uni-datetime-picker v-model="modelData.narcoticDoctor2Date" type="datetime" class="form-item-doctor-date" />
        </view>
      </uni-forms-item>

      <uni-forms-item label="恢复室护士" class="form-item-doctor" name="nurseName">
        <view class="row">
          <DoctorInput role-code="OpNurse" class="form-item-doctor-name" @selected="d => onDoctorSelect('nurse', d)" />
          <image src="/static/sign.png" alt="sign" class="form-item-doctor-img" />
          <uni-datetime-picker v-model="modelData.nurseDate" type="datetime" class="form-item-doctor-date" />
        </view>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-narcotic-result {
  .form-item-doctor {
    position: relative;

    &-img {
      @apply: w-130px h-35px p-x-4;
    }

    &-date {
      width: 310px;
      flex: unset;

      ::v-deep .uni-date__x-input {
        height: 32px;
      }
    }
  }

  .no-flex {
    flex: unset;
  }

  .no-margin {
    margin-bottom: 4px;
  }

}
</style>

<script lang="ts" setup>
import NarcoticResultTempalteSelect from './narcotic-result-tempalte-select.vue'
import { PatientDetailDict } from '@/composables/patient-narcotic-detail.composable'
const popupInputRef = ref<UniHelper.UniPopupProps>()
const popupSelectRef = ref<UniHelper.UniPopupProps>()

const doctors = [{ text: '赵医生', value: '87654321', disable: false }, { text: '李医生', value: '76543210', disable: false }]

function dialogInputConfirm() {

}

const popupTitle = ref('签名')
// true手术室情况模板 false 恢复室情况模板
const templateOperate = ref(true)
const templateDialogTitle = computed(() => templateOperate.value ? '术中特殊情况模板选择' : '恢复室内容情况模板')

function onSelectChange(val: string | number) {
  const item = doctors.find(x => x.value === val)
  if (!item)
    return
  popupTitle.value = `签名-${item.text}【${item.value}】`
  popupInputRef.value?.open()
}

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
  narcoticDoctorTime: '',
  recoverySpecific: '无',
  recoverySpecificText: '',
  vitalsignState: 2,
  activeState: 2,
  nauseaState: 2,
  painState: 2,
  bleedingState: 1,
  PADSCount: 10,
  canLeave: '可',
})

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
        <button type="primary" size="mini">
          保存
        </button>
      </template>
    </uni-section>
    <uni-forms ref="formRef" :model="modelData" label-width="100px" label-align="right" class="p-4 p-t-0">
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

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="术后转" name="passTo">
            <div class="row">
              <uni-data-checkbox v-model="modelData.passTo" :localdata="PatientDetailDict.passTo" mode="button" />
            </div>
          </uni-forms-item>
        </uni-col>
        <uni-col v-if="showPassToText" :span="14">
          <uni-forms-item name="passToText">
            <uni-easyinput v-model="modelData.passToText" class="flex-2" />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <uni-forms-item label="麻醉医师" class="no-margin">
            <uni-data-select :localdata="doctors" @change="onSelectChange" />
          </uni-forms-item>
          <uni-forms-item label="时间">
            <uni-datetime-picker type="datetime" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="12">
          <image src="/static/sign.png" alt="sign" class="sign-img" />
        </uni-col>
      </uni-row>

      <uni-forms-item label="恢复室内情况" name="status" class="no-margin">
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
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-narcotic-result {
  .sign-img {
    @apply: h-100px p-l-10;
  }

  .no-margin {
    margin-bottom: 4px;
  }
}
</style>

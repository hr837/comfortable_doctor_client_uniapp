<script lang="ts" setup>
import { PatientDetailDict } from '@/composables/patient-narcotic-detail.composable'
const popupRef = ref<UniHelper.UniPopupProps>()

const doctors = [{ text: '赵医生', value: '87654321', disable: false }, { text: '李医生', value: '76543210', disable: false }]

function dialogInputConfirm() {

}

let popupTitle = $ref('签名')

function onSelectChange(val: string) {
  const item = doctors.find(x => x.value === val)
  if (!item)
    return
  popupTitle = `签名-${item.text}【${item.value}】`
  popupRef.value?.open()
}
</script>

<template>
  <uni-popup ref="popupRef" type="dialog">
    <uni-popup-dialog
      ref="inputDialogRef" mode="input" :title="popupTitle" input-type="password" value=""
      placeholder="请输入密码验证" @confirm="dialogInputConfirm"
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
    <uni-forms ref="formRef" label-width="100px" label-align="right" class="p-4 p-t-0">
      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="术中特殊情况" name="status" class="no-margin">
            <uni-data-checkbox class="flex-0" :localdata="PatientDetailDict.has" mode="button" />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item class="no-margin">
            <uni-easyinput class="flex-2" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
      <uni-section title="Steward评分：" />
      <uni-forms-item label="清醒程度" class="no-margin">
        <uni-data-checkbox :localdata="PatientDetailDict.comToLifeState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="呼吸通畅程度" class="no-margin">
        <uni-data-checkbox :localdata="PatientDetailDict.breathActiveState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="肢体活动程度" class="no-margin">
        <uni-data-checkbox :localdata="PatientDetailDict.bodyActiveState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="总分">
        <uni-easyinput type="number" :maxlength="2" class="w-100px" />
      </uni-forms-item>

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="术后转">
            <div class="row">
              <uni-data-checkbox :localdata="PatientDetailDict.passTo" mode="button" />
            </div>
          </uni-forms-item>
        </uni-col>
        <uni-col :span="14">
          <uni-forms-item>
            <uni-easyinput class="flex-2" />
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

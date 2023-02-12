<script lang="ts" setup>
const popupRef = ref<UniHelper.UniPopupProps>()

const dict = {
  has: [{ text: '无', value: 'n', disabled: false }, { text: '有', value: 'y', disabled: false }],
  comToLifeState: [{ text: '完全清醒', value: 'n', disabled: false }, { text: '对刺激有反应', value: 'y', disabled: false }, { text: '对刺激无反应', value: 'z', disabled: false }],
  breathActiveState: [{ text: '可按医师吩咐咳嗽', value: 'n', disabled: false }, { text: '可自主维持呼吸道通畅', value: 'y', disabled: false }, { text: '呼吸道需予以支持', value: 'z', disabled: false }],
  bodyActiveState: [{ text: '肢体活动有意识的活动', value: 'n', disabled: false }, { text: '肢体活动无意识活动', value: 'y', disabled: false }, { text: '肢体无活动', value: 'z', disabled: false }],
  passTo: [{ text: '恢复室', value: 'n', disabled: false }, { text: '观察室', value: 'y', disabled: false }, { text: '其它', value: 'z', disabled: false }],
}

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
            <uni-data-checkbox class="flex-0" :localdata="dict.has" mode="button" />
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
        <uni-data-checkbox :localdata="dict.comToLifeState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="呼吸通畅程度" class="no-margin">
        <uni-data-checkbox :localdata="dict.breathActiveState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="肢体活动程度" class="no-margin">
        <uni-data-checkbox :localdata="dict.bodyActiveState" mode="button" />
      </uni-forms-item>
      <uni-forms-item label="总分">
        <uni-easyinput type="number" :maxlength="2" class="w-100px" />
      </uni-forms-item>

      <uni-row>
        <uni-col :span="10">
          <uni-forms-item label="术后转">
            <div class="row">
              <uni-data-checkbox :localdata="dict.passTo" mode="button" />
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

<script lang="ts" setup>
const dict = {
  source: [{ text: '门诊', value: 'mz', disable: false }, { text: '住院', value: 'zy', disable: false }],
  department: [{ text: '科室一', value: 'mz', disable: false }, { text: '科室二', value: 'zy', disable: false }],
  bloodType: [{ text: '未检测', value: '', disable: false }, { text: 'A型', value: 'a', disable: false }, { text: 'B型', value: 'b', disable: false }, { text: 'AB型', value: 'ab', disable: false }, { text: 'O型', value: 'o', disable: false }],
  bolldRH: [{ text: '未检测', value: '', disable: false }, { text: '阳性', value: '+', disable: false }, { text: '阴性', value: '-', disable: false }],
  operation: [{ text: '宫腔镜', value: 'gqj', disable: false }, { text: '气管检查镜', value: 'qgjcj', disable: false }, { text: '人流', value: 'rl', disable: false }],
}
</script>

<template>
  <view class="component patient-base-info">
    <uni-section title="基本信息" type="line">
      <template #right>
        <button type="primary" size="mini">
          保存
        </button>
      </template>
    </uni-section>
    <uni-forms ref="formRef" label-width="100px" label-align="right" class="p-4 p-t-0">
      <uni-row>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="姓名">
            <uni-easyinput />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="就诊号">
            <uni-easyinput type="number" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="性别">
            <uni-easyinput />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="身份证号">
            <uni-easyinput type="idcard" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="出生日期">
            <uni-datetime-picker type="date" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="年龄">
            <uni-easyinput type="number" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="患者来源">
            <uni-data-select :localdata="dict.source" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="科室">
            <uni-data-select :localdata="dict.department" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="病区">
            <uni-easyinput />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="床号">
            <uni-easyinput />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="体重">
            <uni-easyinput type="digit" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="身高">
            <uni-easyinput type="number" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="血型">
            <uni-data-select :localdata="dict.bloodType" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="Rh血型">
            <uni-data-select :localdata="dict.bolldRH" />
          </uni-forms-item>
        </uni-col>

        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="申请日期">
            <uni-datetime-picker type="date" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="手术操作">
            <uni-data-select :localdata="dict.operation" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="12" :md="8">
          <uni-forms-item label="特殊感染">
            <uni-easyinput />
          </uni-forms-item>
        </uni-col>
      </uni-row>
      <uni-forms-item label="初步诊断">
        <uni-easyinput type="textarea" />
      </uni-forms-item>
      <uni-forms-item label="处理意见">
        <uni-easyinput type="textarea" />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>

</style>

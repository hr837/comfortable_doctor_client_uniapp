<script lang="ts" setup>
import { updateState } from '@/utils/api'
import type { ApiRequestType } from '@/utils/api.help'
const props = defineProps<{ id: string }>()

const list = ref([{
  title: '入室时间',
  desc: '-',
}, {
  title: '麻醉开始',
  desc: '-',
}, {
  title: '手术开始',
  desc: '-',
}, {
  title: '手术结束',
  desc: '-',
},
{
  title: '麻醉结束',
  desc: '-',
}, {
  title: '出室时间',
  desc: '-',
}, {
  title: '入PACU',
  desc: '-',
}, {
  title: '出PACU',
  desc: '-',
}])

const localdata = computed<UniHelper.UniDataSelectLocaldata[]>(() => list.value.map(x => ({
  text: x.title,
  value: x.title,
  disable: false,
})))

const modelData = reactive<ApiRequestType.FlowStateInfo>({
  StateName: '',
  StateTime: '',
  AnesthesiaId: '',
})

const active = ref(-1)

function onSave() {
  if (!modelData.StateName) {
    return uni.showToast({
      title: '请选择节点',
      icon: 'none',
    })
  }
  if (!modelData.StateTime) {
    return uni.showToast({
      title: '请选择节点完成时间',
      icon: 'none',
    })
  }

  modelData.AnesthesiaId = props.id

  updateState(modelData).then(data => data && changeList()).catch(() => {
    uni.showToast({
      title: '保存失败，请稍后重试',
      icon: 'none',
    })
  })
}

function changeList() {
  const index = list.value.findIndex(x => x.title === modelData.StateName)
  if (index > -1) {
    list.value[index].desc = modelData.StateTime
    active.value = list.value.findLastIndex(x => x.desc !== '-')
  }
}
</script>

<template>
  <view class="component patient-detail-state-time">
    <uni-section title="时间节点" type="line">
      <template #right>
        <view class="patient-detail-state-time-form row">
          <uni-data-select v-model="modelData.StateName" class="patient-detail-state-time-form-state" :localdata="localdata" label="节点" />
          <uni-datetime-picker v-model="modelData.StateTime" class="patient-detail-state-time-form-time" type="datetime" placeholder="请选择节点完成时间" />
          <button size="mini" type="primary" @click="onSave">
            保存
          </button>
        </view>
      </template>
    </uni-section>
    <uni-steps class="patient-detail-state-time-steps" :options="list" active-color="#007AFF" :active="active" direction="column" />
  </view>
</template>

<style lang="scss" scoped>
.patient-detail-state-time-form{
  &-state{
    width: 180px;
  }
  &-time{
    width: 220px;
    flex: unset;
    margin-right: 8px;
    ::v-deep .uni-date-editor--x{
      height: 35px;
      .uni-date__x-input{
        height: auto;
      }
    }
  }
}

.patient-detail-state-time-steps{
  padding: 32px;
  // margin: 30px 0 0 50px;
  // width: 400px;
  ::v-deep .uni-steps__column{
    .uni-steps__column-text{
      padding: 12px 0;
    }
  }
}
</style>

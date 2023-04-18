<script lang="ts" setup>
import dayJs from 'dayjs'
import type { ItemInfo } from '@/utils/api.help'
import { STORE_KEY_ROOM } from '@/utils/app.constant'

export interface QueryInfo {
  query: string
  date: string
  department: string
  roomCode: string
}

const props = withDefaults(defineProps<{ showRoomItem?: boolean }>(), { showRoomItem: false })

const emits = defineEmits(['submit'])

const formRef = ref<UniForm>()

const model = $ref<QueryInfo>({
  query: '',
  date: '',
  department: '',
  roomCode: '',
})

const departmentList = computed(() => getApp().globalData!.deptList.map((item: ItemInfo) => ({
  text: item.ItemName,
  value: item.ItemCode,
})))

const roomList = computed(() => getApp().globalData?.roomList ?? [])

// 提交事件回调
const onSubmit = () => emits('submit', { ...model })

onMounted(() => {
  if (props.showRoomItem) {
    const roomCode = uni.getStorageSync(STORE_KEY_ROOM)
    model.roomCode = roomCode ?? ''
  }
  nextTick(() => {
    model.date = dayJs(Date.now()).format('YYYY-MM-DD')
    onSubmit()
  })
})
</script>

<template>
  <view class="component patient-query-form p-4">
    <uni-forms ref="formRef" :model="model" label-width="100px" label-align="right">
      <uni-forms-item name="query" class="patient-query_form-item--query">
        <view class="flex items-center ">
          <uni-easyinput v-model="model.query" placeholder="姓名/就诊卡号" class="flex-1" />
          <button type="primary" class="m-l-4" size="mini" @click="onSubmit">
            查询
          </button>
        </view>
      </uni-forms-item>
      <uni-row>
        <uni-col :xs="24" :sm="showRoomItem ? 8 : 12">
          <uni-forms-item label="检查日期" name="date">
            <uni-datetime-picker v-model="model.date" type="date" :clear-icon="false" />
          </uni-forms-item>
        </uni-col>
        <uni-col :xs="24" :sm="showRoomItem ? 8 : 12">
          <uni-forms-item label="科室" name="department">
            <uni-data-select v-model="model.department" :localdata="departmentList" popup-title="请选择科室" />
          </uni-forms-item>
        </uni-col>
        <uni-col v-if="showRoomItem" :xs="24" :sm="8">
          <uni-forms-item label="手术间" name="roomCode">
            <uni-data-select v-model="model.roomCode" :localdata="roomList" popup-title="请选择手术间" />
          </uni-forms-item>
        </uni-col>
      </uni-row>
      <slot name="append" />
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.patient-query-form {
  :deep(.uni-forms-item) {
    margin-bottom: 12px;
  }
}
</style>

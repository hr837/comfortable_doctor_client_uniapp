<script lang="ts" setup>
import type { ItemInfo } from '@/utils/api.help'
import { STORE_KEY_ROOM, STORE_ROOM_LIST } from '@/utils/app.constant'
import { dateFormat } from '@/composables'

export interface QueryInfo {
  query: string
  date: string
  department?: string
  roomCode?: string
  deptType?: string
}

interface PropType {
  /** 显示手术间 */
  showRoomItem?: boolean
  /** 显示科室 */
  showDepartment?: boolean
  /** 显示科别 */
  showDeptType?: boolean
}

const props = withDefaults(defineProps<PropType>(), {
  showRoomItem: false,
  showDepartment: false,
  showDeptType: false,
})

const emits = defineEmits(['submit'])

const formRef = ref<UniForm>()

const model = $ref<QueryInfo>({
  query: '',
  date: '',
  department: '',
  roomCode: '',
  deptType: '',
})

const departmentList = computed(() => getApp().globalData!.deptList.map((item: ItemInfo) => ({
  text: item.ItemName,
  value: item.ItemCode,
})))

const roomList = ref<UniHelper.UniDataSelectLocaldata[]>([])

// 提交事件回调
const onSubmit = () => emits('submit', { ...model })

onMounted(() => {
  if (props.showRoomItem) {
    const localCode = uni.getStorageSync(STORE_KEY_ROOM)
    const localRooms = uni.getStorageSync(STORE_ROOM_LIST)
    roomList.value = localRooms
    model.roomCode = localCode ?? ''
  }
  nextTick(() => {
    model.date = dateFormat(new Date().toLocaleString())
    onSubmit()
  })
})

const deptTypeData = [
  { text: '消化内科', value: '消化内科', disable: false },
  { text: '普查', value: '普查', disable: false },
  { text: '其他', value: '其他', disable: false },
]
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
        <uni-col :span="8">
          <uni-forms-item label="检查日期" name="date">
            <uni-datetime-picker v-model="model.date" type="date" :clear-icon="false" />
          </uni-forms-item>
        </uni-col>
        <uni-col v-if="showDepartment" :span="8">
          <uni-forms-item label="科室" name="department">
            <uni-data-select v-model="model.department" :localdata="departmentList" popup-title="请选择科室" />
          </uni-forms-item>
        </uni-col>
        <uni-col v-if="showDeptType" :span="8">
          <uni-forms-item label="科别">
            <uni-data-select v-model="model.deptType" :localdata="deptTypeData" popup-title="请选择科别" />
          </uni-forms-item>
        </uni-col>
        <uni-col v-if="showRoomItem" :span="8">
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

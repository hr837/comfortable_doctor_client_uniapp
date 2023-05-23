<script lang="ts" setup>
import type { ApiResonseType } from '@/utils/api.help'
import { dateFormat } from '@/composables'

const props = defineProps<{
  data: ApiResonseType.PatientInfo[]
}>()

const emits = defineEmits(['rowClick'])

const title = $computed(() => `共有${props.data.length}条记录`)

const onClick = (row: any) => emits('rowClick', { ...row })

const genderIcon = (str: string) => str === '女' ? 'icon-nvxing' : 'icon-nanxing'
</script>

<template>
  <view class="component patient-query-list">
    <uni-section :title="title" type="line" />
    <uni-collapse v-if="data.length > 0" accordion>
      <uni-collapse-item v-for="item of data" :key="item.Id" class="patient-query-list-item">
        <!-- 自定义header -->
        <template #title>
          <view class="patient-query-list-item_title">
            <uni-icons custom-prefix="iconfont" :type="genderIcon(item.PatientSex)" class="mx-4" />
            <text class="patient-query-list-item_title_item font-bold">
              {{ item.PatientName }}
            </text>
            <text class="patient-query-list-item_title_item font-bold">
              {{ item.PatientAge }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.PatientSource }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.PatientDepartmentName }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.PatientNumber }}
            </text>
            <text class="patient-query-list-item_title_item patient-query-list-item_title_item--examine-type">
              {{ item.ExamineType }}
            </text>
          </view>
        </template>
        <!-- 内容区域 -->
        <uni-row class="patient-query-list-item_content" @click="() => onClick(item)">
          <uni-col :span="18" class="flex mb-2">
            <text class="label">
              诊断
            </text>
            <text class="text">
              {{ item.DiagnosisName }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              是否评估
            </text>
            <text class="text">
              {{ item.IsAssessed ? '是' : '否' }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              申请医生
            </text>
            <text class="text">
              {{ item.DoctorName }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              申请日期
            </text>
            <text class="text">
              {{ dateFormat(item.SubscribeDate) }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              手术间
            </text>
            <text class="text">
              {{ item.OperatingRoomName }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              特殊感染
            </text>
            <text class="text">
              {{ item.SpecialInfect }}
            </text>
          </uni-col>
        </uni-row>
      </uni-collapse-item>
    </uni-collapse>
    <view v-else class="column flex-center py-10">
      <image src="/static/notdata.png" mode="aspectFit" />
      <view class="text-gray-300 mt-4">
        暂无数据
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.component.patient-query-list {
  @apply p-4;

  .patient-query-list-item {
    @apply my-1 border border-solid rounded-2 overflow-hidden;

    .patient-query-list-item_title {
      @apply flex items-center p-3;

      &_item {
        @apply mx-4 min-w-50px;

        &--examine-type {
          @apply max-w-120px truncate;
        }
      }
    }

    .patient-query-list-item_content {
      @apply p-4 border-t flex flex-wrap;

      .label {
        @apply w-15 text-gray-400;
      }

      .text {
        @apply text-gray-600;
      }
    }
  }
}
</style>

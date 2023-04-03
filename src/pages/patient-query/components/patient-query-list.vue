<script lang="ts" setup>
import type { PreOperativePatientInfo } from '@/types/patient.type'

const props = defineProps<{
  data: PreOperativePatientInfo[]
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
      <uni-collapse-item v-for="item of data" :key="item.code" class="patient-query-list-item">
        <!-- 自定义header -->
        <template #title>
          <view class="patient-query-list-item_title">
            <uni-icons custom-prefix="iconfont" :type="genderIcon(item.sex)" class="mx-4" />
            <text class="patient-query-list-item_title_item font-bold">
              {{ item.name }}
            </text>
            <text class="patient-query-list-item_title_item font-bold">
              {{ item.age }}{{ item.ageUnit ?? '岁' }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.source }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.dept }}
            </text>
            <text class="patient-query-list-item_title_item">
              {{ item.code }}
            </text>
          </view>
        </template>
        <!-- 内容区域 -->
        <uni-row class="patient-query-list-item_content" @click="() => onClick(item)">
          <uni-col :span="24" class="flex mb-2">
            <text class="label">
              诊断
            </text>
            <text class="text">
              {{ item.result }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              医保类型
            </text>
            <text class="text">
              {{ item.expense }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              申请医生
            </text>
            <text class="text">
              {{ item.doctor }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              特殊感染
            </text>
            <text class="text">
              {{ item.extend }}
            </text>
          </uni-col>
          <uni-col :span="6" class="flex">
            <text class="label">
              申请日期
            </text>
            <text class="text">
              {{ item.date }}
            </text>
          </uni-col>
        </uni-row>
      </uni-collapse-item>
    </uni-collapse>
    <view v-else class="column flex-center py-10">
      <image src="/static/notdata.png" mode="aspectFit"></image>
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
        @apply mx-4 min-w-15;
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

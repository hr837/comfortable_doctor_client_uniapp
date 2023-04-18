<script lang="ts" setup>
import type { ApiRequestType, ApiResonseType } from '@/utils/api.help'
import { getUserList } from '@/utils/api'

interface PropsType {
  /** 医生类型 */
  roleCode: ApiRequestType.RoleCode
}

const props = defineProps<PropsType>()
const emits = defineEmits(['selected'])
const userList = ref<ApiResonseType.UserInfo[]>([])

const userSelected = ref('')
const userOptionList = ref<string[]>([])

onMounted(() => {
  getUserList(props.roleCode).then((data) => {
    userList.value = data
    userOptionList.value = data.map((x) => {
      let text = `${x.UserName}|${x.LoginName}`
      if (x.Spell)
        text += `|${x.Spell}`
      return text
    })
  })
})

function onSubmit() {
  const [n, c, _] = userSelected.value.split('|')
  const nc = `${n}|${c}`
  const item = userList.value.find(x => `${x.UserName}|${x.LoginName}` === nc)
  emits('selected', item)
}
</script>

<template>
  <view class="component doctor-input row h-8">
    <uni-combox v-model="userSelected" :candidates="userOptionList" class="flex-1" />
    <button type="primary" plain size="mini" class="p-x-2" @click="onSubmit">
      使用
    </button>
  </view>
</template>

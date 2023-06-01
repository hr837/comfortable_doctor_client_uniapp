import { dateFormat } from './index'
import { getCustomFormList } from '@/utils/api'

/** 原始数据 */
const safeCheckConfigList = [
  { title: '查看患者是否佩戴腕带', ItemName: 'Item01', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者姓名、性别、门诊号/住院号', ItemName: 'Item02', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者检查/治疗手术申请单/病历、检查项目、检查部位', ItemName: 'Item03', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患方、医师是否签署诊疗知情同意书', ItemName: 'Item04', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者检查报告单是否齐全', ItemName: 'Item05', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者禁饮食情况', ItemName: 'Item06', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者过敏史、药物史', ItemName: 'Item07', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者检查/治疗体位是否正确', ItemName: 'Item08', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '患者检查/治疗镇痛方式', ItemName: 'Item09', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '植入物和特殊器材准备就绪', ItemName: 'Item10', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '检查/治疗时需用设备、物品是否完善', ItemName: 'Item11', ControlType: 'InputCheckBox', ItemValue: 'false' },
  { title: '检查/治疗时需用药品是否齐全', ItemName: 'Item12', ControlType: 'InputCheckBox', ItemValue: 'false' },
]

/** 可编辑的安全检查项 */
export const editSafeCheckList = ref<typeof safeCheckConfigList>([])

export const editSafeCheckSignData = reactive({
  narcoticDoctorName: '',
  narcoticDoctorSign: '',
  narcoticDoctorDate: '',
  doctorName: '',
  doctorSign: '',
  doctorDate: '',
  nurseName: '',
  nurseSign: '',
  nurseDate: '',
})

export function getCheckDetail(id: string, isAnalgesia: boolean) {
  // 使用默认
  editSafeCheckList.value = safeCheckConfigList.map(item => ({ ...item }))
  editSafeCheckSignData.narcoticDoctorName = ''
  editSafeCheckSignData.narcoticDoctorSign = ''
  editSafeCheckSignData.narcoticDoctorDate = ''
  editSafeCheckSignData.doctorName = ''
  editSafeCheckSignData.doctorSign = ''
  editSafeCheckSignData.doctorDate = ''
  editSafeCheckSignData.nurseName = ''
  editSafeCheckSignData.nurseSign = ''
  editSafeCheckSignData.nurseDate = ''

  return getCustomFormList(id).then((data) => {
    if (!data)
      return false
    const checkItems = data.Items
    // 重置
    editSafeCheckList.value = []

    // 按照固定顺序取值恢复
    for (const item of safeCheckConfigList) {
      if (item.ItemName === 'Item09' && !isAnalgesia)
        continue
      const info = checkItems.find(x => x.ItemName === item.ItemName)

      const value = (info ? info.ItemValue as string : 'false').toLocaleLowerCase()
      // 追加
      editSafeCheckList.value.push({
        ControlType: item.ControlType,
        ItemName: item.ItemName,
        ItemValue: value,
        title: item.title,
      })
    }

    // 取签名
    for (const item of checkItems) {
      const value = item.ItemValue as string
      if (item.ItemName === '麻醉医师签名1#LBL#') {
        editSafeCheckSignData.narcoticDoctorName = value
        editSafeCheckSignData.narcoticDoctorSign = value
      }

      if (item.ItemName === '麻醉医师签名1#DAT#') {
        const timeItem = checkItems.find(x => x.ItemName === '麻醉医师签名1#TIM#')
        if (!timeItem)
          continue

        editSafeCheckSignData.narcoticDoctorDate = `${value} ${timeItem.ItemValue}:00`
      }

      if (item.ItemName === '手术医师签名1#LBL#') {
        editSafeCheckSignData.doctorName = value
        editSafeCheckSignData.doctorSign = value
      }

      if (item.ItemName === '手术医师签名1#DAT#') {
        const timeItem = checkItems.find(x => x.ItemName === '手术医师签名1#TIM#')
        if (!timeItem)
          continue

        editSafeCheckSignData.doctorDate = `${value} ${timeItem.ItemValue}:00`
      }

      if (item.ItemName === '护士签名1#LBL#') {
        editSafeCheckSignData.nurseName = value
        editSafeCheckSignData.nurseSign = value
      }

      if (item.ItemName === '护士签名1#DAT#') {
        const timeItem = checkItems.find(x => x.ItemName === '护士签名1#TIM#')
        if (!timeItem)
          continue

        editSafeCheckSignData.nurseDate = `${value} ${timeItem.ItemValue}:00`
      }
    }

    return data.IsChecked
  }).catch(() => false)
}

export function getSafeCheckData() {
  const items = editSafeCheckList.value.map((item) => {
    return {
      ItemName: item.ItemName,
      ItemValue: item.ItemValue,
      ControlType: 'InputCheckBox',
    }
  })

  // 签名数据
  if (editSafeCheckSignData.narcoticDoctorSign) {
    items.push({
      ItemName: '麻醉医师签名1#LBL#',
      ItemValue: editSafeCheckSignData.narcoticDoctorSign,
      ControlType: 'InputLabel',
    })
  }
  if (editSafeCheckSignData.doctorSign) {
    items.push({
      ItemName: '手术医师签名1#LBL#',
      ItemValue: editSafeCheckSignData.doctorSign,
      ControlType: 'InputLabel',
    })
  }
  if (editSafeCheckSignData.nurseSign) {
    items.push({
      ItemName: '护士签名1#LBL#',
      ItemValue: editSafeCheckSignData.nurseSign,
      ControlType: 'InputLabel',
    })
  }

  // 签名时间
  if (editSafeCheckSignData.narcoticDoctorDate) {
    items.push({
      ItemName: '麻醉医师签名1#DAT#',
      ItemValue: dateFormat(editSafeCheckSignData.narcoticDoctorDate),
      ControlType: 'InputDatePicker',
    }, {
      ItemName: '麻醉医师签名1#TIM#',
      ItemValue: dateFormat(editSafeCheckSignData.narcoticDoctorDate, 'HH:mm'),
      ControlType: 'InputTimePicker',
    })
  }
  if (editSafeCheckSignData.doctorDate) {
    items.push({
      ItemName: '手术医师签名1#DAT#',
      ItemValue: dateFormat(editSafeCheckSignData.doctorDate),
      ControlType: 'InputDatePicker',
    }, {
      ItemName: '手术医师签名1#TIM#',
      ItemValue: dateFormat(editSafeCheckSignData.doctorDate, 'HH:mm'),
      ControlType: 'InputTimePicker',
    })
  }
  if (editSafeCheckSignData.nurseDate) {
    items.push({
      ItemName: '护士签名1#DAT#',
      ItemValue: dateFormat(editSafeCheckSignData.nurseDate),
      ControlType: 'InputDatePicker',
    }, {
      ItemName: '护士签名1#TIM#',
      ItemValue: dateFormat(editSafeCheckSignData.nurseDate, 'HH:mm'),
      ControlType: 'InputTimePicker',
    })
  }

  return items
}

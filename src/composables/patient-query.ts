import Mock from 'mockjs'
import type { PreOperativePatientInfo } from '@/types/patient.type'

export function getPatienData() {
  return new Promise<PreOperativePatientInfo[]>((resolve) => {
    resolve(Mock.mock({
      'data|0-5': [
        {
          'name': '@cname',
          'sex|1': [
            '男',
            '女',
          ],
          'age|18-76': 1,
          'source|1': [
            '门诊',
            '住院',
          ],
          'code|+1': 100000,
          'dept|1': ['肛肠科', '骨科', '神经科'],
          'result': '@ctitle(8,50)',
          'doctor|1': ['张微呃', '李照', '王冬'],
          'date': '@date',
          'expense|1': ['市医保', '居民医保', '无'],
          'extend|1': ['无', 'xxx'],
          'visitRecordFile|1': ['31.pdf', '32.pdf'],
          'contractFile|1': ['33.pdf', '34.pdf'],
        },
      ],
    }).data)
  })
}

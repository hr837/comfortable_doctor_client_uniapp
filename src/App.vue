<script  lang="ts">
import { STORE_KEY_SERVER } from './utils/app.constant'
import { getDeptList, getOperateRooms } from '@/utils/api'

export default defineComponent({
  globalData: {
    deptList: [],
    roomList: [],
  },
  onLaunch() {
    if (!uni.getStorageSync(STORE_KEY_SERVER)) {
      uni.setStorageSync(STORE_KEY_SERVER, 'http://172.16.1.28:8088')
    }
    else {
      getDeptList().then((data) => {
        getApp().globalData!.deptList = data
      })
      getOperateRooms().then((data) => {
        getApp().globalData!.roomList = data.map(item => ({
          text: item.RoomName,
          value: item.RoomCode,
          disable: false,
        }))
      })
    }
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
})
</script>

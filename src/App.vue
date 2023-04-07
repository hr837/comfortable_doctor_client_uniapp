<script  lang="ts">
import { STORE_KEY_SERVER } from './utils/app.constant'
import { getDeptList } from '@/utils/api'

export default defineComponent({
  globalData: {
    deptList: [],
  },
  onLaunch() {
    if (!uni.getStorageSync(STORE_KEY_SERVER)) {
      uni.setStorageSync(STORE_KEY_SERVER, 'http://172.16.1.28:8088')
    }
    else {
      getDeptList().then((data) => {
        getApp().globalData!.deptList = data
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

<script  lang="ts">
import { getDeptList } from '@/utils/api'

export default defineComponent({
  globalData: {
    deptList: [],
  },
  onLaunch() {
    getDeptList().then((data) => {
      getApp().globalData!.deptList = data
    })
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
})
</script>

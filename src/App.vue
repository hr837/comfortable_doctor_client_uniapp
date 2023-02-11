<script  lang="ts">
export default defineComponent({
  globalData: {
    text: '123',
  },
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
})
</script>

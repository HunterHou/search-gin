<script>
	export default {
		onLaunch: function() {
			let destHost = uni.getStorageSync("destHost")
			console.log('hist',destHost)
			if (!destHost) {
				destHost = "http://192.168.3.38"
				console.log('sethost',destHost)
				uni.setStorageSync("destHost", destHost)
			}

			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	/* 模拟器 夜神模拟器  */
	/* package passsword:3WbzP0cL */
</style>

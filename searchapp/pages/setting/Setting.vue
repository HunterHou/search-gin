<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="title">Host:</view>
			<input class="uni-input" require name="input" v-model="view.distHost" placeholder="这是一个输入框" />
		</view>
		<view class="uni-btn-v">
			<button @click="submit">Submit</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'
	const view = reactive({
		distHost: ''
	})
	const initView = async () => {
		const localHost =await uni.getStorageSync("distHost")
		console.log("readDistHost", localHost)
		if (localHost) {
			view.distHost = localHost
		}
	}
	const submit =async () => {
		console.log("writeDistHost", view.distHost)
		await uni.setStorageSync("distHost", view.distHost)
	}
	initView()
</script>

<style>

</style>

<template>
	<view>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
			@cancel="cancel" @clear="clear">
		</uni-search-bar>
		<uni-list>
			<uni-list-item title="文件搜索"></uni-list-item>
			<uni-list-item :disabled="true" title="列表禁用状态"></uni-list-item>
		</uni-list>
	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	const view = reactive({
		modelList: {}
	})
	const loadData = () => {
		uni.request({
			url: "/api/movieList",
			method: "POST",
			timeout: 3000,
			header: {
				"Accept": "application/json, text/plain, */*",
				"content-type": "application/json; charset=utf-8"
			},
			dataType: 'json',
			withCredentials: true,
			data: {
				Page: 1,
				PageSize: 15
			},
			success: (res) => {
				view.modelList = res.data
				console.log(view.modelList)
				console.log(1)
			}
		})
	}
	loadData()
</script>

<style>

</style>

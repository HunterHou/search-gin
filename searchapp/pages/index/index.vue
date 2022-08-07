<template>
	<view class="content">
		<uni-table border stripe emptyText="暂无更多数据" >
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">文件夹</uni-th>
				<uni-th align="right">数量</uni-th>
				<uni-th align="right">大小</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="dir in view.dirsInfo" :key="dir.Name">
				<uni-td>{{dir.Name}}</uni-td>
				<uni-td>{{dir.Cnt}}</uni-td>
				<uni-td>{{dir.Size}}</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'
	import {
		GetSettingInfo
	} from '@/api/setting.js'

	const view = reactive({
		title: 'Hello',
		dirsInfo: {}
	})
	const loadData = async () => {
		const res = await GetSettingInfo({})
		if (res) {
			view.dirsInfo = res
		}
	}
	loadData()
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

</style>

<template>
	<view>
		<view v-if="player.isPlaying" class="videoClass">
			<button size="default" type="primary" @click="closeVideo">关闭</button>
			<video id="myVideo" style="width: 100%;min-height: 16rem;" :autoplay="player.autoplay" :src="player.src"
				@error="videoErrorCallback" :direction="player.direction" :show-loading="true" :loop="player.loop"
				:objectFit="player.fit" controls></video>

		</view>

		<uni-forms :modelValue="view.formData">
			<uni-forms-item label="类型">
				<uni-data-checkbox v-model="view.formData.movieType" @change="loadData()"
					:localdata="view.movieTypes" />
			</uni-forms-item>
			<uni-forms-item label="分类">
				<uni-data-checkbox v-model="view.formData.sortField" @change="loadData()"
					:localdata="view.sortFields" />
			</uni-forms-item>
			<uni-forms-item label="排序">
				<uni-data-checkbox v-model="view.formData.sortType" @change="loadData()" :localdata="view.sortTypes" />
			</uni-forms-item>
		</uni-forms>
		<uni-search-bar @confirm="search" :focus="true" v-model="view.formData.Keyword" @blur="blur" @focus="focus"
			@input="input" @cancel="cancel" @clear="clear">
		</uni-search-bar>

		<uni-card v-for="item in view.modelList" :isFull="true" :isShadow="true">
			<uni-row class="demo-uni-row" :gutter="24">
				<uni-col :span="8">
					<view class="demo-uni-col dark_deep">
						<image style="width: 100%;" :src="getPng(item.Id)"></image>
					</view>

				</uni-col>
				<uni-col :span="12">
					<view class="dark_deep">
						<text>{{item.Code}}</text>
					</view>
					<view class="dark_deep">
						<text>{{item.Actress}}</text>
					</view>
					<view class="demo-uni-col dark_deep">
						<text>{{item.Name}}</text>
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="demo-uni-col dark_deep">
						<button @click="playVideo(item)">播放</button>
					</view>
				</uni-col>
			</uni-row>
		</uni-card>
	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		watch
	} from 'vue'
	import {
		QueryFileList
	} from '../../api/files'
	const player = reactive({
		isPlaying: false,
		src: '',
		autoplay: true,
		title: '',
		fit: 'fill',
		showLoading: true,
		direction: 90,
		loop: true,
	})
	watch(player.isPlaying, () => {
		console.log(player.isPlaying)
	})
	const view = reactive({
		modelList: [],
		totalCount: 0,
		formData: {
			sortType: 'desc',
			sortField: 'MTime',
			movieType: ""
		},
		sortTypes: [{
			value: "desc",
			text: "倒"
		}, {
			value: "asc",
			text: "倒"
		}, ],
		movieTypes: [{
			value: "",
			text: "~"
		}, {
			value: "骑兵",
			text: "骑"
		}, {
			value: "步兵",
			text: "步"
		}, {
			value: "斯巴达",
			text: "欧"
		}, {
			value: "国产",
			text: "国"
		}],
		sortFields: [{
				value: "MTime",
				text: "时"
			}, {
				value: "Name",
				text: "名"
			},
			{
				value: "Size",
				text: "容"
			}
		]
	})
	const loadData = async () => {
		const queryParam = {
			Page: 1,
			PageSize: 15,
			MovieType: view.formData.movieType,
			SortField: view.formData.sortField,
			SortType: view.formData.sortType,
		}
		view.modelList = []
		const res = await QueryFileList(queryParam)
		const {
			Data,
			TotalCnt
		} = res
		view.modelList = Data
		view.totalCount = TotalCnt
		// uni.request({
		// 	url: "http://192.168.3.38:8081/api/movieList",
		// 	method: "POST",
		// 	timeout: 3000,
		// 	header: {
		// 		"Accept": "application/json, text/plain, */*",
		// 		"content-type": "application/json; charset=utf-8"
		// 	},
		// 	dataType: 'json',
		// 	withCredentials: true,
		// 	data: data,
		// 	success: (res) => {
		// 		const {
		// 			Data,
		// 			TotalCnt
		// 		} = res.data
		// 		view.modelList = Data
		// 		view.totalCount = TotalCnt
		// 	}
		// })
	}
	const getPng = (Id: string) => {
		return "http://192.168.3.38:8082/api/png/" + Id;
	}
	const getJpg = (Id: string) => {
		return "http://192.168.3.38:8082/api/jpg/" + Id;
	}

	const getFileStream = (id: string) => {
		return "http://192.168.3.38:8083/api/file/" + id;
	}

	const getActressImage = (actressUrl: string) => {
		return "http://192.168.3.38:8082" + actressUrl;
	}
	const playVideo = (item: any) => {
		player.isPlaying = true
		player.title = item.Code + item.Actress
		player.src = getFileStream(item.Id)
	}
	const closeVideo = () => {
		player.isPlaying = false
	}
	loadData()
</script>

<style>
	.demo-uni-row {
		margin-bottom: 10px;
		/* QQ、字节小程序文档写有 :host，但实测不生效 */
		/* 百度小程序没有 :host，需要设置block */
		/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
		display: block;
		/* #endif */
	}

	/* 支付宝小程序没有 demo-uni-row 层级 */
	/* 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级 */
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	/deep/ .uni-row {
		margin-bottom: 10px;
	}

	/* #endif */

	.demo-uni-col {
		height: 86px;
		border-radius: 4px;
	}

	.dark_deep {
		background-color: #99a9bf;
	}

	.dark {
		background-color: #d3dce6;
	}

	.light {
		background-color: #e5e9f2;
	}

	.videoClass {
		width: 100%;
		height: auto;
		z-index: 99;
		position: fixed;
	}
</style>

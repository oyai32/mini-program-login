<template>
	<view class="app">
		<view>微信小程序授权登录</view>
		<view class="imgDiv">
			<image :src="userInfo.avatar||img"></image>
		</view>
		<view>{{userInfo.nickname}}</view>
		<button v-show="!userId" type="primary" open-type="getUserInfo" @getuserinfo="mpWxGetUserInfo">
			<view class="item column center">
				微信登录
			</view>
		</button>
		<button id="updateUserInfo" v-show="userId" class="mt20" type="primary" @click="updateUserInfo">更新用户信息</button>
		<button @click="jumpPage" class="mt20">跳入下一页</button>
		<button class="mt20" v-show="userId" type="primary"  @click="logout">
			<view class="item column center">
				退出登录
			</view>
		</button>
		<view class="mt20" style='color:red'>仅支持微信登录微信小程序</view>
		<view class="mt20">一个用户只入库一次<br/>并存在store和storage中</view>
	</view>
</template>

<script>
	import loginMpWx from '@/common/oyyl-mixin/login-mp-wx.js'
	import logo from '@/static/logo.png'
	export default {
		mixins: [loginMpWx],
		data() {
			return {
				img: logo
			}
		},
		methods: {
			jumpPage() {
				if (!this.$util.isLogin()) {
					return;
				}
				uni.navigateTo({
					url: '/pages/oyyl-index/test'
				})
			},
			logout(){
				this.$store.dispatch('logout');
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			userId() {
				return this.$store.getters.userId
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		text-align: center;
		padding: 20px;
	}

	.imgDiv {
		width: 200rpx;
		height: 200rpx;
		margin: 50px auto;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.mt20 {
		margin-top: 20px;
	}
</style>

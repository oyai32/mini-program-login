<template>
	<view class="app">
		<view>微信小程序授权登录</view>
		<view class="imgDiv">
			<image :src="userInfo.avatar||img"></image>
		</view>
		<view>{{userInfo.nickname}}</view>
		<button id="updateUserInfo" v-show="userId" class="mt20" type="primary" @click="updateUserInfo">更新用户信息</button>
		<button @click="jumpPage" class="mt20">跳入下一页</button>
		<button class="mt20" v-show="userId" type="primary" @click="logout">
			<view class="item column center">
				退出登录
			</view>
		</button>
		<view class="mt20" style='color:red'>仅支持微信登录微信小程序</view>
		<view class="mt20">一个用户只入库一次<br />并存在store和storage中</view>
	</view>
</template>

<script>
	import logo from '@/static/logo.png';
	import {
		request
	} from '@/common/oyyl-js/request';
	import {
		isLogin,
		msg
	} from '@/common/oyyl-js/util.js';

	export default {
		data() {
			return {
				img: logo
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			userId() {
				return this.$store.getters.userId
			}
		},
		methods: {
			jumpPage() {
				if (!isLogin()) {
					return;
				}
				uni.navigateTo({
					url: '/pages/oyyl-index/test'
				})
			},
			logout() {
				this.$store.dispatch('logout');
			},
			async updateUserInfo() {
				try {
					const userInfo = await this.getUserInfo();
					this.$store.dispatch('setUserData', userInfo);
				} catch (e) {
					msg(e.msg);
				}
			},
			async getUserInfo() {
				// 获取用户信息
				const userProfile = await wx.getUserProfile({
					desc: "更新用户信息"
				});
				const {
					nickName,
					gender,
					avatarUrl
				} = userProfile.userInfo;

				// 此处一定要先从userInfo中获取对应的属性，直接...uerInfo传给云函数会少内容
				const res = await request('oyyl-user', 'updateUserInfo', {
					id: this.userId,
					nickName,
					gender,
					avatarUrl
				}, {
					showLoading: true
				});

				const {
					status,
					userInfo
				} = res;

				if (status === 0) {
					throw new Error((res.msg))
				}

				console.log(JSON.stringify(userInfo, null, 2));
				return userInfo;
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

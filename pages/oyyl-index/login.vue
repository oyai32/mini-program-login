<template>
	<view class="app">
		<div class="imgDiv">
			<image :src="logo" mode="aspectFill"></image>
		</div>
		<button type="primary" @click="mpWxLogin">
			授权登录
		</button>
		<view class="mt20">单独的授权登录页<br />登陆后会跳到操作前的地址</view>
	</view>
</template>

<script>
	import {
		request
	} from '@/common/oyyl-js/request';
	import {
		msg
	} from '@/common/oyyl-js/util.js'

	import logo from '@/static/logo.png'
	export default {
		data() {
			return {
				logo
			}
		},
		onLoad() {},
		methods: {
			async mpWxLogin() {
				try {
					const userInfo = await this.getUserInfo();
					this.$store.dispatch('setUserData', userInfo);
					msg('登陆成功');

					setTimeout(() => {
						uni.navigateBack();
					}, 2000)
				} catch (e) {
					msg(e.msg);
				}
			},
			async getUserInfo() {
				const [loginErr, loginData] = await uni.login({
					provider: 'weixin'
				})
				const [err, userData] = await uni.getUserInfo();
				const res = await request('oyyl-user', 'loginByWeixin', {
					code: loginData.code,
					encryptedData: userData.encryptedData,
					iv: userData.iv
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

				return userInfo;
			}
		}
	}
</script>


<style scoped lang='scss'>
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

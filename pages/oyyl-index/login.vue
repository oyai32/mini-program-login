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
		login
	} from '@/common/oyyl-js/service.js';
	import {
		showToast
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
				const {
					code
				} = await wx.login();
				
				const {
					encryptedData,
					iv
				} = await wx.getUserInfo();
				console.log(iv,'iv')
				
				const userInfo = await login({
					code,
					encryptedData,
					iv
				});
				console.log(11111111,userInfo)
				this.$store.dispatch('setUserData', userInfo);
				showToast('登陆成功');

				setTimeout(() => {
					uni.navigateBack();
				}, 2000)
			},
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

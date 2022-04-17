import {
	request
} from '@/common/oyyl-js/request'
export default {
	computed: {
		userId() {
			return this.$store.getters.userId
		}
	},
	methods: {
		async mpWxLogin(userInfoData) {
			await this.mpWxGetUserInfo(userInfoData)
			this.$util.msg('登陆成功');
			setTimeout(() => {
				uni.navigateBack();
			}, 1000)
		},
		// 获取用户信息
		mpWxGetUserInfo(userInfoData) {
			return new Promise((resolve, reject) => {
				if (!userInfoData.detail.userInfo) {
					reject(new Error('未拿到用户信息'))
				}
				this.$util.throttle(async () => {
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
					if (res.status === 0) {
						this.$util.msg(res.msg);
						reject(new Error(res.msg))
					} else {
						resolve(res.userInfo)
					}
				})
			}).then(userInfo => {
				this.$store.dispatch('setUserData', userInfo);
				return userInfo
			})
		},
		async updateUserInfo() {
			// 获取用户信息
			let userInfo = await this.getUserInfo()
			// 此处一定要先从userInfo中获取对应的属性，直接...uerInfo传给云函数会少内容
			const {nickName,gender,avatarUrl}=userInfo
			const res = await request('oyyl-user', 'updateUserInfo', {
				id: this.userId,
				nickName,
				gender,
				avatarUrl
			}, {
				showLoading: true
			});
			if (res.status === 0) {
				this.$util.msg(res.msg);
			} else {
				this.$store.dispatch('setUserData', res.userInfo);
			}
		},
		getUserInfo() {
			return new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: "更新用户信息",
					success: (res) => {
						console.log(JSON.stringify(res))
						resolve(res.userInfo)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		}
	}
}

	import {
		request
	} from '@/common/oyyl-js/request';

/**
 * 登录拦截
 */
export function loginIntercept(callBack){
	const userInfo = uni.getStorageSync('userInfo');
	if(userInfo){
		callBack();
		return;
	}
	uni.navigateTo({
		url: '/pages/oyyl-index/login'
	});
}

/**
 * 更新用户信息
 * return 更新后的信息
 */
export async function updateUserInfo({id,nickName,gender,avatarUrl}){
	return request('oyyl-user', 'updateUserInfo', {
		id,
		nickName,
		gender,
		avatarUrl
	}, {
		showLoading: true
	});
}

/**
 * 登陆后返回用户信息
 */
export async function login({code,encryptedData,iv}){
	return request('oyyl-user', 'loginByWeixin', {
		code,
		encryptedData,
		iv
	}, {
		showLoading: true
	});
}
<template>
	<view style="padding:20px;">{{text}}</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		created() {
		},
		mounted() {
			this.text = '测试：该页面只有登录后才能查看'
		}
	}
</script>

<style>
</style>

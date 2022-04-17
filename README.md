## 特别说明
该项目为获取用户信息后通过云函数将数据插入数据库中的示例,供初学者学习使用。
若只需获取用户信息无需入库，可参考此文：[微信小程序登录获取用户信息](https://blog.csdn.net/sinat_29740819/article/details/124217160?spm=1001.2014.3001.5501)
> 暂未支持获取手机号 [相关文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html)

## 使用方法
1. mainifest.json 配置自己小程序的appId
2. 若不能直接识别到云服务器，则需手动将uniCloud下对应的云函数剪切到自己的云数据库目录下
3. 修改 common/wx-auth/index.js 里的 wxConfigMp，并上传所有云函数 
4. 使用db_init.json 初始化数据库 （创建user表）
> 使用阿里云和腾讯云都可以，直接复制云函数就行 （本例使用的是阿里云）

## 注意事项
+ 第一次使用需要关联云服务空间
+ 本地云函数测试成功后别忘了上传到云端（若上传替换无效，可以试试先删除云服务器上的函数）
+ 真机调试时别忘了打开手机右上角...的“开发调试”，方便查看报错信息
+ 真机调试时别忘了在小程序后台设置允许访问的域名
> 模拟器、预览、真机调试、体验版都是可以访问的，若有问题需检查自己各项配置是否正确

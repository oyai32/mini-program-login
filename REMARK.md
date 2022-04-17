## 使用方法

1、mainifest.json 配置自己小程序的appId

2、若不能直接识别到云服务器，则需手动将uniCloud下对应的云函数剪切到自己的云数据库目录下

3、修改 common/wx-auth/index.js 里的wxConfigMp，并上传所有云函数 

4、使用db_init.json 初始化数据库 （创建user表）

注：使用阿里云和腾讯云都可以，直接复制云函数就行 （本例使用的是阿里云）
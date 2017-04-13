## Cheat Sheet

1. 让编译的输出内容带有进度和颜色。  
	`$ webpack --progress --colors`
2. 监听模式。无变化的模块在编译后缓存在内存中，不会每次都重新编译。  
	`$ webpack --progress --colors --watch`
3. 利用 `webpack-dev-server` 启动一个 express 静态资源 Web 服务器，同时以监听模式自动运行。
	```shell
	# 安装
	$ npm install webpack-dev-server -g

	# 运行
	$ webpack-dev-server --progress --colors
	```
4. 打印错误详情  
	`$ webpack --display-error-details`
5. Webpack 中涉及路径配置最好使用绝对路径，建议通过 path.resolve(__dirname, "app/folder") 或 path.join(__dirname, "app", "folder") 的方式来配置，以兼容 Windows 环境。
6. 出现 npm install fails on Windows: "Error: EPERM: operation not permitted"   
	https://github.com/npm/npm/issues/10826
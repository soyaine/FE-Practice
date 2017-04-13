var webpack = require('webpack')

module.exports = {
	entry: './entry.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	},
	plugins: [
		// 给文件添加文件头的插件
		new webpack.BannerPlugin('This file is created by soyaine')
	]
}
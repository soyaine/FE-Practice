// == loader方式一
//require("!style-loader!css-loader!./style.css")

// == loader方式二
//上面这句等同于：把loader放到打包时使用
require("./style.css")
//webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'

// == loader方式三
// 在 webpack.config.js 文件中添加配置信息，之后只运行 webpack 命令，是相同的效果。
// 之中声明 entry 和 output 等等

document.write('It works.')
document.write(require('./module.js'))
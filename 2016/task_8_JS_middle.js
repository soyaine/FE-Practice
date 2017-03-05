/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    // 调用validate方法验证数据
    var aqiList = [];
    if (aqiList = validate()) {
        // 执行添加，向aqiData中增加一条数据
        aqiData[aqiList[0]] = aqiList[1];
    }

    return true;
}

/**
 * 验证数据是否满足要求
 * 返回值为数组 [城市名, 空气质量指数]
 */
function validate() {
    // 获取用户输入框
    var aqiCityInput = document.getElementById("aqi-city-input").value;
    var aqiValueInput = document.getElementById("aqi-value-input").value;

    // 去空格处理
    // 由于不仅仅需要去除字符串两端的空格，所以未采用trim方法
    // 空格包括 Tab, space, no-break space
    var aqiCityInputTrim = aqiCityInput.replace(/[\s\uFEFF\xA0]+/g, '');
    var aqiValueInputTrim = aqiValueInput.replace(/[\s\uFEFF\xA0]+/g, '');

    // 转换为数值型
    aqiValueInputTrim = parseInt(aqiValueInputTrim);

    // ==================
    // 验证输入的数据是否满足要求
    // ==================
    // 正则表达式匹配只有汉字和英文字符
    var validCity = /^[\u4e00-\u9fa5a-zA-Z]+$/.test(aqiCityInputTrim);
    // 正则表达式匹配整数
    var validValue = /-?\d+/.test(aqiValueInputTrim);

    // 判断是否通过验证
    if ( validCity && validValue){
        // 通过验证，返回true
        return [aqiCityInputTrim, aqiValueInputTrim];
    }else {
        // 未通过验证，显示错误信息
        var errorMsg = "";
        if(!validCity) errorMsg = errorMsg + "城市格式错误";
        if(!validValue) errorMsg = errorMsg + "空气质量格式错误";
        alert(errorMsg);
        return false;
    }
}

/**
 * 删除数据
 * 传入的参数是需要删除的城市名
 * 作为aqiData的属性名进行查找
 */
function delAqiData(city) {

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    // 初始化表格
    aqiTable.innerHTML = "<tr> <td>城市</td><td>空气质量</td><td>操作</td> </tr>";
    // 循环获取aqiData的数据，重新渲染表格
    for (var city in aqiData){
        // 获取属性及数据
        var value = aqiData[city];
        // 每项生成新的行
        var newTr = document.createElement("tr");
        newTr.innerHTML = "<td>" + city + "</td><td>" + value + "</td>" + "<td><button>删除</button></td>";
        aqiTable.appendChild(newTr);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 传入参数：当前点击的目标节点
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(node) {
    // do sth.
    /**
     * 这里是原始的方法，循环给每个按钮绑定事件之后的处理。
     * 改进：采用事件代理机制
     * @type {Node}
     *
    // 获取删除按钮的父节点：button 的父节点为 td，父父节点为 tr
    var delTr = node.parentNode.parentNode.firstChild;
    // 获取删除的城市名
    var delCity = delTr.innerText;
    delete aqiData[delCity];
    //delAqiData(delCity);
   // alert("已删除");
    renderAqiList();
     */

    /**
     * 采用事件代理，监听整个table
     * 发生点击后判断是否点击了删除按钮，
     * 是则删除数据，否则无操作
     */
    // 获取点击的元素的标签名，转为小写
    var targetTag = node.tagName.toLowerCase();
    // 判断是否点击了button按钮
    if (targetTag == "button"){
        // 获取当前行的城市名称
        var delCity = node.parentNode.parentNode.firstChild.innerText;
        // 删除aqiData对象中的相应属性
        delete aqiData[delCity];
        alert("已删除");
        // 重新渲染表格
        renderAqiList();
    }else return false;
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function () {
        addBtnHandle();
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        // 每次生成新的表格时，重新获取当前的按钮，并绑定事件
        // 改进：使用事件代理机制，见下方
        /**
        var aqiTable = document.getElementById("aqi-table");
        var delBtn = aqiTable.getElementsByTagName("button");
        if (delBtn){
            for(var i=0; i < delBtn.length; i++){
                delBtn[i].addEventListener("click", function(event) {
                    delBtnHandle(event.currentTarget);
                }, false);
            }
        }
         */
    };

    // 给输入框绑定事件，失去焦点时触发输入验证validate函数\
    var cityInput = document.getElementById("aqi-city-input");
    cityInput.addEventListener("blur", validate, false);
    cityInput.onblur = validate();

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.addEventListener("click", function(event) {
        delBtnHandle(event.target);
    }, false);
}

init();
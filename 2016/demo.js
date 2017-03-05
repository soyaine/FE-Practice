/**
 * 加法操作
 * @param {Number} a 第一个数
 * @param {Number} b 第二个数
 */
function add (a, b) {
  return a + b;
}

//获取节点
  var nNum1  = document.getElementById('num1'),
      nNum2  = document.getElementById('num2'),
      nResult= document.getElementById('result'),
      nBtn    = document.getElementById('btn');

  nBtn.addEventListener("click", onClickAdd, false);

  function onClickAdd(){
    var a = parseInt(nNum1.value), //获取第一个数字
      b = parseInt(nNum2.value), //获取第二个数字
      result;
  result = add(a,b);  //执行加法操作
  nResult.innerHTML = result;  //显示
}

var f = function g(){
    return 23;
};


if( "a" in window){
    var a = 1;
}
// alert(a);

var car = {
    color : "red",
    run : function(){alert("run")}
};

var array = [1, 6, 2];
var array1 = [
    163,
    "dsd",
    {color: "white"},
    [],
    true
];

var student = [
    {id: 1, score: 12},
    {
        id: 2,
        score: 25
    },
    {
        id: 3,
        score: 99
    }
];

var telephones = [111, 158, 458];


//=================微专业作业 基础篇======================
//=====================1.求随机数========================

/**
 * 获取 DOM 元素
 * rBtn 为页面中按钮，添加 click 事件绑定 putData() 函数
 * rNum 为显示随机数的位置
 */
var rBtn = document.getElementById("randomBtn");
var rNum = document.getElementById("randomNum");
rBtn.addEventListener("click", putData, false);

/**
 * random() 函数获取一个0-999的随机数
 * @returns {number}
 */
function random(){
    var randomNum = Math.random() * 1000;
    return Math.floor(randomNum);
}

/**
 * putData() 函数，将获取到的随机数显示到页面中
 */
function putData() {
    rNum.innerText = null;
    var number = random();
    rNum.innerText = number;
}

//=====================2. 解析 URL 查询参数========================
/**
 * 函数 parseQuery 解析 URL 字符串，返回对象的 JSON 字符串形式
 * @param query 需要处理的字符串
 */
function parseQuery(query) {
    var obj = new Object();
    // 去空格处理，正则匹配除去所有空格
    query = query.replace(/\s+/g,"");
    // 处理字符串，按 & 进行拆分，存入数组
    var queryArr = query.split("&");
    // 对数组中每一对参数进行处理，调用 parseArr 函数
    queryArr.forEach(parseArr);

    // 函数作用：解析数组中的字符串得到参数并存入对象
    function parseArr(para) {
        // 筛掉此数据为空，即&后无内容的情况
        if (para){
            // 处理数组中的单对参数，按 = 进行拆分，得到数组
            var paraArr = para.split("=");
            switch (paraArr.length) {
                // 当无参数值时
                case 1:
                    obj[paraArr[0]] = "";
                    break;
                // 当有参数值时
                case 2:
                    obj[paraArr[0]] = paraArr[1];
            }
        } else return JSON.stringify(obj);
    }
    // 将对象转换为字符串形式返回
    return JSON.stringify(obj);
}

// 运行此函数
var jerry = parseQuery("age=1&name=jerry");
var tom = parseQuery("name= tom &age=12&gender&");

// 将运行结果显示到页面中
var jSpan = document.getElementById("jQuery");
var tSpan = document.getElementById("tQuery");

data(jerry, jSpan);
data(tom, tSpan)

function data(data, ele) {
    ele.innerText = data;
}

//=====================3. 函数multiply用于计算多个数字的乘积========================
/**
 * 函数 multiply 对传入的数字进行乘积
 * @returns {number}
 */
function multiply() {
    // 初始化 multi 用于存放乘积结果
    var multi = 1;
    // 判断是否传入参数
    // 若参数有则进行乘积计算
    if (arguments.length){
        // 循环获取所有参数，进行乘积计算
        for (var i = 0; i < arguments.length; i++) {
            multi *= arguments[i];
        }
    } else {
        // 若无参数，则设置乘积值为0
        multi = 0;
    }
    // 处理完成，返回值
    return multi;
}

multiply(2, 3);

function Foo(){
    var i=0;
    return function(){
        document.write(i++);
    }
}
var f1=Foo(),
    f2=Foo();
f1();
f1();
f2();

//===================== 4. 构造函数Person用于构造人 ===================
/**
 * 构造函数Person用于构造人
 * @param name
 * @param age
 * @constructor
 */
function Person(name, age){
    this.name = name;
    this.age = age;
    this.introduce = function () {
        var intro = "I am " + this.name + ", I am " + this.age + " years old!";
        return intro;
    }
}

//===================== 5. 函数escapeHTML用于转义html字符串中的特殊字符(<>"&) ===================
/**
 * 函数 escapeHTML用于转义html字符串中的特殊字符(<>"&)
 * @param htmlStr
 * @returns {XML|string|void|*}
 */
function escapeHTML(htmlStr) {
    // 注意这里有个单引号双引号的问题。
    // 当输入的参数含有双引号时，外层用双引号会导致错误，因为双引号会自动配对，某些字符会被解析为变量
    htmlStr = htmlStr.replace(/[<>"&]/g, function (match) {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "&":
                return '&amp;';
        }
    });
    return htmlStr;
}




function checkChar() {

}

var ddf = new Object();
// ddf.selector = function (attribute, value) {
function selector(attribute, value) {
        var all = document.getElementsByTagName('*');
        for (var i = 0; i < all.length; i++) {
            if (all[i].getAttribute(attribute) == value) {
                return all[i];
            }
        }
}


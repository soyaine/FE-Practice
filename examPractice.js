/**
 * Created by songyuting on 2016/8/17.
 */
//
//// Bob和Alice有个约会，一大早Bob就从点(0,0)出发，前往约会地点(a,b)。
//// Bob没有一点方向感，因此他每次都随机的向上下左右四个方向走一步。
//// 简而言之，如果Bob当前在(x,y)，
//// 那么下一步他有可能到达(x+1,y), (x-1,y), (x,y+1), (x,y-1)。
//// 很显然，当他到达目的地的时候，已经很晚了，Alice早已离去。
//// 第二天，Alice质问Bob为什么放她鸽子，Bob说他昨天花了s步到达了约会地点。
//// Alice怀疑Bob是不是说谎了。你能否帮她验证一下？
//// 输入
//// 输入三个整数a,b,s (-109
//// 输出
//// 输出“Yes”，如果Bob可能用s步到达(a,b)；否则输出“No”，不需要输出引号。
//var line;
//while(line = read_line()){
//    line = line.split(' ');
//    print(parseInt(line[0]) + parseInt(line[1]));
//}
//
//var lineAdd=0;//输入行计数
//var inputArr=['5 5 11']; //输入两行
//
////模拟输入
//function read_line(){
//    var line= inputArr[lineAdd];
//    lineAdd++;
//    return line;
//}
//
////模拟输出
//function print(x){
//    console.log(x);
//}
//
//// http://oj.acmcoder.com/ExamNotice.html
//// http://exercise.acmcoder.com/online/online_judge_ques?ques_id=1530&konwledgeId=134


// 2016-10-14 sogou
var line;
var n = read_line();
var r = read_line();
var arr = [];
while(line = read_line()){
    line = line.trim();
    //print(parseInt(line[0]) + parseInt(line[1]));
    arr.push(+line);
}

getResult(arr, n, r);

/**
 *
 * @param arr
 * @param n
 * @param r
 */
function getResult(arr, n, r){
    while (r <= n){
        arr = mapArr(arr, n, r);
        r++;
    }
    //return arr[0];
    print(arr[0]);
}

/**
 * 按步长 r 映射长度为 n 的数组，返回映射后的数组
 * @param arr
 * @param n
 * @param r
 * @returns {Array}
 */
function mapArr(arr, n, r){
    var b = [];
    for ( var outer = 0; outer < n; outer++){
        var temp = [];
        // 取 r 个元素
        for (var i = outer; i < (outer + r); i++){
            var index = i % n;
            temp.push(arr[index]);
        }
        // 加入中位数
        b.push(MED(temp, r));
    }
    return b;
}

/**
 * 获取数组中位数
 * @param array 数组
 * @param length 数组长度
 * @returns 中位数
 * @constructor
 */
function MED(array, length) {
    array.sort(function(a, b){
        return a - b;
    });
    var index = Math.ceil( (length-1) / 2 );
    return array[index];
}

var arr = [1, 2, 4,  3, 5, 6, 7];
getResult(arr, 7, 5);


function init(arr, n, r){
    while (r <= n){
        arr = mapArr(arr, n, r);
        r++;
    }
    print(arr[0]);

    /**
     * 按步长 r 映射长度为 n 的数组，返回映射后的数组
     * @param arr
     * @param n
     * @param r
     * @returns {Array}
     */
    function mapArr(arr, n, r){
        var b = [];
        var mIndex = Math.ceil( (r-1) / 2 ); //中位数位置
        for ( var outer = 0; outer < n; outer++){
            var temp = [];
            // 取 r 个元素
            for (var i = outer; i < (outer + r); i++){
                var index = i % n;
                temp.push(arr[index]);
            }
            // 获取中位数
            temp.sort(function(a, b){
                return a - b;
            });
            b.push(temp[mIndex]);
        }
        return b;
    }
}


/**
 * 获取数组中位数
 * @param array 数组
 * @param index 中位数位置
 * @returns {*}
 * @constructor
 */
function MED(array, index) {
    array.sort(function(a, b){
        return a - b;
    });
    return array[index];
}




//NEW
var n = read_line();
var r = read_line();
var array = [];
var line;
while(line = read_line().trim(){
    array.push(+line);
}

init(array, n, r);

function init(arr, n, r){
    while (r <= n){
        arr = mapArr(arr, n, r);
        r++;
    }
    print(arr[0]);

    /**
     * 按步长 r 映射长度为 n 的数组，返回映射后的数组
     * @param arr
     * @param n
     * @param r
     * @returns {Array}
     */
    function mapArr(arr, n, r){
        var b = [];
        var mIndex = Math.ceil( (r-1) / 2 ); //中位数位置
        for ( var outer = 0; outer < n; outer++){
            var temp = [];
            // 取 r 个元素
            for (var i = outer; i < (outer + r); i++){
                var index = i % n;
                temp.push(arr[index]);
            }
            // 获取中位数
            temp.sort(function(a, b){
                return a - b;
            });
            b.push(temp[mIndex]);
        }
        return b;
    }
}

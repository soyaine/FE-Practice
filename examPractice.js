/**
 * Created by songyuting on 2016/8/17.
 */

// Bob和Alice有个约会，一大早Bob就从点(0,0)出发，前往约会地点(a,b)。
// Bob没有一点方向感，因此他每次都随机的向上下左右四个方向走一步。
// 简而言之，如果Bob当前在(x,y)，
// 那么下一步他有可能到达(x+1,y), (x-1,y), (x,y+1), (x,y-1)。
// 很显然，当他到达目的地的时候，已经很晚了，Alice早已离去。
// 第二天，Alice质问Bob为什么放她鸽子，Bob说他昨天花了s步到达了约会地点。
// Alice怀疑Bob是不是说谎了。你能否帮她验证一下？
// 输入
// 输入三个整数a,b,s (-109
// 输出
// 输出“Yes”，如果Bob可能用s步到达(a,b)；否则输出“No”，不需要输出引号。
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

// http://oj.acmcoder.com/ExamNotice.html
// http://exercise.acmcoder.com/online/online_judge_ques?ques_id=1530&konwledgeId=134


var line;
while(line = read_line()){
    line = line.trim();
    //print(parseInt(line[0]) + parseInt(line[1]));
}

function verify(id){
    if (id.length != 18){
        return "ERROR"
    }else {
        return id.substr(6, 6);
    }
}

var line;
while(line = read_line()){
    line = line.split(' ');
    print(compare(line[0], line[1]));
}

/**
 * 将字符串中的字母排序并去
 * @param str
 * @returns {string}
 */
function consertArray(str){
    str = str.split('');
    str.sort();
    for(var i = 0; i < str.length; ){
        if(str[i] == str[i+1]){
            str.splice(i, 1);
        }else {
            i++;
        }
    }
    return str.join('');
}

/**
 * 比较字符串并返回结果
 * @param str1
 * @param str2
 * @returns {*}
 */
function compare(str1, str2){
    str1 = consertArray(str1);
    str2 = consertArray(str2);
    if(str1 == str2){
        return "true";
    }else {
        return "false";
    }
}

var line;
while(line = read_line().trim()){
    print(getNext(line));
}

function getNext(num){
    // 加1，并转化为数组
    num = (++num).toString().split('');
    var len = num.length;
    var right = Math.ceil(len/2);
    // 以中间位置为对称轴
    // 从中间位置靠右的数字开始比较左右大小
    while( right < len ){
        var left = len - right - 1;
        if(num[left] != num[right]){
            if (num[left] < num[right]){
                ++num[left];
                break;
            }else break;
        }
        right++;
    }
    //构建对称数
    for( var i= 0; i < Math.floor(len/2); i++){
        num[len - i - 1] = num[i];
    }
    return num.join('');
}
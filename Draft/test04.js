process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = "";
var input_array = "";

process.stdin.on('data', function (data) {
    input += data;
});

process.stdin.on('end', function () {
    input_array = input.split("\n");
    var nLine = 0;
    var n = 0; // 初始值为0，表示没有输入

    while(nLine < input_array.length){
        var line = input_array[nLine++].trim();
        if(line === ''){
            continue;
        }
        n = line;
        console.log(getResult(n));
    }

});

// 判断结果
function getResult(num) {
    var result = 0;
    for (var i=1; i <= num; i++){
        var re = /[2~9]/;
        if( re.test(i.toString()) ){
            continue;
        } else result++;
    }
    return result;
}


var line;
while(line = read_line()){
    line = line.trim();
    if(line === ''){
        continue;
    }
    var n = parseInt(line);
    print(getResult(n));
}

function getLine(line) {
    var n = line.length;
    var result = 1;
    for ( var i=0; i < n; i++){
        result += Math.pow(2, i);
        var index = line.substr(i, 1);
        if ( index > 1 ) {

        } else if( index == 0 ){
            result -= Math.pow(2, i);
        }
    }
    return result;
}
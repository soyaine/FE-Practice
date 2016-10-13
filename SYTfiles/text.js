process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = "";
var input_array = "";

process.stdin.on('data', function (data) {
    input += data;
});

process.stdin.on('end', function () {
    input_array = input.split("\n");
    var nLine = 1;
    var n = input_array[0]; // 获取敏感词个数
    var arr = [];

    // 获取敏感词
    while(nLine <= n){
        var line = input_array[nLine++].trim();
        if(line === ''){
            continue;
        }
        arr.push(line);
    }

    // 获取文本
    var text = input_array[nLine].trim();
    console.log(getResult(arr, text));
});

// 和谐文本
function getResult1(arr, text) {
    for (var i=0; i<arr.length; i++){
        text.replace(arr[i], "*");
    }
    return text;
}


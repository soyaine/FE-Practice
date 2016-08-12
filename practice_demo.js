/**
 * Created by test on 2016/7/25.
 */
/**
 *  实验一下
 */
setTimeout(
    function(num){
        alert("hello");
        console.log("123");
    }, 5000);

setTimeout(
    function(num) {
        alert("jjjjj");
    }(), 5000
);
// 加上括弧，立即调用的函数表达式

function foo() {
    var timeDiv = document.getElementById("setTimeoutDiv");
    timeDiv.style.left = "0px";
    var divLeft = timeDiv.style.left;
    var divLeftNum = parseInt(divLeft) + 5;
    timeDiv.style.left = divLeftNum + "px";
}

//foo();

setTimeout (function(){
    var div = document.getElementById("setTimeoutDiv");
    //var divLeft = div.style.left;
    //div.style.left = "10px";
    var sheet = document.styleSheets[0];
    var rules = sheet.cssRules || sheet.rules;
    var rule = rules[0];
    var divLeftNum = parseInt(rule.style.left) + 5;
    rule.style.left = divLeftNum + "px";

    if (divLeftNum < 500){
        setTimeout(arguments.callee, 50);
    }
}, 50);
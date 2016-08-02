// 存储队列数据
var queueData = [];

/**
 *  随机模拟生成测试数据
 */
function randomBuildData() {
    var returnData = {};
    for (var i = 0; i < 60; i++){
        returnData[i] = Math.ceil(Math.random() * 100);
    }
    return returnData;
}

/**
 * 可视化数据的初始化
 */
function initQueue() {
    var queueView = document.getElementById("queue-view");
    for (var queue in queueData) {
        var queueCell = document.createElement("div");
        queueCell.className = "queue-cell";
        queueCell.style.height = queueData[queue].toString() + "px";
        queueCell.style.marginLeft = (queue * 13).toString() + "px";
        queueCell.id = queue;
        queueCell.title = queueData[queue];
        queueView.appendChild(queueCell);
    }
    var d = queueView.childNodes;
}

/**
 * 排序算法排列队列的值
 */
function bubbleSort() {
    // i j 为循环变量， exchange 标记此次循环是否出现过交换
    // n 为需要排序的队列的值的个数
    var i, j, exchange, n, r;
    // 获取label显示比较次数
    var comTime = document.getElementById("compare-time");
    var a = 0;
    n = 60;
    for(i = 0; i < n-1; i++) {
        exchange = false;
        for(j = n - 1; j > i; j--){
            var firstNode = document.getElementById(j-1);
            var nextNode = document.getElementById(j);
            firstNode.style.backgroundColor = "#00cccc";
            nextNode.style.backgroundColor = "#00cccc";
            var a = window.getComputedStyle(firstNode, ":after");
            //sleep(500);
            var firstValue = parseInt(firstNode.title);
            var nextValue = parseInt(nextNode.title);
            if( nextValue < firstValue){
                swapDiv(firstNode, nextNode);
                //sleep(500);
                //setTimeout(setTimeoutSwap(firstNode, nextNode), 5000);
                exchange = true;
            }
            a++;
            comTime.innerText = a;
            //sleep(10);
            firstNode.style.backgroundColor = "#004d4d";
            nextNode.style.backgroundColor = "#004d4d";
            a = window.getComputedStyle(firstNode, ":after");
            //sleep(500);
        }

        if(!exchange)
            return;
    }
}

/**
 * 交换两个div的函数
 */
function swapDiv(firstNode, nextNode) {
    var temp = firstNode.style.height;
    var tempTitle = firstNode.title;
    firstNode.style.height = nextNode.style.height;
    firstNode.title = nextNode.title;
    nextNode.style.height = temp;
    nextNode.title = tempTitle;
}

/**
 * setTimeout 专用的函数
 */
function setTimeoutSwap(firstNode, nextNode) {
    return function () {
        var temp = firstNode.style.height;
        firstNode.style.height = nextNode.style.height;
        nextNode.style.height = temp;
        var temp = firstNode.style.height;
        var tempTitle = firstNode.title;
        firstNode.style.height = nextNode.style.height;
        firstNode.title = nextNode.title;
        nextNode.style.height = temp;
        nextNode.title = tempTitle;
    }
}

/**
 * 休眠的函数
 */
function sleep(d) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        var time = new Date().getTime() - start;
       if(time > d) {
           return;
       }
    }

    //var t = Date.now();
    //var intime = Date.now() - t;
    //for(  ; intime < d; ) {
    //    var a ;
    //}

   // var tn = new Date().getTime();
   //for(; (new Date().getTime() - tn) <= d; ){
   //    var a ;
   //}
}

/**
 * 可视化呈现，每次操作两个条形柱
 * 参数：需高亮的div的ID，是否交换高度值
 */
function renderDiv(leftId, rightId, swap){
    var firstDiv = document.getElementById(leftId);
    var lastDiv = document.getElementById(rightId);
    // 高亮两个div
    firstDiv.style.backgroundColor = "#00cccc";
    lastDiv.style.backgroundColor = "#00cccc";
    // 移到中间位置
    firstDiv.style.transform = "translateX(50%)";
    lastDiv.style.transform = "translateX(-50%)";
    // 交换或不交换高度
    if(swap) {
        var temp = firstDiv.style.height;
        firstDiv.style.height = lastDiv.style.height;
        lastDiv.style.height = temp;

        var tempTitle = firstDiv.title;
        firstDiv.title = lastDiv.title;
        lastDiv.title = tempTitle;
    }
    // 移回原来的位置
    firstDiv.style.transform = "";
    lastDiv.style.transform = "";
    // 取消高亮
    firstDiv.style.backgroundColor = "#004d4d";
    lastDiv.style.backgroundColor = "#004d4d";
}

/**
 * 绑定开始按钮
 */
function initButton() {
    var startBtn = document.getElementById("start");
    startBtn.click = bubbleSort();
}

/**
 * 初始化函数
 */
function init() {
    queueData = randomBuildData();
    initQueue();
    initButton();
}

init();
renderDiv(21, 22, 1);
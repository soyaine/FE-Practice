var data = [];

/**
 *  随机模拟生成测试数据
 */
function randomBuildData(num) {
    var returnData = [];
    //var num = num;
    for (var i = 0; i < num; i++){
        returnData[i] = Math.ceil(Math.random() * 100);
    }
    return returnData;
}

/**
 * 可视化数据的初始化
 */
function initQueue(queueData) {
    var queueView = document.getElementById("queue-view");
    queueView.innerHTML = null;
    for (var queue in queueData) {
        var queueCell = document.createElement("div");
        queueCell.className = "queue-cell";
        queueCell.style.height = queueData[queue].toString() + "px";
        queueCell.style.marginLeft = (queue * 18).toString() + "px";
        queueCell.id = queue;
        queueCell.title = queueData[queue];
        queueView.appendChild(queueCell);
    }
    var d = queueView.childNodes;
    return queueData;
}

/**
 * 排序算法排列队列的值
 */
function bubbleSort(num, speed) {
    // i j 为循环变量， exchange 标记此次循环是否出现过交换
    // n 为需要排序的队列的值的个数
    var exchange, n, r;
    var swapQueue = [];
    // 获取label显示比较次数
    var comTime = document.getElementById("compare-time");
    var a = 0;
    n = num;
    for(var i = 0; i < n - 1; i++) {
        exchange = false;
        for(var j = n - 1; j > i; j--){
            var queue = [];
            queue.push(j-1);
            queue.push(j);

            swapQueue.push(queue);
        }

        //if(!exchange)
        //    return;
    }

    var at = Date.now();
    console.log(at);
    setTimeout(function(){
        var para = swapQueue.shift();
        renderDiv(para[0], para[1], speed);
        if(swapQueue.length > 0) {
            setTimeout(arguments.callee, speed);
        }else {
            //解锁所有按钮
            //lockNav(false);
            //解锁重置按钮
            var reset = document.getElementById("reset");
            reset.disabled = false;
            at = parseInt(Date.now()) - at;
            console.log(at);
        }
    }, speed);
}

/**
 * 可视化呈现，每次操作两个条形柱
 * 参数：需高亮的div的ID，是否交换高度值
 */
function renderDiv(leftId, rightId, speed){
    var firstDiv = document.getElementById(leftId);
    var lastDiv = document.getElementById(rightId);

    firstDiv.classList.add("on");
    lastDiv.classList.add("on");

    setTimeout(function(){
        if(parseInt(firstDiv.title) > parseInt(lastDiv.title)) {
            var temp = firstDiv.style.height;
            firstDiv.style.height = lastDiv.style.height;
            lastDiv.style.height = temp;

            var tempTitle = firstDiv.title;
            firstDiv.title = lastDiv.title;
            lastDiv.title = tempTitle;
        }
        setTimeout(function(){
            firstDiv.classList.remove("on");
            lastDiv.classList.remove("on");
           },speed);
    }, speed);
}

/**
 * 选择排序的可视化呈现
 * @param num
 * @param speed
 */
function selectSort(num, speed) {
    // i j 为循环变量， exchange 标记此次循环是否出现过交换
    // n 为需要排序的队列的值的个数
    var exchange, n, r;
    var passQueue = [];
    // 获取label显示比较次数
    var comTime = document.getElementById("compare-time");
    n = num;
    // 获取循环的路径，数组结构为
    // passQueue[ [0, [quque1,queue2...] ], [ 1, [quque1,queue2...] ] ...]
    // passQueue 整体的
    // oQueue 外循环
    // queue 内循环
    for(var outer = 0; outer < n - 1; ++outer) {
        exchange = false;
        var oQueue = [outer];
        var queue = [];
        for(var inner = outer + 1; inner < n; ++inner){
            queue.push(inner);
        }
        oQueue.push(queue);
        passQueue.push(oQueue);
        //if(!exchange)
        //    return;
    }

    setTimeout(function(){
        var para = passQueue.shift();
        // 传递的参数为每次外循环的下标遍历值
        renderSelect(para[0], para[1], speed);
        if(passQueue.length > 0) {
            setTimeout(arguments.callee, speed);
        }else {
            //解锁所有按钮
            //lockNav(false);
            //解锁重置按钮
            var reset = document.getElementById("reset");
            reset.disabled = false;
        }
    }, speed);
}

/**
 * 提供外层循环的 selected 值，及内层循环数组
 * @param out
 * @param inQueue
 */
function getMin(out, inQueue){
    var outerId = out;
    var innerQueue = inQueue;
    var outerDiv = document.getElementById(outerId);
    var minId = outerId;

    var timerQueue = [];
    // 选中外层循环主值
    timerQueue.push([outerDiv, "select", 1]);

    while(innerQueue.length > 0){
        // 将要比较的数存入数列
        var innerId = innerQueue.shift();

        var minDiv = document.getElementById(minId);
        var innerDiv = document.getElementById(innerId);

        timerQueue.push([innerDiv, "on", 1]);

        if(parseInt(minDiv.title) > parseInt(innerDiv.title)){
            // 修改最小值
            timerQueue.push([minDiv, "min", 0]);
            timerQueue.push([minDiv, "on", 0]);

            minId = innerId;

            minDiv = document.getElementById(minId);
            timerQueue.push([minDiv, "min", 1]);

        }else {
            timerQueue.push([innerDiv, "on", 0]);
        }

        //return timerQueue;
    }

    // 交换
    timerQueue.push([minDiv, "", 1]);
    // 去除最小值标识
    timerQueue.push([minDiv, "min", 0]);
    timerQueue.push([minDiv, "on", 0]);
    // 已排序标识
    timerQueue.push([outerDiv, "sort", 1]);
    // 去除选中值标识
    timerQueue.push([outerDiv, "select", 0]);
    timerQueue.push([outerDiv, "min", 0]);
}

function renderSelectionDiv(div, state, on){
    if(on == 1){
        if (state == ""){
            //    交换
            swap(div);
        }else{
            div.classList.add(state);
        }
    }else {
        div.classList.remove(state);
    }
}

function renderSelect(outer, inner, speed){
    var outerId = outer;
    var innerQueue = inner;
    var outerDiv = document.getElementById(outerId);
    var min = outerId;
    var minId = min;

    var timerQueue = [];
    //outerDiv.classList.add("select");
    timerQueue.push([outerDiv, "select", 1]);

    while(innerQueue.length > 0){
        // 将要比较的数存入数列
        var innerId = innerQueue.shift();

        var minDiv = document.getElementById(minId);
        var innerDiv = document.getElementById(innerId);

        timerQueue.push([innerDiv, "on", 1]);

        if(parseInt(minDiv.title) > parseInt(innerDiv.title)){
            // 修改最小值
            timerQueue.push([minDiv, "min", 0]);
            timerQueue.push([minDiv, "on", 0]);

            minId = innerId;

            minDiv = document.getElementById(minId);
            timerQueue.push([minDiv, "min", 1]);

        }else {
            timerQueue.push([innerDiv, "on", 0]);
        }

        //return timerQueue;
    }

    // 交换
    timerQueue.push([minDiv, "", 1]);
    // 去除最小值标识
    timerQueue.push([minDiv, "min", 0]);
    timerQueue.push([minDiv, "on", 0]);
    // 已排序标识
    timerQueue.push([outerDiv, "sort", 1]);
    // 去除选中值标识
    timerQueue.push([outerDiv, "select", 0]);
    timerQueue.push([outerDiv, "min", 0]);

    // 寻找最小值
    //setTimeout(function(){
    //    var innerId = innerQueue.shift();
    //    min = findMin(innerId, outerId);
    //    if (innerQueue.length > 0){
    //        console.log(timerQueue);
    //        setTimeout(arguments.callee, speed);
    //    }
    //},speed);

    // 运行页面渲染遍历元素
    while (timerQueue.length > 0){
        var renderArr = timerQueue.shift();
        render(renderArr[0], renderArr[1], renderArr[2]);
    }

    //setTimeout(function(){
    //    var renderArr = timerQueue.shift();
    //    render(renderArr[0], renderArr[1], renderArr[2]);
    //    if (timerQueue.length > 0){
    //        //console.log(renderArr[0]);
    //        setTimeout(arguments.callee, speed);
    //    }
    //},speed);

    function render(div, state, on){
        if(on == 1){
            if (state == ""){
            //    交换
                swap(div);
            }else{
                div.classList.add(state);
            }
        }else {
            div.classList.remove(state);
        }
    }

    function swap(min){
        var minDiv = min;

        var temp = outerDiv.style.height;
        outerDiv.style.height = minDiv.style.height;
        minDiv.style.height = temp;

        var tempTitle = outerDiv.title;
        outerDiv.title = minDiv.title;
        minDiv.title = tempTitle;

        //
        //
        //
        //minDiv.classList.remove("min");
        //minDiv.classList.remove("on");
        //
        //setTimeout(function(){
        //    // 标识已排序
        //    outerDiv.classList.remove("select");
        //    outerDiv.classList.remove("min");
        //    outerDiv.classList.add("sort");
        //}, speed);

        return true;
    }



    // 寻找最小值函数
    function findMin(innerId, _min){
        var minId = _min;
        var minDiv = document.getElementById(minId);
        var innerDiv = document.getElementById(innerId);

        setTimeout(function(){
            innerDiv.classList.add("on"); // 选定被比较值
        }, speed);

        if(parseInt(minDiv.title) > parseInt(innerDiv.title)){
            // 修改最小值
            setTimeout(function(){
                minDiv.classList.remove("min");
                minDiv.classList.remove("on");
            }, speed);

            minId = innerId;

            setTimeout(function(){
                minDiv = document.getElementById(minId);
                minDiv.classList.add("min");
            }, speed);
        }else {
            setTimeout(function(){
                innerDiv.classList.remove("on");
            }, speed);
        }

        return minId;
    }







    // 交换
    function swapMin(minId){
        var minDiv = document.getElementById(minId);

        if(minId != outerId){
            setTimeout(function () {
                var temp = outerDiv.style.height;
                outerDiv.style.height = minDiv.style.height;
                minDiv.style.height = temp;

                var tempTitle = outerDiv.title;
                outerDiv.title = minDiv.title;
                minDiv.title = tempTitle;
            }, speed);

            setTimeout(function () {
                // 选定值与最小值交换
                minDiv.classList.remove("min");
                minDiv.classList.remove("on");
            }, speed);
        }

        setTimeout(function(){
            // 标识已排序
            outerDiv.classList.remove("select");
            outerDiv.classList.remove("min");
            outerDiv.classList.add("sort");
        }, speed);
    }
}

/**
 * 图例操作
 * @param type 排序名称， 格式为".xxxxxSort"
 */
function legend(type){
    var legend = document.getElementById("legend").querySelectorAll(".legend-cell");
    if(legend){
        for (var i = 0; i<legend.length; i++){
            legend[i].style.display = "none";
        }
    }

    if(type){
        legend = document.getElementById("legend").querySelectorAll(type);
        for (var i = 0; i<legend.length; i++){
            legend[i].style.display = "block";
        }
    }
}

/**
 * 绑定开始按钮
 */
function init() {

    // 清除图例
    //legend("");

    var dataSpan = document.getElementById("data-range-span");
    var dataRange = document.getElementById("data-range");
    var speedSpan = document.getElementById("speed-range-span");
    var speedRange = document.getElementById("speed-range");
    var startBubbleBtn = document.getElementById("startBubbleSort");
    var startSelectBtn = document.getElementById("startSelectionSort");
    var resetBtn = document.getElementById("reset");


    data = initQueue(randomBuildData(parseInt(dataRange.value)));

    // 实时显示数据数区域
    dataRange.addEventListener('change', function(){
        dataSpan.innerText = dataRange.value;
        data = initQueue(randomBuildData(dataRange.value));
    }, false);

    // 速度
    speedRange.addEventListener('change', function(){
        speedSpan.innerText = speedRange.value;
        //initQueue(randomBuildData(speedRange.value));
    }, false);

    // 开始冒泡排序按钮
    startBubbleBtn.addEventListener('click', function(){
        //var dataNum = document.getElementById("queue-input").value;
        //rangeInput.childNodes.disabled = true;
        lockNav(true);
        legend(".bubbleSort");
        bubbleSort(dataRange.value, speedRange.value);
    }, false);

    // 开始选择排序按钮
    startSelectBtn.addEventListener('click', function(){
        lockNav(true);
        legend(".selectSort");
        //selectSort(dataRange.value, speedRange.value);
        _new_selectSort(data, speedRange.value);
    }, false);


    // 重置按钮
    resetBtn.addEventListener('click', function(){
        // 获取生成的值的个数
        //var dataNum = document.getElementById("queue-input").value;
        data = initQueue(randomBuildData(dataRange.value));
        lockNav(false);
    }, false);
}

/**
 * 锁定及解锁操作按钮区
 * 传入Boolean值 true:lock，false: unlock
 */
function lockNav(lock){
    var nav = document.getElementById("nav").childNodes;
    for(var n in nav) {
        //if(nav[n].hasOwnProperty(disabled)){
            nav[n].disabled = lock;
        //}
    }
}

/**
 * 解锁重置按钮
 */
function unlockReset(){
    //解锁重置按钮
    var reset = document.getElementById("reset");
    reset.disabled = false;
}

/**
 * 初始化函数
 */
//function init() {
//    initQueue(randomBuildData(30));
//    initButton();
//}

init();
//renderDiv(21, 22, 1);



//function qID(){
//    var id;
//    do {
//        id = Math.floor(Math.random() * 1E9);
//    } while (id in q_ids);
//    return id;
//}
//
//function queue(cb){
//    var qid = qID();
//
//    q_ids[qid] = requestAnimationFrame(function(){
//        delete q_ids[qid];
//        cb.apply(publicAPI, arugments);
//    });
//
//    return qid;
//}
//
//function queueAfter(cb) {
//    var qid;
//
//    qid = queue(function(){
//        q_ids[qid] = requestAnimationFrame(function(){
//            delete q_ids[qid];
//            cb.apply(publicAPI, arugments);
//        });
//    });
//
//    return qid;
//}
//
//id1 = aFrame.queue(function(){
//    text = document.createTextNode("##");
//    body.appendChild(text);
//});













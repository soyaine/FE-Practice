/**
 * 选择排序的可视化呈现
 * @param data
 * @param speed
 * 
 * 目的，得出排序所涉及到的所有数字的先后顺序
 */
function _new_selectSort(data, speed) {
    // data 为需要排序的数组

    var passQueue = getPassQueue(data);

    setTimeout(function(){
    //while (passQueue.length > 0) {

        var para = passQueue.shift();
        // 传递的参数为每次外循环的下标遍历值
        renderSelectionDiv(para[0], para[1], para[2], para[3]);
        if (passQueue.length > 0) {
            setTimeout(arguments.callee, speed);
        } else {
            //解锁所有按钮
            //lockNav(false);
            //解锁重置按钮
            var reset = document.getElementById("reset");
            reset.disabled = false;
        }

    //}
    }, speed);
}

/**
 * 获取排序循环遍历的值
 * @param data
 * @returns {Array}
 */
function getPassQueue(data){
    var n = data.length;
    var timer = [];
    
    for(var outer = 0; outer < n - 1; ++outer) {
        var oQueue = [outer];
        var queue = [];
        for(var inner = outer + 1; inner < n; ++inner){
            queue.push(inner);
        }
        timer = getMin(outer, queue, timer);
    }
    // 最后一次循环的最后一个值
    timer.push([n-1, n-1, "sort", 1]);
    return timer;
}

/**
 * 提供外层循环的 selected 值，及内层循环数组
 * @param out
 * @param inQueue
 * @param timerQ
 */
function getMin(out, inQueue, timerQ){
    var outerId = out;
    var innerQueue = inQueue;
    var outerDiv = data[outerId];
    var minId = outerId;

    var timerQueue = timerQ;
    // 选中外层循环主值
    timerQueue.push([outerId, outerId, "select", 1]);

    while(innerQueue.length > 0){
        // 将需要比较的数存入数列
        var innerId = innerQueue.shift();

        var minDiv = data[minId];
        var innerDiv = data[innerId];

        timerQueue.push([outerId, innerId, "on", 1]);

        if(minDiv > innerDiv){
            // 修改最小值
            timerQueue.push([outerId, minId, "min", 0]);
            timerQueue.push([outerId, minId, "on", 0]);

            minId = innerId;

            timerQueue.push([outerId, minId, "min", 1]);

        }else {
            timerQueue.push([outerId, innerId, "on", 0]);
        }
    }

    // 交换
    timerQueue.push([outerId, minId, "", 1]);
    swapData(outerId, minId);
    // 去除最小值标识
    timerQueue.push([outerId, minId, "min", 0]);
    timerQueue.push([outerId, minId, "on", 0]);
    // 已排序标识
    timerQueue.push([outerId, outerId, "sort", 1]);
    // 去除选中值标识
    timerQueue.push([outerId, outerId, "select", 0]);
    timerQueue.push([outerId, outerId, "min", 0]);
    
    return timerQueue;
}

/**
 * 渲染每一步
 * @param main 外循环的主数
 * @param div 被比较的用于操作的 div
 * @param state 操作涉及的样式名称
 * @param on 添加或去除样式、
 */
function renderSelectionDiv(main, div, state, on){
    var onDiv = document.getElementById(div.toString());
    if(on == 1){
        if (state == ""){
            //    交换
            var outerDiv = document.getElementById(main.toString());
            swap(outerDiv, onDiv);
        }else{
            onDiv.classList.add(state);
        }
    }else {
        onDiv.classList.remove(state);
    }
}

/**
 * 交换 data 中主数和此次循环所得最小值
 * @param main
 * @param min
 */
function swapData(main, min) {
    var temp = data[main];
    data[main] = data[min];
    data[min] = temp;
}

function swap(main, min) {
    var outerDiv = main;
    var minDiv = min;

    var temp = outerDiv.style.height;
    outerDiv.style.height = minDiv.style.height;
    minDiv.style.height = temp;

    var tempTitle = outerDiv.title;
    outerDiv.title = minDiv.title;
    minDiv.title = tempTitle;
}




//// ********废弃的思路*********
//function renderSelect(outer, inner, speed){
//    var outerId = outer;
//    var innerQueue = inner;
//    var outerDiv = data[outerId];
//    var min = outerId;
//    var minId = min;
//
//    var timerQueue = [];
//    //outerDiv.classList.add("select");
//    timerQueue.push([outerDiv, "select", 1]);
//
//    while(innerQueue.length > 0){
//        // 将要比较的数存入数列
//        var innerId = innerQueue.shift();
//
//        var minDiv = data[minId];
//        var innerDiv = data[innerId];
//
//        timerQueue.push([innerDiv, "on", 1]);
//
//        if(parseInt(minDiv.title) > parseInt(innerDiv.title)){
//            // 修改最小值
//            timerQueue.push([minDiv, "min", 0]);
//            timerQueue.push([minDiv, "on", 0]);
//
//            minId = innerId;
//
//            minDiv = data[minId];
//            timerQueue.push([minDiv, "min", 1]);
//
//        }else {
//            timerQueue.push([innerDiv, "on", 0]);
//        }
//
//        //return timerQueue;
//    }
//
//    // 交换
//    timerQueue.push([minDiv, "", 1]);
//    // 去除最小值标识
//    timerQueue.push([minDiv, "min", 0]);
//    timerQueue.push([minDiv, "on", 0]);
//    // 已排序标识
//    timerQueue.push([outerDiv, "sort", 1]);
//    // 去除选中值标识
//    timerQueue.push([outerDiv, "select", 0]);
//    timerQueue.push([outerDiv, "min", 0]);
//
//    // 寻找最小值
//    //setTimeout(function(){
//    //    var innerId = innerQueue.shift();
//    //    min = findMin(innerId, outerId);
//    //    if (innerQueue.length > 0){
//    //        console.log(timerQueue);
//    //        setTimeout(arguments.callee, speed);
//    //    }
//    //},speed);
//
//    // 运行页面渲染遍历元素
//    while (timerQueue.length > 0){
//        var renderArr = timerQueue.shift();
//        render(renderArr[0], renderArr[1], renderArr[2]);
//    }
//
//    //setTimeout(function(){
//    //    var renderArr = timerQueue.shift();
//    //    render(renderArr[0], renderArr[1], renderArr[2]);
//    //    if (timerQueue.length > 0){
//    //        //console.log(renderArr[0]);
//    //        setTimeout(arguments.callee, speed);
//    //    }
//    //},speed);
//
//    function render(div, state, on){
//        if(on == 1){
//            if (state == ""){
//            //    交换
//                swap(div);
//            }else{
//                div.classList.add(state);
//            }
//        }else {
//            div.classList.remove(state);
//        }
//    }
//
//    function swap(min){
//        var minDiv = min;
//
//        var temp = outerDiv.style.height;
//        outerDiv.style.height = minDiv.style.height;
//        minDiv.style.height = temp;
//
//        var tempTitle = outerDiv.title;
//        outerDiv.title = minDiv.title;
//        minDiv.title = tempTitle;
//
//        //
//        //
//        //
//        //minDiv.classList.remove("min");
//        //minDiv.classList.remove("on");
//        //
//        //setTimeout(function(){
//        //    // 标识已排序
//        //    outerDiv.classList.remove("select");
//        //    outerDiv.classList.remove("min");
//        //    outerDiv.classList.add("sort");
//        //}, speed);
//
//        return true;
//    }
//
//
//
//    // 寻找最小值函数
//    function findMin(innerId, _min){
//        var minId = _min;
//        var minDiv = data[minId];
//        var innerDiv = data[innerId];
//
//        setTimeout(function(){
//            innerDiv.classList.add("on"); // 选定被比较值
//        }, speed);
//
//        if(parseInt(minDiv.title) > parseInt(innerDiv.title)){
//            // 修改最小值
//            setTimeout(function(){
//                minDiv.classList.remove("min");
//                minDiv.classList.remove("on");
//            }, speed);
//
//            minId = innerId;
//
//            setTimeout(function(){
//                minDiv = data[minId];
//                minDiv.classList.add("min");
//            }, speed);
//        }else {
//            setTimeout(function(){
//                innerDiv.classList.remove("on");
//            }, speed);
//        }
//
//        return minId;
//    }
//
//    // 交换
//    function swapMin(minId){
//        var minDiv = document.getElementById(minId);
//
//        if(minId != outerId){
//            setTimeout(function () {
//                var temp = outerDiv.style.height;
//                outerDiv.style.height = minDiv.style.height;
//                minDiv.style.height = temp;
//
//                var tempTitle = outerDiv.title;
//                outerDiv.title = minDiv.title;
//                minDiv.title = tempTitle;
//            }, speed);
//
//            setTimeout(function () {
//                // 选定值与最小值交换
//                minDiv.classList.remove("min");
//                minDiv.classList.remove("on");
//            }, speed);
//        }
//
//        setTimeout(function(){
//            // 标识已排序
//            outerDiv.classList.remove("select");
//            outerDiv.classList.remove("min");
//            outerDiv.classList.add("sort");
//        }, speed);
//    }
//}
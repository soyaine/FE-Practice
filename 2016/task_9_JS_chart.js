/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 95; i++) { // 92为将要生成的数据个数，即从2016-01-01往后92天
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500),
};
// 用于渲染图表的数据

var chartData = {};
// 记录当前页面的表单选项

var pageState = {
    // 原始数据为 -1 调试时改为北京
    //nowSelectCity: -1,
    nowSelectCity: "北京",
    nowGraTime: "day",
};
/**
 * 渲染图表
 */
function renderChart() {
    // 获取aqiChart并移除其所有子节点，以清除原图表
    var aqiChart = document.getElementById("aqi-chart-wrap");
    while (aqiChart.firstChild) {
        aqiChart.removeChild(aqiChart.firstChild);
    }
    // i 值为
    var i = 1;
    // 循环获取 chartData 中的属性
    for (var xData in chartData.data) {
        // 获取空气质量指数，为柱状图的Y值
        var yData = chartData.data[xData];
        // 获取矩形宽度
        var width = chartData.width;
        // 创建单位矩形
        var aqiCell = document.createElement("div");
        // 设置 class
        aqiCell.className = "aqi-cell";
        // 设置宽度和高度
        aqiCell.style.width = width.toString() + "px";
        aqiCell.style.height = yData.toString() + "px";
        // 设置间距，定位为 absolute ，故需要加上左侧已有元素的宽度，矩形的间距为2px
        aqiCell.style.marginLeft = ((width + 2) * i++).toString() + "px";
        // 设置标签的title 为X值和Y值，日/周/月 空气质量指数
        aqiCell.title = xData + "：" + yData;
        // 设置颜色，根据不同的y值来设定颜色，越大越浅
        var color = "#1D3940";
        switch (true){
            case (yData >= 0 && yData < 100):
                color = "#004d4d";
                break;
            case  (yData >= 100 && yData < 200):
                color = "#006666";
                break;
                color = "#009999";
            case  (yData >=200 && yData < 300):
                break;
            default:
                color = "#00cccc";
        }
        aqiCell.style.backgroundColor = color;
        // 将元素加入文档流
        aqiChart.appendChild(aqiCell);
    }
}

/**
 * 根据当前页面状态进行数据处理的函数
 */
function renderChartData() {
    //delete chartData.data;
    chartData["data"] = {};
    // 读取城市选项
    var nowCityData = aqiSourceData[pageState.nowSelectCity];
    // 读取粒度选项
    switch(pageState.nowGraTime) {
        // 选择按天显示的处理
        case "day":
            chartData["width"] = 5;
            chartData["data"] = nowCityData;
            break;
        // 选择按周显示的处理
        case "week":
            chartData["width"] = 20;
            // 调用周处理函数
            chartData.data = getWeekData(nowCityData);
            break;
        // 选择按月显示的处理
        case "month":
            chartData["width"] = 60;
            chartData.data = getMonthData(nowCityData);
            break;
    }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 * 若选项发生变化，则生成相应数据，重新渲染图表
 */
function graTimeChange(targetNode) {
    // 确定是否选项发生了变化
    var graTime = targetNode.value;
    // 判断条件：目标事件元素不是input，所选目标的值与当前标记的表单选项相同，此时不作处理
    if (targetNode.tagName.toLowerCase() != "input" || graTime == pageState.nowGraTime){
        return false;
    }
    // 设置当前页面表单选项标记
    pageState.nowGraTime = graTime;
    // 设置对应数据
    renderChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 获取按周排列的数据的处理函数
 */
function  getWeekData(data) {
    var weekData = {};
    var dat = new Date("2016-01-01");
    var dateStr = getDateStr(dat);
    // dat循环遍历所有日期，以7天为一组
    while (data[dateStr]) {
        var sum, count, firstDate, lastDate;
        dateStr = getDateStr(dat);
        firstDate = dateStr;
        sum = 0;
        count = 0;
        for(var i = 0; i < 7; i++){
            // 初始化每周的数据
            dateStr = getDateStr(dat);
            sum = (sum + data[dateStr]);
            count++;
            // dat循环7次，获取一周的数据
            lastDate = getDateStr(dat);
            var weekStr = firstDate + "~" + lastDate + "（共 " + count + " 天的均值）";
            dat.setDate(dat.getDate() + 1);
            dateStr = getDateStr(dat);
            if(data[dateStr] == null) {
                break;
            }
        }
        weekData[weekStr] = sum/count;
    }
    return weekData;
}

/**
 * 获取按月排列的数据处理
 */
function getMonthData(data) {
    var monthData = {};
    var dat = new Date("2016-01-01");
    var dateStr = getDateStr(dat);
    // dat循环遍历所有日期，以一个月为一组
    while (data[dateStr]) {
        // sum用于求和，count计数（每月有多少天），firstDate(Date)此月第一天，lastDate(Date)此月最后一天
        var sum, count, monthDay;
        // 设置每月循环的起点和终点
        var firstDate = new Date(getDateStr(dat));
        var lastDate = new Date(getDateStr(dat));
        var nowMonth = firstDate.getMonth();
        lastDate.setMonth(++nowMonth);
        sum = 0;
        count = 0;
        while (dat < lastDate) {
            dateStr = getDateStr(dat);
            sum = sum + data[dateStr];
            count++;
            var monthStr = getDateStr(firstDate) + "~" + dateStr + "（共" + count + "天的均值）";
            // 日期的天数递增
            dat.setDate( (dat.getDate()) +1);
            dateStr = getDateStr(dat);
            if (data[dateStr] == null) break;
        }
        monthData[monthStr] = sum/count;
    }
    return monthData;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    var newCity = city;
    if (newCity == pageState.nowSelectCity) return;
    // 设置对应数据
    pageState.nowSelectCity = newCity;
    renderChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formGraTime = document.getElementById("form-gra-time");
    formGraTime.addEventListener("click", function(e) {
        graTimeChange(e.target);
    }, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var selectCity = document.getElementById("city-select");
    for (var city in aqiSourceData) {
        var optionCity = document.createElement("option");
        optionCity.id = city;
        optionCity.innerText = city;
        selectCity.appendChild(optionCity);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    selectCity.addEventListener("change", function(e) {
        // 获取选中的选项
        var selectedCity = selectCity.options[selectCity.selectedIndex];
        // 获取选项的id值，对应为相应城市
        citySelectChange(selectedCity.id);
    }, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    renderChartData();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();
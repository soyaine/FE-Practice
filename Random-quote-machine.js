function getRandomColor(){
    var styleEle = document.getElementById("colorStyle");
    var newColor = Math.floor( (Math.random() * 360) );
    styleEle.innerHTML = styleEle.innerHTML.replace(/hsl\(\d+/g, "hsl("+ newColor );//直接正则替换 CSS 中的颜色
}

function getRandomQuote(){
    //var songJSON = https://github.com/jackeyGao/chinese-poetry/blob/master/json/poet.song.100000.json;
}

function getSong(){

}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'poet.song.100000.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function init(){
    //getSong();
    getRandomColor();
    getRandomQuote();
    var nextBtn = document.getElementById("quote-next");
    nextBtn.addEventListener('click', getRandomColor, false);
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        var quoteContent = document.getElementById("quote-content");
        quoteContent.innerText = actual_JSON[0].paragraphs[0];
        alert(actual_JSON);
    });
}

init();
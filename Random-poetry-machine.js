var songs;

function getRandomColor() {
    var styleEle = document.getElementById("colorStyle"),
		  newColor = Math.floor((Math.random() * 360));
    styleEle.innerHTML = styleEle.innerHTML.replace(/hsl\(\d+/g, "hsl(" + newColor);//直接正则替换 CSS 中的颜色
}

function getRandomQuote() {
    //var songJSON = https://github.com/jackeyGao/chinese-poetry/blob/master/json/poet.song.100000.json;
}

function getRandomSong(song) {
    if (song) {
        var length = song.length;
        var randomSong = song[Math.floor((Math.random() * length))];

        //// for poertySongs.json
        //if(randomSong.hasOwnProperty("paragraphs")){
        //    var quoteContent = document.getElementById("quote-content");
        //    var randomLine = randomSong.paragraphs[Math.floor( (Math.random() * randomSong.paragraphs.length) )];
        //    // 窄屏幕将诗句换行
        //    var viewHeight = quoteContent.offsetParent.clientHeight;
        //    var viewWidth = quoteContent.offsetParent.clientWidth;
        //    var width = document.body.clientWidth;
        //    var height = document.body.clientHeight;
        //    if( (viewWidth < 1140 && viewWidth/viewHeight > 1) || (viewHeight < 670 && viewWidth/viewHeight < 1) ){
        //        randomLine = randomLine.replace(/，/g, "，\n");
        //    }
        //    quoteContent.innerText = randomLine;
        //    quoteContent.attributes[2].value = randomSong.author;
        //}

        // for TangPoetryCut.json
        var quoteContent = document.getElementById("quote-content");
        var randomLine = randomSong["detail_text"];
        randomLine = randomLine.replace(/。/, "。\n");
        // 窄屏幕将诗句换行
        var viewHeight = quoteContent.offsetParent.clientHeight;
        var viewWidth = quoteContent.offsetParent.clientWidth;
        if( (viewWidth < 700 && viewWidth/viewHeight > 1) || (viewHeight < 670 && viewWidth / viewHeight < 1) ) {
            randomLine = randomLine.replace(/，/g, "，\n");
        }
        quoteContent.innerText = randomLine;
        quoteContent.attributes[2].value = randomSong["detail_author"][0];
        var quoteTrans = document.getElementById("quote-trans");
        quoteTrans.innerText = randomSong["detail_translate_text"].join("\n");
    }
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    //xobj.open('GET', 'poetSongs.json', true); //繁体诗
    xobj.open('GET', 'TangPoetry-unicode.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            //return xobj.responseText;
        }
    };
    xobj.send(null);
}

function loadSongs() {
    return  loadJSON(function(response) {
        songs = JSON.parse(response);
        return songs;
    });
}

function init() {
    //getSong();
    var song = loadSongs();
    getRandomColor();
    getRandomSong(songs);
    var nextBtn = document.getElementById("quote-next");
    nextBtn.addEventListener('click', function () {
        getRandomSong(songs);
        getRandomColor();
    }, false);
    var detailBtn = document.getElementById("quote-detail");
    detailBtn.addEventListener('click', function() {
        var quoteTrans = document.getElementById("quote-trans");
        quoteTrans.classList.toggle("hidden");
    }, false);
}

init();
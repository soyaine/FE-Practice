var songs;

function getRandomColor(){
    var styleEle = document.getElementById("colorStyle");
    var newColor = Math.floor( (Math.random() * 360) );
    styleEle.innerHTML = styleEle.innerHTML.replace(/hsl\(\d+/g, "hsl("+ newColor );//直接正则替换 CSS 中的颜色
}

function getRandomQuote(){
    //var songJSON = https://github.com/jackeyGao/chinese-poetry/blob/master/json/poet.song.100000.json;
}

function getRandomSong(song){
    if(song){
        var length = song.length;
        var randomSong = song[Math.floor( (Math.random() * length) )];
        if(randomSong.hasOwnProperty("paragraphs")){
            var quoteContent = document.getElementById("quote-content");
            var randomLine = randomSong.paragraphs[Math.floor( (Math.random() * randomSong.paragraphs.length) )];
            quoteContent.innerText = randomLine;
            quoteContent.attributes[2].value = randomSong.author;
        }
    }
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'poetSongs.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            //return xobj.responseText;
        }
    };
    xobj.send(null);
}

function loadSongs(){
    return  loadJSON(function(response){
        songs = JSON.parse(response);
        return songs;
    });
}

function init(){
    //getSong();
    var song = loadSongs();
    getRandomColor();
    getRandomSong(songs);
    var nextBtn = document.getElementById("quote-next");
    nextBtn.addEventListener('click', function(){
        getRandomSong(songs);
        getRandomColor();
    }, false);
}

init();
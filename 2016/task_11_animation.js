var ani = document.getElementById("animation");
function move(ele, distance){
    var aniEle = document.getElementById(ele);
    aniEle.transform ;
}
// setTimeout();

var anim = document.getElementById("anim");

var startTime = undefined;

function render(time) {

    if (time === undefined)
        time = Date.now();
    if (startTime === undefined)
        startTime = time;

    anim.style.left = ((time - startTime)/10 % 500) + "px";
}

anim.onclick = function(){
    (function animloop(){
        render();
        requestAnimationFrame(animloop);
    })();
};

// PATH PRACTICE
// var path = {
//     canvas: document.getElementById("path"),
//     ctx : document.getElementById("path").getContext('2d'),
//     init: function () {
//         this.ctx.fillStyle = "EA80B0";
//         this.ctx.beginPath();
//         this.ctx.moveTo(0, 10);
//         this.ctx.lineTo(20, 10);
//         this.ctx.lineTo(10, 10);
//         this.ctx.closePath();
//         this.ctx.fill();
//         this.ctx.lineWidth = 2;
//     }
// }
//
// path.init();

pathCtx = document.getElementById("path").getContext('2d');
pathCtx.fillStyle = "orange";
pathCtx.beginPath();
pathCtx.moveTo(10, 10);
pathCtx.lineTo(50, 10);
pathCtx.moveTo(30, 10);
pathCtx.lineTo(30, 90);
// pathCtx.moveTo(10, 90);
pathCtx.lineTo(50, 90);
pathCtx.closePath();
pathCtx.fill();
pathCtx.strokeStyle = "red";
pathCtx.strokeRect(20, 20, 40, 40);
pathCtx.stroke();



// canvas animation
var snake = {

    canvas: document.getElementById("canvas"),
    ctx: document.getElementById("canvas").getContext('2d'),

    // how big the "squares" will be
    xDis: 0,
    yDis: 0,

    // where the square will be drawn
    posX: 0,
    posY: 0,

    // ID of requestAnimationFrame
    repeater: 0,

    // breaks frame into X * X squares
    // 将 canvas 划分为 X * X 的网格，可理解为绘画的像素点的大小
    // X = division
    divisions: 100,

    init: function(){
        // Set up "Two Dimensional" Array to remember what is on and off
        // 建立一个二维数组，存放所有点是否已被绘制的信息
        this.memory = new Array(this.divisions - 1);
        for (var i = 0; i < (this.divisions + 1); i++){
            this.memory[i] = new Array(this.divisions - 1);
        }

        // Size the canvas appropriately
        var width = window.innerWidth;
        var height = window.innerHeight;
        snake.canvas.width = width;
        snake.canvas.height = height;

        // Size of squares is canvas width broken into equal chunks
        snake.xDis = width/snake.divisions;
        snake.yDis = height/snake.divisions;

        // All pink
        this.ctx.fillStyle = "#EA80B0";

        // Random starting position
        this.posX = Math.floor(Math.random() * this.divisions);
        this.posY = Math.floor(Math.random() * this.divisions);

        // global
        drawLoop = function() {
            snake.repeater = requestAnimationFrame(drawLoop);
            snake.oneMovement();
        };

        drawLoop();
    },

    // 画小矩形
    drawSquare: function (x, y) {
        // Actually drew it
        // 用snake的CanvasRenderingContext2D上下文，画小矩形
        // 横坐标 x*this.xDis
        // 纵坐标 y*this.yDis
        // 长度 this.xDis
        // 宽度 this.yDis
        snake.ctx.fillRect(x*this.xDis, y*this.yDis, this.xDis, this.yDis);

        // Record it in memory
        // 将画的小矩形的位置存入内存
        snake.memory[x][y] = true;
    },

    // 检查可能的下一步方位
    checkPossiblePositions: function () {

        var posToReturn = [];

        if (this.posX == 0) {
            // 在左侧边界 can't go left
        } else if (this.memory[this.posX-1][this.posY] == true) {
            // 左侧已有值 left occupied
        } else {
            posToReturn.push("left");
        }

        if (this.posX == this.divisions) {
            // 坐标在右侧边界 can't go right
        } else if (this.memory[this.posX+1][this.posY] == true) {
            // 右移一位已有值
        } else {
            // 除去以上两种情况，右侧是可画的
            posToReturn.push("right")
        }

        if (this.posY == 0) {
            // 在上边界 can't go up
        } else if (this.memory[this.posX][this.posY-1] == true) {
            // 上移一位已有值 top occupied
        } else {
            // 除去以上两种情况，上方位置可画
            posToReturn.push("up");
        }

        if (this.posY == this.divisions) {
            // 位置在下边界 can't go down
        } else if (this.memory[this.posX][this.posY+1] == true) {
            // 下移一位已有值
        } else {
            posToReturn.push("down");
        }

        return posToReturn;
    },

    // 开始新一轮的循环
    startNewRound: function () {
        // stop 取消此次动画
        cancelAnimationFrame(this.repeater);

        // Find new spot
        // 重新找一个起点
        var newSpot = this.findEmpty();

        if (newSpot == "nope") {
            // Absolutely done, start over.

            // clear canvas
            // 去除当前的 canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // start over
            this.init();
        } else {
        //    Start over from new position
            this.posX = newSpot[0];
            this.posY = newSpot[1];

        //    Actually restart
            drawLoop();
        }
    },

    oneMovement: function () {
        // 画小矩形
        this.drawSquare(this.posX, this.posY);
        // 确定下一步的位置
        // 判断可能的方向
        var possiblePos = this.checkPossiblePositions();
        // 可能的方向的个数
        var numPossible = possiblePos.length;

        if (numPossible == 0) {
            this.startNewRound();
        } else {
            // 取随机的方向
            var randomDir = Math.floor(Math.random() * numPossible);
            if (possiblePos[randomDir] == "left") {
                this.posX--;
            }
            if (possiblePos[randomDir] == "right") {
                this.posX++;
            }
            if (possiblePos[randomDir] == "up") {
                this.posY--;
            }
            if(possiblePos[randomDir] == "down") {
                this.posY++;
            }
        }
    },

    findEmpty: function () {
        for (var x = 0; x < (this.divisions+1); x++) {
            for (var y = 0; y < (this.divisions+1); y++) {
                if (!this.memory[x][y]) {
                    return [x, y];
                }
            }
        }

        return "nope";
    }
}

// setTimeout(function () {
//     snake.init();
// }, 10);
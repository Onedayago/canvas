window.onload=function(){
    initSwp();
}
function initSwp() {
    var wW = document.documentElement.clientWidth;
    var myCanvas = document.getElementById('myCanvas');
    var myContext = myCanvas.getContext('2d');
    var img1 = new Image();
    var img2 = new Image();
    var pat = null;
    var change = null;

    myCanvas.width = wW;
    myCanvas.height = 600;
    img1.src = './imgs/l1.jpg';
    img2.src = './imgs/s1.jpg';


    var topX = wW / 2 + 250;
    var bottomX = wW / 2 - 250;

    var originT = wW / 2 + 250;
    var originB = wW / 2 - 250;

    var addT = originT + 400;
    var addB = originB + 400;
    var reduceT = originT - 400;
    var reduceB = originB - 400;
    
    var addX = false;
    var reduceX = false;

    var i=0;
    // 加个判断，判断两张图片是否都已经加载过了
    if(img1.complete && img2.complete){
        initPat();
        paint();
    }else{
        img1.onload = function () {
            i++;
            if(i===2){
                i=0;
                initPat();
                paint();
            }
        }
        img2.onload=function(){
            i++;
            if(i===2){
                i=0;
                initPat();
                paint();
            }
        }
    }
    function initPat() {
        //临时创建一个 canvas 用来创建 pat
        var canvasTemp = document.createElement('canvas');
        var contextTemp = canvasTemp.getContext('2d');
        canvasTemp.width = wW; // 目标宽度
        canvasTemp.height = 600; // 目标高度
        contextTemp.drawImage(img1, 0, 0, wW, 600);
        pat = myContext.createPattern(canvasTemp, 'no-repeat');
    }
    //在 canvas 上画图和咱们刚才生成的 pat
    function paint() {
        clear();
        myContext.drawImage(img2, 0, 0, wW, 600);
        myContext.beginPath();
        myContext.moveTo(0, 0);
        myContext.lineTo(topX, 0);
        myContext.lineTo(bottomX, 600);
        myContext.lineTo(0, 600);
        myContext.fillStyle = pat;
        myContext.fill();
    }
    //重置画布
    function clear() {
        myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
    }

    myCanvas.onmousemove = function (e) {
        if (e.offsetX < wW / 2 && addX == false) {
            addX = true;
            reduceX = false;
            clearInterval(change);
            change = setInterval(function () {
                topX = topX + (addT - topX) / 50;
                bottomX = bottomX + (addB - bottomX) / 50;
                paint();
                if (topX >= addT - 10) {
                    clearInterval(change);
                    addX = false;
                }
            }, 1);
        } else if (e.offsetX >= wW / 2 && reduceX == false) {
            reduceX = true;
            addX = false;
            clearInterval(change);
            change = setInterval(function () {
                topX = topX + (reduceT - topX) / 50;
                bottomX = bottomX + (reduceB - bottomX) / 50;
                paint();
                if (topX <= reduceT + 10) {
                    clearInterval(change);
                    reduceX = false;
                }
            }, 1);
        }
    }
    myCanvas.onmouseleave = function () {
        clearInterval(change);
        addX = false;
        reduceX = false;
        change = setInterval(function () {
            topX = topX + (originT - topX) / 50;
            bottomX = bottomX + (originB - bottomX) / 50;
            paint();
            if (topX <= originT + 10 && topX >= originT - 10) {
                clearInterval(change);
            }
        }, 1);
    }
}
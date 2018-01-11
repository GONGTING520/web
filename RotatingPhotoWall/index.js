const ROW = 4,
    COL = 6,
    NUM = ROW * COL; //定义常量
let aDiv = null;
document.body.loadSuccessCount = 0; //定义加载好的图片的数量

//图片预加载
for (let i = 0; i < NUM; i++) {
    let oSmallImg = new Image();
    let oBigImg = new Image();
    oSmallImg.onload = oBigImg.onload = function () {
        //ie中onload必须写在src前面
        document.body.loadSuccessCount++;
        if (document.body.loadSuccessCount == NUM * 2) {
            show();
        }
    };
    oSmallImg.src = 'img/thumbs/' + (i + 1) + '.jpg';
    oBigImg.src = 'img/' + (i + 1) + '.jpg';
    //让每个小图片的旋转角度随机
    // oSmallImg.style.transform = 'rotate(' + parseInt(Math.random() * 60 - 30) + 'deg)';
}

function show() {
    for (let i = 0; i < NUM; i++) {
        let oDiv = document.createElement('div');
        oDiv.className = 'img';
        oDiv.style.background = 'url(img/thumbs/' + (i + 1) + '.jpg)';
        document.body.appendChild(oDiv);
    }

    aDiv = document.getElementsByTagName('div');
    //计算小图片的水平的间隙iColGap和垂直的间隙iRowGap
    let iColGap = (document.body.offsetWidth - COL * aDiv[0].offsetWidth) / (COL + 1);
    let iRowGap = (document.body.offsetHeight - ROW * aDiv[0].offsetWidth) / (ROW + 1);
    for (let i = 0; i < NUM; i++) {
        //小图片最开始的位置
        aDiv[i].pos = {
            top: iRowGap + parseInt(i / 6) * (iRowGap + aDiv[0].offsetWidth),
            left: iColGap + (i % 6) * (iColGap + aDiv[0].offsetWidth)
        };
        aDiv[i].style.top = aDiv[i].pos.top + 'px';
        aDiv[i].style.left = aDiv[i].pos.left + 'px';
        //设置每张小图片飞出的延迟时间
        aDiv[i].style.transitionDelay = (NUM - i) * 100 + 'ms';
    }
}
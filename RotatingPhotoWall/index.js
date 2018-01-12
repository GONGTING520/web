const ROW = 4,
    COL = 6,
    NUM = ROW * COL; //定义常量
let aDiv = null;
let aSpan = null;
let oContainer = document.getElementById('container');
let oArrows = document.getElementById('arrows');
let aArrows = oArrows.getElementsByTagName('div');
oContainer.loadSuccessCount = 0; //定义加载好的图片的数量
oContainer.bFlag = true; //true表示处于散开状态，false表示处于合并状态
oContainer.aSort = []; //表示切换大图片时小图片的切换顺序的数组
oContainer.iNow = 0; //表示当前显示的图片
//图片预加载
for (let i = 0; i < NUM; i++) {
    oContainer.aSort.push(i);
    let oSmallImg = new Image(); //创建小图片的图片对象
    let oBigImg = new Image();
    oSmallImg.onload = oBigImg.onload = function () {
        //ie中onload必须写在src前面
        oContainer.loadSuccessCount++;
        if (oContainer.loadSuccessCount == NUM * 2) {
            show();
        }
    };
    oSmallImg.src = 'img/thumbs/' + (i + 1) + '.jpg';
    oBigImg.src = 'img/' + (i + 1) + '.jpg';
}

/**
 * 插入小图片div，并在div中插入span，用div.pos对象来
 * 记录div的初始位置，用div.newPos来记录合并后的位置，
 * 让小图片旋转随机的角度，并依次飞出。插入两个箭头
 * 
 */
function show() {
    //插入图片div
    for (let i = 0; i < NUM; i++) {
        let oDiv = document.createElement('div');
        oDiv.className = 'img';
        oDiv.style.background = 'url(img/thumbs/' + (i + 1) + '.jpg)';
        oDiv.innerHTML = '<span></span>'
        oContainer.appendChild(oDiv);
    }

    aDiv = oContainer.getElementsByTagName('div');
    aSpan = oContainer.getElementsByTagName('span');
    //计算小图片的水平的间隙iColGap和垂直的间隙iRowGap
    let iColGap = (document.body.offsetWidth - COL * aDiv[0].offsetWidth) / (COL + 1);
    let iRowGap = (document.body.offsetHeight - ROW * aDiv[0].offsetWidth) / (ROW + 1);
    let iBigColGap = (document.body.offsetWidth - COL * (aDiv[0].offsetWidth - 8)) / 2;
    let iBigRowGap = (document.body.offsetHeight - ROW * (aDiv[0].offsetWidth - 8)) / 2;
    for (let i = 0; i < NUM; i++) {
        //小图片最开始的位置
        aDiv[i].pos = {
            top: iRowGap + parseInt(i / 6) * (iRowGap + aDiv[0].offsetWidth),
            left: iColGap + (i % 6) * (iColGap + aDiv[0].offsetWidth)
        };
        //小图片合并后的位置
        aDiv[i].newPos = {
            top: iBigRowGap + parseInt(i / 6) * (aDiv[0].offsetWidth - 8),
            left: iBigColGap + (i % 6) * (aDiv[0].offsetWidth - 8)
        };
        aDiv[i].index = i; //设置索引值
        //更改每个span的背景定位
        aSpan[i].style.backgroundPositionX = -(i % 6) * (aDiv[0].offsetWidth - 10) + 'px';
        aSpan[i].style.backgroundPositionY = -parseInt(i / 6) * (aDiv[0].offsetWidth - 10) + 'px';
        //让每个小图片的旋转角度随机
        movePos(i, parseInt(Math.random() * 60 - 30), 'pos');
        //设置每张小图片飞出的延迟时间
        aDiv[i].style.transitionDelay = (NUM - i) * 100 + 'ms';
    }
}

//用事件委托做
oContainer.onclick = function (e) {
    let oTarget = e.target; //获取事件源
    if (oTarget != e.currentTarget) {
        //说明不是空白部分
        if (oTarget.tagName === 'SPAN') {
            //说明是span
            oTarget = oTarget.offsetParent; //将targer改为div
        }
        oContainer.iNow = oTarget.index;
        if (oContainer.bFlag) {
            //说明处于散开状态
            for (let i = 0; i < NUM; i++) {
                aDiv[i].style.transitionDelay = '0ms';
                //改变span的背景图片，并让透明度为1
                aSpan[i].style.backgroundImage = 'url(img/' + (oTarget.index + 1) + '.jpg)';
                aSpan[i].style.opacity = 1;
                //让所有的小图片旋转角度为0，并定位到新得位置
                movePos(i, 0, 'newPos');
                aDiv[i].style.border = '1px solid #999999';
            }
            oArrows.style.display = 'block';
        } else {
            //说明处于合并状态
            for (let i = 0; i < NUM; i++) {
                aDiv[i].style.transitionDelay = '0ms';
                movePos(i, parseInt(Math.random() * 60 - 30), 'pos');
                aSpan[i].style.opacity = 0;
                aDiv[i].style.border = '5px solid #ffffff';
            }
            oArrows.style.display = 'none';
        }
        oContainer.bFlag = !oContainer.bFlag;
    }
};

/**
 * 让每个小图片的旋转iRandom角度，并定位到div[attr]的位置
 * 
 * @param {number} i 第几个div元素
 * @param {number} iRandom 旋转角度
 * @param {string} attr 定位的对象名
 */
function movePos(i, iRandom, attr) {
    aDiv[i].style.transform = 'rotate(' + iRandom + 'deg)';
    aDiv[i].style.top = aDiv[i][attr].top + 'px';
    aDiv[i].style.left = aDiv[i][attr].left + 'px';
}

//点击左箭头
aArrows[0].onclick = function () {
    oContainer.aSort.sort(function (a, b) {
        return Math.random() - 0.5;
    });
    oContainer.iNow = oContainer.iNow == 0 ? NUM - 1 : oContainer.iNow - 1;
    for (let i = 0; i < NUM; i++) {
        aSpan[i].style.transitionDelay = oContainer.aSort[i] * 50 + 'ms';
        aSpan[i].style.backgroundImage = 'url(img/' + (oContainer.iNow + 1) + '.jpg)';
    }
};

//点击右箭头
aArrows[1].onclick = function () {
    oContainer.aSort.sort(function (a, b) {
        return Math.random() - 0.5;
    });
    oContainer.iNow = oContainer.iNow == NUM - 1 ? 0 : oContainer.iNow + 1;
    for (let i = 0; i < NUM; i++) {
        aSpan[i].style.transitionDelay = oContainer.aSort[i] * 50 + 'ms';
        aSpan[i].style.backgroundImage = 'url(img/' + (oContainer.iNow + 1) + '.jpg)';
    }
};
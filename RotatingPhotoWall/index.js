const ROW = 4,
    COL = 6,
    NUM = ROW * COL; //定义常量
let aDiv = null;
let aSpan = null;
document.body.loadSuccessCount = 0; //定义加载好的图片的数量
document.body.bFlag = true; //true表示处于散开状态，false表示处于合并状态

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
}

function show() {
    for (let i = 0; i < NUM; i++) {
        let oDiv = document.createElement('div');
        oDiv.className = 'img';
        oDiv.style.background = 'url(img/thumbs/' + (i + 1) + '.jpg)';
        oDiv.innerHTML = '<span></span>'
        document.body.appendChild(oDiv);
    }

    aDiv = document.getElementsByTagName('div');
    aSpan = document.getElementsByTagName('span');
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
        console.log(parseInt(i / 6));
        //更改每个span的背景定位
        aSpan[i].style.backgroundPositionX = -(i % 6) * (aDiv[0].offsetWidth - 10) + 'px';
        aSpan[i].style.backgroundPositionY = -parseInt(i / 6) * (aDiv[0].offsetWidth - 10) + 'px';
        //让每个小图片的旋转角度随机
        movePos(i);
        //设置每张小图片飞出的延迟时间
        aDiv[i].style.transitionDelay = (NUM - i) * 100 + 'ms';
    }
}

document.body.onclick = function (e) {
    let oTarget = e.target;
    if (oTarget != e.currentTarget) {
        //说明不是空白部分
        if (oTarget.tagName === 'SPAN') {
            //说明是span
            oTarget = oTarget.offsetParent; //将targer改为div
        }
        if (document.body.bFlag) {
            //说明处于散开状态
            for (let i = 0; i < NUM; i++) {
                //改变span的背景图片，并让透明度为1
                aSpan[i].style.backgroundImage = 'url(img/' + (oTarget.index + 1) + '.jpg)';
                aSpan[i].style.opacity = 1;
                //让所有的小图片旋转角度为0，并定位到新得位置
                aDiv[i].style.transform = 'rotate(0deg)';
                aDiv[i].style.top = aDiv[i].newPos.top + 'px';
                aDiv[i].style.left = aDiv[i].newPos.left + 'px';
                aDiv[i].style.border = '1px solid #999999';
                aDiv[i].style.transitionDelay = '0ms';
            }
        } else {
            //说明处于合并状态
            for (let i = 0; i < NUM; i++) {
                movePos(i);
                aSpan[i].style.opacity = 0;
                aDiv[i].style.border = '5px solid #ffffff';
                aDiv[i].style.transitionDelay = '0ms';
            }
        }
        document.body.bFlag = !document.body.bFlag;
    }
};

/**
 * 让每个小图片的旋转角度随机，并定位到pos的位置
 * 
 * @param {number} i 第几个div元素
 */
function movePos(i) {
    aDiv[i].style.transform = 'rotate(' + parseInt(Math.random() * 60 - 30) + 'deg)';
    aDiv[i].style.top = aDiv[i].pos.top + 'px';
    aDiv[i].style.left = aDiv[i].pos.left + 'px';
}
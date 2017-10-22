//轮播图交互
var oSlideshowIndexImg = document.getElementById('slideshow-index-img');
var aImgLi = oSlideshowIndexImg.getElementsByTagName('li');//获取轮播图图片
var oSlideshowIndexArrow = document.getElementById('slideshow-index-arrow');//获取箭头的div
var oSlideshowPrev = oSlideshowIndexArrow.getElementsByTagName('a')[0];//获得向前的箭头对象
var oSlideshowNext = oSlideshowIndexArrow.getElementsByTagName('a')[1];//获得向后的箭头对象
var oSlideshowLeftIndex = document.getElementById('slideshow-left-index');
var aImgItemsUl = oSlideshowLeftIndex.getElementsByTagName('ul');
var oImgItemsUl = null;
//获取下角标的ul
for(var i = 0 ; i < aImgItemsUl.length ; i++){
    if(aImgItemsUl[i].className == 'img-items-ul'){
        oImgItemsUl = aImgItemsUl[i];
    }
}
var aImgIndex = oImgItemsUl.getElementsByTagName('li');//获取轮播图下脚标
var iNow = 0;//轮播图图片当前的index值
//给aImgIndex绑定事件
for(i = 0 ; i < aImgIndex.length ; i++){
    aImgIndex[i].index = i; //为下标添加索引属性方便与图片匹配
    // 为下标添加点击方法
    aImgIndex[i].onclick = function () {
        changeImg(this.index);
    };
    //阻止默认选中
    aImgIndex[i].onselectstart = function(){
        return false;
    };
}
oSlideshowPrev.onclick = function(){
    iNow = (--iNow + aImgIndex.length) % aImgIndex.length;
    changeImg(iNow);
};
oSlideshowNext.onclick = function () {
    iNow = ++iNow % aImgIndex.length;
    changeImg(iNow);
};

var timer;
/**
 * 定义定时器开启方法
 */
function setTimer() {
    timer = setInterval(function () {
        oSlideshowNext.onclick();
    },3000);
}

setTimer();
//定义鼠标滑入图片定时器停止事件
oSlideshowIndexImg.onmouseover = function(){
    clearInterval(timer);
};
//定义鼠标滑出图片定时器开始事件
oSlideshowIndexImg.onmouseout = function(){
    setTimer();
};

/**
 * 切换图片的方法
 * 需要输入切换图片的索引值
 * */
function changeImg(index) {
    iNow = index;
    for(var j = 0; j < aImgIndex.length ; j++){
        aImgIndex[j].className = 'img-item';
        aImgLi[j].className = 'slideshow-li';
    }
    aImgIndex[index].className = 'img-item selected';
    aImgLi[index].className = 'slideshow-li slideshow-selected';
}
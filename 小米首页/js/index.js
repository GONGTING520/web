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

var SlideshowTimer;
/**
 * 定义定时器开启方法
 */
function setSlideshowTimer() {
    SlideshowTimer = setInterval(function () {
        oSlideshowNext.onclick();
    },3000);
}
setSlideshowTimer();
//定义鼠标滑入图片定时器停止事件
oSlideshowIndexImg.onmouseover = function(){
    clearInterval(SlideshowTimer);
};
//定义鼠标滑出图片定时器开始事件
oSlideshowIndexImg.onmouseout = function(){
    setSlideshowTimer();
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




//明星产品的左右切换
var oStarItemDiv = document.getElementById('star-item');//获取明星产品的大div
var oStarItemImgDiv = document.getElementById('star-item-img');//获取装内容的ul的div
var aStarDiv = oStarItemDiv.getElementsByTagName('div');//获取明星产品下面的所有div
var oTitleArrowDiv = null;//定义明星产品下面的箭头div
//获取明星产品下面的箭头div
for(i = 0; i < aStarDiv.length ; i++){
    if(aStarDiv[i].className == 'title-arrow'){
        oTitleArrowDiv = aStarDiv[i];
    }
}
var oStarPrev = oTitleArrowDiv.getElementsByTagName('a')[0];//获取明星产品下面的向左箭头
var oStarNext = oTitleArrowDiv.getElementsByTagName('a')[1];//获取明星产品下面的向右箭头
var iStarFlag = 2;//定义一个标识位用来记录箭头目前的状态，1表示左箭头可以按下，2表示右箭头可以按下
var oStarItemImgUl = oStarItemImgDiv.getElementsByTagName('ul')[0];//获取装内容的ul
//定义左右切换的定时器
var StarTimer;
function setStarTimer() {
    StarTimer = setInterval(function () {
        if(iStarFlag == 1){
            oStarPrev.onclick();
        }else {
            oStarNext.onclick()
        }
    },5000)
}
//调用左右切换的定时器
setStarTimer();
//添加向右箭头的点击事件
oStarNext.onclick = function(){
    if(iStarFlag == 2){
        clearInterval(StarTimer);
        setStarTimer();
        oStarItemImgUl.style.left = -1226 + 'px';
        iStarFlag = 1;
        this.className = 'title-next';
        oStarPrev.className = 'title-prev selected';
    }
};
//添加向左箭头的点击事件
oStarPrev.onclick = function(){
    if(iStarFlag == 1){
        clearInterval(StarTimer);
        setStarTimer();
        oStarItemImgUl.style.left = 0;
        iStarFlag = 2;
        this.className = 'title-prev';
        oStarNext.className = 'title-next selected';
    }
};



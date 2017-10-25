//最上方轮播图交互开始
var oSlideshowIndexImg = document.getElementById('slideshow-index-img');
var aImgLi = oSlideshowIndexImg.getElementsByTagName('li');//获取轮播图图片
var oSlideshowIndexArrow = document.getElementById('slideshow-index-arrow');//获取箭头的div
var oSlideshowPrev = oSlideshowIndexArrow.getElementsByTagName('a')[0];//获得向前的箭头对象
var oSlideshowNext = oSlideshowIndexArrow.getElementsByTagName('a')[1];//获得向后的箭头对象
var oSlideshowLeftIndex = document.getElementById('slideshow-left-index');
var aImgItemsUl = oSlideshowLeftIndex.getElementsByTagName('ul');
var oImgItemsUl = null;
var iZIndex = 1;
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
    aImgLi[index].style.opacity = 0;
    for(var j = 0; j < aImgIndex.length ; j++){
        aImgIndex[j].className = 'img-item';
    }
    aImgIndex[index].className = 'img-item selected';
    aImgLi[index].style.zIndex = ++iZIndex;
    changeOpacity(aImgLi[index]);
}
/**
 * 封装函数，改变对象的透明度
 * 需要传一个对象参数来判断更改那个对象的透明度
 * */
function changeOpacity(elem) {
    clearInterval(elem.timer);
    var speed = 0.1;
    var opa = 0;
    elem.timer = setInterval(function () {
        if(opa < 1){
            opa += speed;
            elem.style.opacity = opa;
        }
    },50);
}
//最上方轮播图交互结束



//明星产品的左右切换 和 为你推荐的左右切换开始
//明星产品元素的获取开始
    var oStarItemDiv = document.getElementById('star-item');//获取明星产品的大div
    var oStarItemImgDiv = document.getElementById('star-item-img');//获取装内容的ul的div
    var aStarDiv = oStarItemDiv.getElementsByTagName('div');//获取明星产品下面的所有div
    bindingEvent(aStarDiv,oStarItemImgDiv);//调用绑定事件函数
//明星产品元素的获取结束
//为你推荐元素的获取开始
    var oContainerRecommend = document.getElementById('container-recommend');//获取为你推荐的大div
    var oRecommendDiv = document.getElementById('recommend');//获取装内容的ul的div
    var aRecommendDiv = oContainerRecommend.getElementsByTagName('div');//获取为你推荐下面的所有div
    bindingEvent(aRecommendDiv,oRecommendDiv);//调用绑定事件函数
//为你推荐元素的获取结束
//明星产品的左右切换 和 为你推荐的左右切换结束
/**
 * 封装绑定事件的函数
 * 需要传两个参数divArr 和 ul
 * divArr 传进来所有的div，用来寻找装箭头的div，并给div下面的两个箭头添加点击事件
 * oDiv 传进来的是装ul的div，用来寻找要被移动的ul对象
 * */
function bindingEvent(divArr,oDiv) {
    var oTitleArrowDiv = null;//定义divArr下面的箭头div
    for(i = 0; i < divArr.length ; i++){
        if(divArr[i].className == 'title-arrow') {
            oTitleArrowDiv = divArr[i];//获取divArr下面的箭头div
        }
    }
    var oPrev = oTitleArrowDiv.getElementsByTagName('a')[0];//获取divArr下面的向左箭头
    var oNext = oTitleArrowDiv.getElementsByTagName('a')[1];//获取divArr下面的向右箭头
    oNext.StarFlag = true;//定义一个标识位用来记录箭头目前的状态，true表示箭头可以按下，false表示箭头可以按下
    oPrev.StarFlag = false;
    var oUl = oDiv.getElementsByTagName('ul')[0];//获取装内容的ul
    var Timer;//定义左右切换的定时器
//封装定时器的方法
    function setTimer() {
        Timer = setInterval(function () {
            if(oPrev.StarFlag){
                oPrev.onclick();
            }else {
                oNext.onclick();
            }
        },5000)
    }
//调用左右切换的定时器
    setTimer();
//添加向右箭头的点击事件
    oNext.onclick = function(){
        if(oNext.StarFlag){
            clearInterval(Timer);
            setTimer();
            oUl.style.left = -1226 + 'px';
            oNext.StarFlag = false;
            oPrev.StarFlag = true;
            oNext.className = 'title-next';
            oPrev.className = 'title-prev selected';
        }
    };
//添加向左箭头的点击事件
    oPrev.onclick = function(){
        if(oPrev.StarFlag){
            clearInterval(Timer);
            setTimer();
            oUl.style.left = 0;
            oNext.StarFlag = true;
            oPrev.StarFlag = false;
            oPrev.className = 'title-prev';
            oNext.className = 'title-next selected';
        }
    };
}




//选项卡：家电，智能，搭配...
//家电部分
var oContainerHomeApp = document.getElementById('container-home-app');
var aHomeAppDiv = oContainerHomeApp.getElementsByTagName('div');//获取家电所有的div
attachSelectedCard(aHomeAppDiv);
//智能部分
var oContainerIntelligence = document.getElementById('container-intelligence');
var aIntelligenceDiv = oContainerIntelligence.getElementsByTagName('div');//获取智能所有的div
attachSelectedCard(aIntelligenceDiv);
//搭配部分
var oContainerMatch = document.getElementById('container-match');
var aMatchDiv = oContainerMatch.getElementsByTagName('div');//获取搭配所有的div
attachSelectedCard(aMatchDiv);
//配件部分
var oContainerFittings = document.getElementById('container-fittings');
var aFittingsDiv = oContainerFittings.getElementsByTagName('div');//获取配件所有的div
attachSelectedCard(aFittingsDiv);
//周边部分
var oContainerSurrounding = document.getElementById('container-surrounding');
var aSurroundingDiv = oContainerSurrounding.getElementsByTagName('div');//获取周边所有的div
attachSelectedCard(aSurroundingDiv);
/**
 * 绑定选项卡事件
 * 需要传一个参数来决定绑定那个大div下的事件
 * */
function attachSelectedCard(aDiv) {
    var oTitleIndex ,oRightSmall;//oTitleIndex用来获取选项卡标题，oRightSmall用来获取内容
    //为oTitleIndex ,oRightSmall赋值
    for(var i = 0 ; i < aDiv.length ; i++){
        if(aDiv[i].className == 'title-index'){
            oTitleIndex = aDiv[i];
        }
        if(aDiv[i].className == 'right-small'){
            oRightSmall = aDiv[i];
        }
    }
    var aLi = oTitleIndex.getElementsByTagName('li');
    var aUl = oRightSmall.getElementsByTagName('ul');
    for(i = 0 ; i < aLi.length ; i++){
        aLi[i].index = i; //设置aLi[i]的索引值，便于更改选项卡
        aLi[i].onmouseover = function(){
            for(var j = 0 ; j < aLi.length ; j++){
                aLi[j].className = '';
                aUl[j].className = 'ul-img-index';
            }
            this.className = 'selected';
            aUl[this.index].className = 'ul-img-index selected';
        };
    }
}




//内容部分的轮播图交互
var oContainerContentDiv = document.getElementById('container-content');//获取内容部分的大div
var aContentDesAndImgDiv = [];//定义内容数组
var aContentPagersDiv = [];//定义下标数组
var aContentArrows = [];//定义箭头数组
var aNow = [ 0 , 0 , 0 , 0 ];//定义每一个显示的内容当前的索引值
var aContentDiv = oContainerContentDiv.getElementsByTagName('div');//获取内容下所有的div
//获取四个内容的div和四个下标div和四组箭头div
for(i = 0 ; i < aContentDiv.length ; i++){
    //获取四个内容的div
    if(aContentDiv[i].className == 'content-desAndImg'){
        aContentDesAndImgDiv.push(aContentDiv[i]);
    }
    //获取四个下标div
    if(aContentDiv[i].className == 'content-pagers'){
        aContentPagersDiv.push(aContentDiv[i]);
    }
    //获取四组箭头div
    if(aContentDiv[i].className == 'content-arrows'){
        aContentArrows.push(aContentDiv[i]);
    }
}
//定义四个内容ul和四个对应的下标的ul
var aContentDesAndImgUl = [];
var aContentPagersUl = [];
//给下标绑定事件，使内容随之切换
for( i = 0 ; i < aContentDesAndImgDiv.length ; i++){
    //获取四个内容ul和四个对应的下标的ul
    aContentDesAndImgUl.push(aContentDesAndImgDiv[i].getElementsByTagName('ul')[0]);
    aContentPagersUl.push(aContentPagersDiv[i].getElementsByTagName('ul')[0]);
    aContentPagersUl[i].index = i;
    //获取下标ul下面所有的li和span，并为其赋索引值
    for(var k = 0 ; k < aContentPagersUl.length ; k++){
        var aLi = aContentPagersUl[k].getElementsByTagName('li');
        var aSpan = aContentPagersUl[k].getElementsByTagName('span');
        for(var j = 0 ; j < aLi.length ; j++){
            aLi[j].index = j;
            aSpan[j].index = j;
        }
    }
    //运用事件委托给装下标的ul绑定事件
    aContentPagersUl[i].onclick = function (e) {
        //获取目标元素target,target可能是li，也可能是span，但他们的index相同
        var target = e.target || window.event.srcElement;
        changeUlContent(this.index , target.index);
    };
}
//给箭头绑定事件
for( i = 0 ; i < aContentArrows.length ; i++){
    var oPrev = aContentArrows[i].getElementsByTagName('div')[0];
    var oNext = aContentArrows[i].getElementsByTagName('div')[1];
    oPrev.index = oNext.index = i;
    oPrev.onclick = function () {
        var iNow = aNow[this.index];
        iNow--;
        iNow = iNow < 0 ? ++iNow : iNow;
        changeUlContent(this.index , iNow);
    };
    oNext.onclick = function () {
        var iNow = aNow[this.index];
        iNow++;
        iNow = iNow > (aContentPagersUl[this.index].getElementsByTagName('li').length - 1) ? --iNow : iNow;
        changeUlContent(this.index , iNow);
    };
}
//阻止下标中的span选中
for( i = 0 ; i < aContentPagersUl.length ; i++){
    var aContentPagersSpan = aContentPagersUl[i].getElementsByTagName('span');
    for(var n = 0 ; n < aContentPagersSpan.length ; n++){
        aContentPagersSpan[n].onselectstart = function () {
            return false;
        }
    }
}
/**
 * 封装函数，内容部分的轮播切换，并更改aNow中相应的索引值
 * 需要传一个索引参数index表示需要切换到的图片内容
 * 和一个所属参数ulIndex表示当前需要切换图片的ul
 * */
function changeUlContent(ulIndex , index){
    aNow[ulIndex] = index;
    var aLi = aContentPagersUl[ulIndex].getElementsByTagName('li');// 获取当前ul下面的li
    for(var m = 0 ; m < aLi.length ; m++){
        aLi[m].className = 'pager';
    }
    aLi[index].className = 'pager pager-selected';
    aContentDesAndImgUl[ulIndex].style.left = -index * 296 + 'px';// 移动对应的内容ul
}

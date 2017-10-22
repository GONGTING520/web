//搜索框交互
var oIndex = document.getElementById('index');
var oSearch = oIndex.getElementsByTagName('input')[0];//获取搜索框
var oSubmit = oIndex.getElementsByTagName('button')[0];//获取搜索按钮
var aIndexUl = oIndex.getElementsByTagName('ul');//获取index下所有的ul
var oSearchList = null;//定义搜索列表
for(var i = 0 ; i < aIndexUl.length ; i++){
    if(aIndexUl[i].className == 'search-list'){ //找到classname为search-list的ul
        oSearchList = aIndexUl[i];
    }
} //获得搜索列表
var oSearchHotWords = getNextElem(oSearchList);
var aHotWords = oSearchHotWords.getElementsByTagName('a');
// 给输入框添加获取焦点事件
oSearch.onfocus = function () {
    oSearchList.style.display = 'block';
    oSubmit.className = 'submit click';
    oSearch.className = 'search click';
    for(var i = 0 ; i < aHotWords.length ; i++){
        aHotWords[i].style.opacity = 0;
    }
};
// 给输入框添加失去焦点事件
oSearch.onblur = function(){
    oSearchList.style.display = 'none';
    oSubmit.className = 'submit';
    oSearch.className = 'search';
    for(var i = 0 ; i < aHotWords.length ; i++){
        aHotWords[i].style.opacity = 1;
    }
};
/**
 * 获取兄弟节点
 * */
function getNextElem(elem) {
    do{
        elem = elem.nextSibling;
    }while(elem && elem.nodeType != 1);
    return elem;
}


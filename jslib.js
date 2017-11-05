/*
 * @Author: mikey.gongting 
 * @Date: 2017-11-05 16:25:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-05 16:44:12
 */

//封装函数，给elem绑定一个事件类型为type的事件，事件处理函数为handler
function addEvent(elem, type, handler) {
    //能力检测，判断elem有无addEventListener方法，标准浏览器
    if (elem.addEventListener) {
        elem.addEventListener(type, handler);
    } else if (elem.attachEvent) {//IE浏览器
        elem.attachEvent('on' + type, handler);
    } else {
        elem['on' + type] = handler;
    }
}
//封装函数通过className获取元素,传入类名和所属对象,所属对象不写则为document
function getByClass(clsName, context) {
    context = context || document;
    if (context.getElementsByClassName) {//能力检测,看是否有此函数
        return context.getElementsByClassName('clsName');
    }
    var result = [];//定义数组来装最终的结果集
    var aList = context.getElementsByTagName('*');//获取context下所有的标签
    for (var i = 0; i < aList.length; i++) {
        if (aList[i].className == clsName) {
            result.push(aList[i]);
        }
    }
}

//封装函数获取elem的第一个孩子元素节点
function getFirstChild(elem) {
    elem = elem.firstChild;
    return elem.nodeType == 1 ? elem : next(elem);
}

//返回一个id名为idname的元素节点
function getById(idname) {
    return document.getElementById(idname);
}

//封装函数获取elem的下一个兄弟元素节点
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    //先判断elem是否为null，在判断nodeType
    return elem;
}

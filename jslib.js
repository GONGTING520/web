/*
 * @Author: mikey.gongting 
 * @Date: 2017-11-05 17:01:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-26 16:15:42
 */


//封装函数，给elem绑定一个事件类型为type的事件，事件处理函数为handler
function addEvent(elem, type, handler) {
    //能力检测，判断elem有无addEventListener方法，标准浏览器
    if (elem.addEventListener) {
        elem.addEventListener(type, handler);
    } else if (elem.attachEvent) { //IE浏览器
        elem.evt = function () {
            //因为点击时立即执行，所以用call或者apply
            handler.call(elem); //将此方法的this指向elem，不设置this指向window
        };
        elem.attachEvent('on' + type, elem.evt);
    } else {
        elem['on' + type] = handler;
    }
}

//封装函数，给elem移除一个事件类型为type，事件处理函数为handler的事件
function removeEvent(elem, type, handler) {
    //能力检测，判断elem有无removeEventListener方法，标准浏览器
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler);
    } else if (elem.detachEvent) { //IE浏览器
        elem.detachEvent('on' + type, elem.evt);
    } else {
        elem['on' + type] = null;
    }
}

//封装函数实现深拷贝，传进一个参数表示要克隆的原对象,返回克隆好的新对象
function clone(obj) {
    //定义一个新的对象
    var newObj = {};
    for (var p in obj) {
        if (typeof (obj[p]) === 'object') {
            newObj[p] = clone(obj[p]);
        } else {
            newObj[p] = obj[p];
        }
    }
    return newObj;
}


/**
 * 封装函数通过className获取元素
 * 
 * @param {any} clsName 类名
 * @param {any} context 若传入则表示在context下查找，否则为document下查找
 * @returns result 返回有clsName的元素的数组
 */
function getByClass(clsName, context) {
    context = context || document;
    if (context.getElementsByClassName) { //能力检测,看是否有此函数
        return context.getElementsByClassName(clsName);
    }
    var result = []; //定义数组来装最终的结果集
    var aList = context.getElementsByTagName('*'); //获取context下所有的标签
    for (var i = 0; i < aList.length; i++) {
        if (aList[i].className == clsName) {
            result.push(aList[i]);
        }
    }
    return result;
}

//返回一个id名为idname的元素节点
function getById(idname) {
    return document.getElementById(idname);
}

//封装函数获取elem的第一个孩子元素节点
function getFirstChild(elem) {
    elem = elem && elem.firstChild; //先判断elem是否为空
    return elem.nodeType == 1 ? elem : next(elem);
}

//封装函数获取elem的下一个兄弟元素节点
function next(elem) {
    do {
        elem = elem && elem.nextSibling; //先判断elem是否为空
    } while (elem && elem.nodeType != 1);
    //先判断elem是否为null，在判断nodeType
    return elem;
}

/**
 * 封装函数返回一个html集，里面装的是标签名为tagName的元素
 * 传进一个元素表示在那个元素中找标签
 * 传进标签名，表示要找的标签
 */
function getByTag(elem, tagName) {
    //若传进了elem则为它本身，若他为null则elem为document
    elem = elem ? elem : document;
    return elem.getElementsByTagName(tagName);
}

/**
 * 封装函数，实现对象的合并
 * 传入要合并到的对象target，和被合并的对象数组arr
 */
function extend(target, arr) {
    // 循环对象数组
    for (var i = 0; i < arr.length; i++) {
        // 循环对象中的每一个属性
        for (var p in arr[i]) {
            // 若下标为i的元素为一个对象，则应调用自己进行合并
            if (typeof (arr[i][p]) == 'object') {
                var arr1 = [];
                arr1.push(arr[i][p]);
                arguments.callee(target[p], arr1);
            } else {
                target[p] = arr[i][p];
            }
        }
    }
}




/**
 * $的原理是返回一个JQuery类的实例化对象
 * 
 * @param {any} selector 
 * @param {any} context 
 * @returns 一个JQuery类的实例化对象
 */
function $(selector, context) {
    return new JQuery(selector, context);
}
/**
 * 声明一个JQuery的类
 * 
 * @param {any} selector 选择器
 * @param {any} context 若传入则表示在context下查找，否则为document下查找
 * @returns 返回查找到的元素数组
 */
function JQuery(selector, context) {
    this.elements = [];
    //选择器
    if (typeof selector === 'string') {
        if (selector.charAt(0) === '#') { //或者selector[0]
            this.elements.push(document.getElementById(selector.substring(1)));
        } else if (selector.charAt(0) === '.') {
            this.elements = getByClass(selector.substring(1), context);
        }
    } else if (typeof selector === 'function') {
        //文档就绪函数
        addEvent(window, 'load', selector);
    }
    // 不能return，因为return的是数组，不是JQuery对象
    // return this.elements;
}

/**
 * jq绑定事件的部分原理
 * 
 * @param {any} type 事件类型
 * @param {any} handler 事件处理函数
 * @returns 返回本对象
 */
JQuery.prototype.on = function (type, handler) {
    for (var index in this.elements) {
        addEvent(this.elements[index], type, handler);
    }
    return this;
};

JQuery.prototype.css = function (arg1, arg2) {
    if (typeof arg1 === 'string' && typeof arg2 === 'string') {
        // 循环this.elements中每一个元素
        for (var index in this.elements) {
            this.elements[index].style[arg1] = arg2;
        }
    } else if (typeof arg1 === 'object' && typeof arg2 === 'undefined') {
        // 循环this.elements中每一个元素
        for (var i = 0; i < this.elements.length; i++) {
            // 循环arg1对象中每一个样式
            for (var p in arg1) {
                this.elements[i].style[p] = arg1[p];
            }
        }
    } else if (typeof arg1 === 'string' && typeof arg2 === 'function') {
        // 循环this.elements中每一个元素
        for (var index in this.elements) {
            this.elements[index].style[arg1] = arg2();
        }
    }
    return this;
};
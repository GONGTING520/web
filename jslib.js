//封装函数通过className获取元素,传入类名和所属对象,所属对象不写则为document
function getByClass(clsName, context){
    context = context || document;
    if(context.getElementsByClassName){//能力检测,看是否有此函数
        return context.getElementsByClassName('clsName');
    }
    var result = [];//定义数组来装最终的结果集
    var aList = context.getElementsByTagName('*');//获取context下所有的标签
    for(var i = 0 ; i < aList.length ; i++){
        if(aList[i].className == clsName){
            result.push(aList[i]);
        }
    }
}

//封装函数获取elem的下一个兄弟元素节点
function next(elem){
    do{
        elem = elem.nextSibling;
    }while(elem && elem.nodeType != 1);
    //先判断elem是否为null，在判断nodeType
    return elem;
}

//封装函数获取elem的第一个孩子元素节点
function getFirstChild(elem){
    elem = elem.firstChild;
    return elem.nodeTyoe == 1 ? elem : next(elem);
}
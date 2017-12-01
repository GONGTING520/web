var $gameContent = $('#game .game-content');
/**
 * 一个生成俄罗斯方块的函数
 * 
 * @returns 生成的方块对象
 */
function newTetris() {
    var i = getRandom(0, 4);
    var oTetris; //表示要生成的方块
    switch (i) {
        case 0:
            oTetris = new Seven(); //生成一个7形状的方块
            break;
        case 1:
            oTetris = new Diamond(); //生成一个方形的方块
            break;
        case 2:
            oTetris = new DiamondZ(); //生成一个z形的方块
            break;
        case 3:
            oTetris = new Triangle(); //生成一个三角形的方块
            break;
        case 4:
            oTetris = new Line(); //生成一个直线型的方块
            break;
    }
    return oTetris;
}




// 定义一个父类
function Common() {
    this.iWidth = $gameContent.width() / 10;
    this.aDiv = [];
    this.speed = 500;
    for (var i = 0; i < 4; i++) { //定义四个小方块
        this.aDiv.push($('<div></div>').get(0));
        this.aDiv[i].style.width = this.iWidth + 'px';
        this.aDiv[i].style.height = this.iWidth + 'px';
    }
    this.sDirction = getRandom(1, 2) == 1 ? 'left' : 'right'; //获取方向
}
// 定义一个一直下落的方法
Common.prototype.fallDown = function () {
    var $aDiv = $(this.aDiv);
    var iWid = this.iWidth;
    var timer = setInterval(function () {
        $aDiv.each(function () {
            var iTop = parseInt($(this).css('top').split('px')[0]) + iWid;
            $(this).css('top', iTop);
        });
        if (Common.prototype.collision($aDiv)) {
            clearInterval(timer);
        }
    }, this.speed);
};
// 定义一个检测能否与其他方块或边界碰撞的方法
Common.prototype.collision = function (elem) {
    var bFlag = false;
    var iBottom = $gameContent.offset().top + $gameContent.height();
    elem.each(function () {
        var $offset = $(this).offset();
        if ($offset.top + $(this).height() >= iBottom) {
            bFlag = true;
        }
    });
    return bFlag;
};


// 生成一个形状类似于7的方块
function Seven() {
    Common.call(this); //继承父类的属性
    var sDir = this.sDirction;
    var iWid = this.iWidth;
    $(this.aDiv).each(function (index) {
        this.className = 'seven'; //给每一块都添加一个类名
        if (index < 2) { //若是前两个  0和1
            $(this).css({
                top: -3 * iWid,
                left: (index + 4) * iWid
            });
        } else {
            $(this).css({
                top: (index - 4) * iWid
            });
            sDir === 'left' ? $(this).css('left', 4 * iWid) : $(this).css('left', 5 * iWid);
        }
        $gameContent.append($(this));
    });
}
Seven.prototype = new Common(); //继承方法
Seven.prototype.constructor = Seven; //将构造函数改为自己



// 生成一个四方形的方块
function Diamond() {
    Common.call(this);
    var iWid = this.iWidth;
    $(this.aDiv).each(function (index) {
        this.className = 'diamond'; //给每一块都添加一个类名
        if (index < 2) { //若是前两个  0和1
            $(this).css({
                top: -2 * iWid,
                left: (index + 4) * iWid
            });
        } else {
            $(this).css({
                top: -iWid,
                left: (index + 2) * iWid
            });
        }
        $gameContent.append($(this));
    });
}
Diamond.prototype = new Common(); //继承方法
Diamond.prototype.constructor = Diamond; //将构造函数改为自己


// 生成一个类似闪电形状或“z形”的方块
function DiamondZ() {
    Common.call(this);
    var sDir = this.sDirction;
    var iWid = this.iWidth;
    $(this.aDiv).each(function (index) {
        this.className = 'diamond-z'; //给每一块都添加一个类名
        if (index < 2) { //若是前两个  0和1
            $(this).css({
                top: -(3 - index) * iWid,
                left: (sDir === 'left' ? 4 : 5) * iWid
            });
        } else {
            $(this).css({
                top: -(4 - index) * iWid,
                left: (sDir === 'left' ? 5 : 4) * iWid
            });
        }
        $gameContent.append($(this));
    });
}
DiamondZ.prototype = new Common(); //继承方法
DiamondZ.prototype.constructor = DiamondZ; //将构造函数改为自己


// 生成一个类似三角形状的方块
function Triangle() {
    Common.call(this);
    var iWid = this.iWidth;
    $(this.aDiv).each(function (index) {
        this.className = 'triangle'; //给每一块都添加一个类名
        if (index === 0) { //若是第一个
            $(this).css({
                top: -2 * iWid,
                left: 4 * iWid
            });
        } else {
            $(this).css({
                top: -iWid,
                left: (index + 2) * iWid
            });
        }
        $gameContent.append($(this));
    });
}
Triangle.prototype = new Common(); //继承方法
Triangle.prototype.constructor = Triangle; //将构造函数改为自己



// 生成一条直线的方块
function Line() {
    Common.call(this);
    var iWid = this.iWidth;
    $(this.aDiv).each(function (index) {
        this.className = 'line'; //给每一块都添加一个类名
        $(this).css({
            top: -(index + 1) * iWid,
            left: 4 * iWid
        });
        $gameContent.append($(this));
    });
}
Line.prototype = new Common(); //继承方法
Line.prototype.constructor = Line; //将构造函数改为自己
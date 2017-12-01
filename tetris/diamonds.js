var $gameContent = $('#game .game-content');
// 定义一个父类
function Common() {
    this.iWidth = $gameContent.width() / 10;
    this.aDiv = [];
    for (var i = 0; i < 4; i++) { //定义四个小方块
        this.aDiv.push($('<div></div>').get(0));
        this.aDiv[i].style.width = this.iWidth + 'px';
        this.aDiv[i].style.height = this.iWidth + 'px';
    }
    this.sDirction = getRandom(1, 2) == 1 ? 'left' : 'right'; //获取方向
}
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
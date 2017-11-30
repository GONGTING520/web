var $gameContent = $('#game .game-content');
// 定义一个父类
function Common() {
    this.iWidth = $gameContent.width() / 10;
    this.iHeight = this.iWidth * 2;
    this.$Div1 = $('<div></div>');
    this.$Div2 = $('<div></div>');
    this.aDiv = [];
    for (var i = 0; i < 4; i++) {
        this.aDiv.push($('<div></div>').get(0));
    }
    this.sDirction = getRandom(1, 2) == 1 ? 'left' : 'right'; //获取方向
}
// 生成一个形状类似于7的方块
function Seven() {
    Common.call(this); //继承父类的属性
    console.log(this.aDiv);
    this.$Div1.add(this.$Div2).addClass('seven'); //给两个块添加一个类名
    var iLeft = this.sDirction === 'left' ? 150 : 120;
    this.$Div1.css({
        width: this.iHeight,
        height: this.iWidth,
        top: -90,
        left: 120
    });
    this.$Div2.css({
        width: this.iWidth,
        height: this.iHeight,
        top: -60,
        left: iLeft
    });
    $gameContent.append(this.$Div1).append(this.$Div2);
}




// 生成一个四方形的方块
function Diamond() {
    Common.call(this);
    this.$Div1.addClass('diamond');
    this.$Div2.remove(); //移除生成的第二个元素，因为只需要一个
    this.$Div1.css({
        width: this.iHeight,
        height: this.iHeight,
        top: -60,
        left: 120
    });
    $gameContent.append(this.$Div1);
}



// 生成一个类似闪电形状或“z形”的方块
function DiamondZ() {
    Common.call(this);
    this.$Div1.add(this.$Div2).addClass('diamond-z');
    var iLeft = this.sDirction === 'left' ? 150 : 120;
    this.$Div1.css({
        width: this.iWidth,
        height: this.iHeight,
        top: -90,
        left: 120
    });
    this.$Div2.css({
        width: this.iWidth,
        height: this.iHeight,
        top: -60,
        left: iLeft
    });
    iLeft === 120 ? this.$Div1.css('left', 150) : null;
    $gameContent.append(this.$Div1).append(this.$Div2);
}



// 生成一个类似三角形状的方块
function Triangle() {
    Common.call(this);
    this.$Div1.add(this.$Div2).addClass('triangle');
    this.$Div1.css({
        width: this.iWidth,
        height: this.iWidth,
        top: -60,
        left: 120
    });
    this.$Div2.css({
        width: this.iWidth + this.iHeight,
        height: this.iWidth,
        top: -30,
        left: 90
    });
    $gameContent.append(this.$Div1).append(this.$Div2);
}




// 生成一条直线的方块
function Line() {
    Common.call(this);
    this.$Div1.add(this.$Div2).addClass('line');
    this.$Div2.remove();
    this.$Div1.css({
        width: this.iWidth,
        height: this.iWidth * 4,
        top: -120,
        left: 120
    });
    $gameContent.append(this.$Div1);
}
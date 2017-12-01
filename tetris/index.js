// var a = new Seven();
// a.fallDown();
// var b = new Diamond();
// var c = new DiamondZ();
// var d = new Triangle();
// var e = new Line();
var a = newTetris();
a.fallDown();
document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 37: //左
            $(a.aDiv).each(function () {
                var iLeft = $(this).css('left').split('px')[0] - $(this).width();
                $(this).css('left', iLeft);
            });
            break;
        case 38: //上
            console.log('up');
            break;
        case 39: //右
            $(a.aDiv).each(function () {
                var iLeft = parseInt($(this).css('left').split('px')[0]) + $(this).width();
                $(this).css('left', iLeft);
            });
            break;
        case 40: //下
            console.log('down');
            break;
    }
}
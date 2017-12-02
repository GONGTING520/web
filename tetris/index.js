// var a = new Seven();
// a.fallDown();
// var b = new Diamond();
// var c = new DiamondZ();
// var d = new Triangle();
// var e = new Line();
var $gameNext = $('#game .next');
var first = newTetris();
var b = newTetris();
var $next = $(b.aDiv).clone();
addNext($next);
// first.fallDown();
fall(first);

/**
 * 拷贝传入的对象，在下一个位置上，插入这个表示下一个会出现的方块的对象
 * 
 * @param {any} $next 表示下一个会出现的方块
 */
function addNext(next) {
    next.each(function (index, elem) {
        $(this).css({
            top: '+=' + $(elem).width() * 3
        });
    });
    $gameNext.append(next);
}

function fall(elem){
    elem.timer = setInterval(function () {
        elem.fallDown();
        if (elem.collision()) {
            clearInterval(elem.timer);
            elem.bMovable = false;
        }
    }, elem.speed);
}


document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 37: //左
            // first活着，并且可以左移
            if (first.bMovable && first.bLeftMovable) {
                $(first.aDiv).each(function (index, elem) {
                    $(this).css({
                        left: '-=' + $(elem).width()
                    });
                });
            }
            break;
        case 38: //上
            console.log('up');
            break;
        case 39: //右
            // first活着，并且可以右移
            if (first.bMovable && first.bRightMovable) {
                $(first.aDiv).each(function (index, elem) {
                    $(this).css({
                        left: '+=' + $(elem).width()
                    });
                });
            }
            break;
        case 40: //下
            console.log('down');
            break;
    }
}
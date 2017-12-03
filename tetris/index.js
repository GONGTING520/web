var $game = $('#game');
var $gameNext = $('.next', $game);
var $gameContent = $('.game-content', $game);
var aTetris = []; //表示已经下落停止的方块数组
var first = newTetris();
var now = first; //当前下落的方块
var b = newTetris();
var $next = $(b.aDiv).clone();
addNext($next);
fallDown(first);

/**
 * 拷贝传入的对象，在下一个位置上，插入这个表示下一个会出现的方块的对象
 * 
 * @param {any} $next 表示下一个会出现的方块
 */
function addNext(next) {
    $('div', $gameNext).remove();
    next.each(function (index, elem) {
        $(this).css({
            top: '+=' + $(elem).width() * 3
        });
    });
    $gameNext.append(next);
}
/**
 * 定义一个定时器，让elem一直下落，当碰到其他方块或底部时停止
 * 
 * @param {any} elem 下落的方块对象
 */
function fallDown(elem) {
    elem.timer = setInterval(function () {
        elem.fallOne();
        if (elem.collision()) {
            clearInterval(elem.timer);
            elem.bMovable = false;
            aTetris.push(now);
            toggleNowAndNext();
        }
    }, elem.speed);
}

function toggleNowAndNext() {
    now = b;
    fallDown(b);
    b = newTetris();
    $next = $(b.aDiv).clone();
    addNext($next);
}
/**
 * 判断元素elem是否超出左右边界
 * 
 * @param {any} elem 要判断的方块的js原生对象
 * @param {any} edgeLeft 边界的left
 * @param {any} sLOrR ‘left’或者‘right’表示左边界或右边界
 * @returns true表示碰撞，false表示没碰上
 */
function overEdge(elem, edgeLeft, sLOrR) {
    var bFlag = false;
    if (sLOrR === 'left') {
        $(elem).each(function () {
            if ($(this).css('left').split('px')[0] <= edgeLeft) {
                bFlag = true;
            }
        });
    } else if (sLOrR === 'right') {
        $(elem).each(function () {
            if ($(this).css('left').split('px')[0] >= edgeLeft) {
                bFlag = true;
            }
        });
    }
    return bFlag;
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37: //左
            // first活着，并且可以左移
            if (now.bMovable) {
                // 如果没与左边界碰撞
                if (!overEdge(now.aDiv, $gameContent.css('left').split('px')[0], 'left')) {
                    $(now.aDiv).each(function (index, elem) {
                        $(this).css({
                            left: '-=' + $(elem).width()
                        });
                    });
                } else {
                    $(now.aDiv).each(function () {
                        $(this).css({
                            left: '-=0'
                        });
                    });
                }
            }
            break;
        case 38: //上
            console.log('up');
            break;
        case 39: //右
            // first活着，并且可以右移
            if (now.bMovable) {
                // 如果没与右边界碰撞
                var iRight = parseInt($gameContent.css('left').split('px')[0]) + $gameContent.width() - now.iWidth;
                if (!overEdge(now.aDiv, iRight, 'right')) {
                    $(now.aDiv).each(function (index, elem) {
                        $(this).css({
                            left: '+=' + $(elem).width()
                        });
                    });
                } else {
                    $(now.aDiv).each(function () {
                        $(this).css({
                            left: '-=0'
                        });
                    });
                }
            }
            break;
        case 40: //下
            console.log('down');
            break;
    }
}
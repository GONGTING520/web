$(function () {
    // 中间轮播图开始
    var $slideshow = $('#slideshow');
    var iAdNow = 0;
    var $adIndexLi = $('#ad-index li');
    $adIndexLi.on('mouseenter', function () {
        iAdNow = $(this).index();
        showAd();
    });
    playAd();

    // 封装开启定时器的函数
    function playAd() {
        $slideshow.data('timer', setInterval(function () {
            iAdNow = (++iAdNow) == $adIndexLi.length ? 0 : iAdNow;
            showAd();
        }, 2000));
    }

    // 切换图片的函数
    function showAd() {
        $('#imgs li:eq(' + iAdNow + ')').stop().fadeIn().siblings().stop().fadeOut();
        $adIndexLi.eq(iAdNow).addClass('selected').siblings().removeClass('selected');
    }

    // 给整个广告的div设置滑入停止定时器，画出开启定时器的事件
    $slideshow.hover(function () {
        clearInterval($slideshow.data('timer'));
    }, function () {
        playAd();
    });
    // 中间轮播图结束

    // 新闻部分开始
    // 设定鼠标与提示框的相对位置
    var iOffset = 15;
    $('#news .news-content a').on('mouseenter', function (e) {
        // 显示提示框
        $(this).next().show(200);
        $($div).css({
            left: e.pageX + iOffset,
            top: e.pageY + iOffset
        });
    }).on('mousemove', function (e) {
        $(this).next().css({
            left: e.pageX + iOffset,
            top: e.pageY + iOffset
        });
    }).on('mouseleave', function () {
        // 隐藏提示框
        $(this).next().hide(200);
    });
    // 新闻部分结束

    // 右下方的轮播图部分开始
    var $brandTab = $('#brand-tab');
    var iBrandTabNow = 0;
    var $brandLi = $('.tab-header li', $brandTab);
    $brandLi.on('click', function () {
        iBrandTabNow = $(this).index();
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.tab-content', $brandTab).animate({
            left: -780 * iBrandTabNow
        }, 1000);
    });
    playBrandTab();

    // 封装开启定时器的函数
    function playBrandTab() {
        $brandTab.data('timer', setInterval(function () {
            iBrandTabNow = (++iBrandTabNow) == $brandLi.length ? 0 : iBrandTabNow;
            $brandLi.eq(iBrandTabNow).trigger('click');
        }, 3000));
    }

    // 给整个右下方的div设置滑入停止定时器，画出开启定时器的事件
    $brandTab.hover(function () {
        clearInterval($brandTab.data('timer'));
    }, function () {
        playBrandTab();
    });
    // 右下方的轮播图部分结束
});
$(function () {
    var $nav = $('#nav');
    var $mask = $('#mask');
    var $container = $('.container', $nav);
    var $menuIcon = $('.icon', $nav);
    var $menuBar = $('.menu-bar', $nav);
    var $menuFirstBar = $('.bottom .first-bar', $menuBar);//导航一级导航
    var $footer = $('#footer');
    var $itemH3 = $('.item .item-li h3', $footer);//脚部一级导航的标题
    var iNowScroll = 0;

    //导航栏部分
    //点击菜单的时候显示菜单和遮罩层
    $menuIcon.on('click', function () {
        $mask.fadeIn(300);
        $menuBar.animate({
            width: 286
        }, 300);
    });
    //当点击一级菜单的时候显示二级菜单
    $menuFirstBar.on('click', function () {
        $(this).siblings().slideToggle(300);
    });
    //点击遮罩层的时候隐藏菜单和遮罩层
    $mask.on('click', function () {
        $mask.fadeOut(300);
        $menuBar.stop(true, true).animate({
            width: 0
        }, 300);
    });

    $(window).on('scroll', function () {
        var iScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (iScroll <= 100) {
            $container.removeClass('small');
        } else if (iNowScroll < iScroll && iScroll >= 104) {
            //滚动条下滚隐藏导航栏
            $container.addClass('small');
            $container.slideUp(300);
            $mask.trigger('click');
        } else {
            //滚动条上滚显示导航栏
            $container.slideDown(300);
        }
        iNowScroll = iScroll;
    });



    //脚部部分
    $('#footer .item-title').on('click', function () {
        if(document.body.offsetWidth <= 768){
            $(this).toggleClass('selected').siblings().toggle(300);
            $itemH3.not($(this)).removeClass('selected');
            console.log($itemH3)
        }
    });
});
$(function () {
    var $nav = $('#nav');
    var $mask = $('#mask');
    var $menuIcon = $('.icon', $nav);
    var $menuBar = $('.menu-bar', $nav);
    var $menuFirstBar = $('.bottom .first-bar', $menuBar);//一级导航

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
        $menuBar.animate({
            width: 0
        }, 300);
    });
});
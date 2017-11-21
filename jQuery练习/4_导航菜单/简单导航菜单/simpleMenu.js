$(function () {
    $('#first-menu .title').on('click', function () {
        $(this).add($(this).next()).toggleClass('selected');
    });
    // 第二个菜单项的滑入滑出事件
    $('#second-menu .title').hover(function () {
        // 停止当前动画
        $(this).addClass('selected').siblings().stop().slideDown();

    }, function () {
        // 停止当前动画
        $(this).removeClass('selected').siblings().stop().slideUp();
    });
});
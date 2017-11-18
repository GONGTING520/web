$(function () {
    $('#first-menu .title').on('click', function () {
        $(this).add($(this).next()).toggleClass('selected');
    });
    // 第二个菜单项的滑入滑出事件
    $('#second-menu .title').hover(function () {
        // 停止当前动画
        $(this).stop(true, true).addClass('selected').siblings().slideDown();

    }, function () {
        // 停止当前动画
        $(this).stop(true, true).removeClass('selected').siblings().slideUp();
    });
});
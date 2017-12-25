$(function () {
    var $menuContent = $('#container .right>ul>li');
    $('#container .left li').on('click', function () {
        console.log($(this).index())
        $(this).addClass('selected').siblings().removeClass('selected');
        $menuContent.eq($(this).index() + 1).addClass('selected').siblings().removeClass('selected');
    });
});
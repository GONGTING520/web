$(function () {
    $('#index span').on('mouseenter', function () {
        $(this).add('#content div:eq(' + $(this).index() + ')').addClass('selected').siblings().removeClass('selected');
    });
});
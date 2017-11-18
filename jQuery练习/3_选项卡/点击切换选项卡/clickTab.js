$(function () {
    $('#index span').on('click', function () {
        // 把点击的span加上class，他的兄弟们移除class
        // $(this).addClass('selected').siblings().removeClass('selected');
        // 找出this的索引，然后找出对应的div给他加class
        // $('#content div').eq($(this).index()).addClass('selected').siblings().removeClass('selected');
        $(this).add('#content div:eq(' + $(this).index() + ')').addClass('selected').siblings().removeClass('selected');
    });
});
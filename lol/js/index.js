$(function () {
    // 背景透明度改变部分
    var iClentHeight = document.documentElement.clientHeight;
    $(window).on('scroll', function(){
        var iOpacity = 1 - $('body,html').prop('scrollTop')/iClentHeight;
        $('.bg').css('opacity', iOpacity);
    });

    //  技能切换部分
    $(".skills .skill-select .skill-info").on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $(this).index()
        $(".skills-introduce li").eq(index == 0 ? 0 : index - 1)
            .addClass('selected').siblings()
            .removeClass('selected');
    });
});
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

    //  精美背景切换部分
    $(".backdrop-img .small-imgs li").on('click',function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        $(".backdrop-img .imgs li").eq($(this).index()).addClass('selected').siblings().removeClass('selected');
    });

    //  菜单显示
    $('.menu .open').on('click', function(){
        $(this).removeClass('selected');
        $('.menu .close').addClass('selected');
        $('.layup').show();
    });  
    $('.menu .close').add('.layup').on('click', function(){
        $('.menu .close').removeClass('selected');
        $('.menu .open').addClass('selected');
        $('.layup').hide();        
    });
    
    // 菜单中的点击特效
    $('.layup li').on('click', function(){
        var iScrollTop = $($(this).attr('alt')).offset().top;
        $('body,html').animate({
            scrollTop: iScrollTop
        }, 1000);
    });
});
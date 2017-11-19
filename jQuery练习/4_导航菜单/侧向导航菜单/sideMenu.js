$(function(){
    $('#content > li').hover(function(){
        $(this).addClass('selected').find('.extend').addClass('select');
    },function(){
        $(this).removeClass('selected').find('.extend').removeClass('select');
    });
});
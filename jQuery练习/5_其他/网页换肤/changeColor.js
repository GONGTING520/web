$(function () {
    var skin = $.cookie('skin');//获取cookie,若有则改变肤色
    if(skin){
        changeSkin(skin);
    }
    $('#skin li').on('click', function () {
        // 保存当前颜色到cookie
        $.cookie('skin',this.id,{expires:30});
        changeSkin(this.id);
    });
    function changeSkin(skin) {
        $('#'+skin).addClass('selected').siblings().removeClass('selected');
        $('div').get(0).className = skin;
        $('div').get(1).className = skin;
    }
});
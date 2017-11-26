$(function () {
    // 首先先加载cookie中的肤色
    var sCookieColor = $.cookie('skin');
    if (sCookieColor) {
        changeSkin(sCookieColor, $('#skin .' + sCookieColor));
    }
    // 搜索框部分开始
    $('#search').on('focus', function () {
        if (this.value == this.defaultValue) {
            this.value = '';
        }
    }).on('blur', function () {
        if (this.value == '') {
            this.value = this.defaultValue;
        }
    });
    // 搜索框部分结束

    // 换肤部分开始
    // 用事件委托的方式绑定事件
    $('#skin').on('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target != this) {
            var date = new Date();
            date.setDate(date.getDate() + 30);
            var sExpires = "expires=" + date.toUTCString();
            var color = target.className.split(' ')[0];
            changeSkin(color, target);
            $.cookie('skin', color, sExpires);
        }
    });

    /**
     * 切换皮肤颜色
     * 传入切换的颜色color，改变对号的elem
     * */
    function changeSkin(color, elem) {
        $('#nav').get(0).className = color;
        $('#shopping-list h2').get(0).className = color + ' list-title';
        $(elem).addClass('selected').siblings().removeClass('selected');
    }
    // 换肤部分结束
});
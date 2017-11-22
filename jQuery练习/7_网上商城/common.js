$(function () {
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
            $('#nav').get(0).className = target.className;
            $('#shopping-list h2').get(0).className = target.className + ' list-title';
            $(target).addClass('selected').siblings().removeClass('selected');
        }
    });
    // 换肤部分结束
});
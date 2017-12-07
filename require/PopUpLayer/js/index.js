requirejs.config({
    baseUrl: '../../../../', //基础路径
    paths: {
        jquery: 'web/jquery-3.2.1' //ID必须为jquery
    }
});

require(['jquery', 'web/require/PopUpLayer/js/dialog'], function ($, Dialog) {
    var settings = {
        width: 300,
        height: 200,
        title: '注册',
        content: 'regist.html'
    };
    $('#btn').on('click', function () {
        var d = new Dialog();
        d.open(settings);
    });
});
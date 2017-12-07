requirejs.config({
    baseUrl: '../../../../', //基础路径
    paths: {
        jquery: 'web/jquery-3.2.1' //ID必须为jquery
    }
});

define(['jquery'], function ($) {
    function Dialog() {
        this.defaultSettings = {
            width: 500,
            height: 400,
            title: '弹出层',
            content: ''
        };
        this.$dialogContainer = $('<div class="dialog-container"></div>');
        this.$dialogMask = $('<div class="dialog-mask"></div>');
        this.$dialogContent = $('<div class="dialog-content"></div>');
        this.$title = $('<div class="title"></div>');
        this.$item = $('<div class="item"></div>');
        this.$close = $('<div class="close">[X]</div>');
        this.$content = $('<div class="content"></div>');
    }
    Dialog.prototype.open = function (settings) {
        $.extend(this.defaultSettings, settings);
        this.$title.append(this.$item).append(this.$close);
        this.$dialogContent.append(this.$title).append(this.$content).css({
            width: this.defaultSettings.width,
            height: this.defaultSettings.height
        });
        this.$dialogContainer.append(this.$dialogMask).append(this.$dialogContent).appendTo(document.body);
        this.$item.text(this.defaultSettings.title);
        // 若有html文件则加载，否则当成字符串
        if(this.defaultSettings.content.indexOf('.html')!=-1){
            this.$content.load(this.defaultSettings.content);
        }else{
            this.$content.html(this.defaultSettings.content);
        }
        this.$close.on('click',function () {
            this.close();
        }.bind(this));//让此函数的this指向实例化对象
    };
    Dialog.prototype.close = function () {
        this.$dialogContainer.remove();
    };
    return Dialog;
});
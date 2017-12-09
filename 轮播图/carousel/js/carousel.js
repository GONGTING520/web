//轮播图类
define(['jquery'], function ($) {
    function Carousel() {
        this.$container = $('<div class="carousel-container"></div>');
        this.$imgs = $('<div class="carousel-imgs"></div>');
        this.$nav = $('<div class="carousel-nav"></div>');
        this.$arrows = $('<div class="carousel-arrows"></div>');
        this.$prev = $('<span>&lt;</span>');
        this.$next = $('<span>&gt;</span>');
        this.defaultSettings = {
            imgArr: [],
            imgWidth: 0,
            imgHeight: 0,
            speed: 1000,
            buttonStyle: 'square', //或circle
            circleWidth: 10,
            circleHeight: 10,
            selector: document.body
        };
        this.iNow = 0; //设置自己当前显示图片的索引
        this.timer = null; //自己的定时器
    }
    Carousel.prototype.init = function (settings) {
        $.extend(this.defaultSettings, settings); //合并设置
        var that = this;
        this.$arrows.append(this.$prev).append(this.$next);
        this.$container.css({
            width: that.defaultSettings.imgWidth,
            height: that.defaultSettings.imgHeight,
        }).append(this.$imgs).append(this.$nav).append(this.$arrows).appendTo(this.defaultSettings.selector);
        //添加图片和下标
        for (var i = 0; i < this.defaultSettings.imgArr.length; i++) {
            this.$imgs.append('<img src="' + this.defaultSettings.imgArr[i] + '" />');
            this.$nav.append('<li>' + (i + 1) + '</li>');
        }
        $('img:eq(0)', this.$imgs).add('li:eq(0)', this.$nav).addClass('selected');
        //修改按钮样式
        if (this.defaultSettings.buttonStyle === 'circle') {
            $('li', this.$nav).css({
                borderRadius: '50%',
                width: that.defaultSettings.circleWidth,
                height: that.defaultSettings.circleHeight
            }).html('');
        }


        //滑入下标切换图片和下标,事件委托
        $(this.$nav).on('mouseover', function (e) {
            e = e || window.event;
            var oTarget = e.target;
            if (oTarget != this.$nav.get(0)) {
                this.iNow = $(oTarget).index();
                changeImg.call(this); //函数立即调用，所以用call
            }
        }.bind(this)); //让this指向当前实例化对象，但不立即调用

        //点击前后箭头
        this.$prev.on('click', function () {
            that.iNow = (--that.iNow) < 0 ? that.defaultSettings.imgArr.length - 1 : that.iNow;
            changeImg.call(that); //that在前面声明了，指向当前实例化对象
        });
        this.$next.on('click', function () {
            that.iNow = (++that.iNow) == that.defaultSettings.imgArr.length ? 0 : that.iNow;
            changeImg.call(that); //that在前面声明了，指向当前实例化对象
        });
        play(); //开启定时器

        //划入容器停止定时器，划出开启
        this.$container.hover(function () {
            clearInterval(that.timer);
        }, function () {
            play();
        });

        //切换图片
        function changeImg() {
            $('li', this.$nav).eq(this.iNow).add($('img', this.$imgs).eq(this.iNow)).addClass('selected').siblings().removeClass('selected');
        }
        //开启定时器
        function play() {
            that.timer = setInterval(function () {
                that.$next.trigger('click');
            }, that.defaultSettings.speed);
        }
    };
    return Carousel;
});
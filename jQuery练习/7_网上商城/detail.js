$(function () {
    var $goodsShow = $('#goods-show');
    var $magnifying = $('.magnifying-glass', $goodsShow);
    var $drag = $('.drag', $magnifying);
    var $bigger = $('.bigger', $magnifying);
    var $biggerImg = $('img', $bigger);
    // 放大镜中部分开始
    $magnifying.hover(function () {
        $drag.add($bigger).css('display', 'block');
    }, function () {
        $drag.add($bigger).css('display', 'none');
    }).on('mousemove', function (e) {
        e = e || window.event;
        var iLeft = e.clientX - $drag.width() / 2 - $magnifying.offset().left;
        var iTop = e.clientY - $drag.height() / 2 - $magnifying.offset().top;
        var iMaxLeft = $bigger.offset().left - $magnifying.offset().left - $drag.width();
        var iMaxTop = $magnifying.height() - $drag.height();
        var iBigMaxLeft = $biggerImg.width() - $bigger.width();
        var iBigMaxTop = $biggerImg.height() - $bigger.height();
        if (iLeft > iMaxLeft) {
            iLeft = iMaxLeft;
        }
        if (iLeft < 0) {
            iLeft = 0;
        }
        if (iTop > iMaxTop) {
            iTop = iMaxTop;
        }
        if (iTop < 0) {
            iTop = 0;
        }
        $drag.css({
            left: iLeft,
            top: iTop
        });
        $biggerImg.css({
            left: -(iLeft / iMaxLeft) * iBigMaxLeft,
            top: -(iTop / iMaxTop) * iBigMaxTop
        });
    });
    // 放大镜中部分结束




    // 放大镜中的选项卡部分开始
    // 用事件委托做
    $('.tab-menu', $goodsShow).on('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target != this) {
            $(target).add('.tab-content p:eq(' + $(target).index() + ')', $goodsShow).addClass('selected').siblings().removeClass('selected');
        }
    });
    // 放大镜中的选项卡部分结束




    // 评分部分开始
    var $scoreLi = $('#goods-selected .score li');
    //定义一个数组用来装滑入时更改class之前每个li的class
    var aOldClaName = [];
    $scoreLi.each(function () {
        aOldClaName.push(this.className);
    });
    $scoreLi.hover(function () {
        // 获得此li原来的class,在原来class的基础上加上‘-hover’
        var claName = this.className.split(' ')[0] + '-hover';
        // 给所有li更改class
        changeClass(claName);
    }, function () {
        // 将所有的class都重置回划之前的class
        $scoreLi.each(function (index) {
            this.className = aOldClaName[index];
        });
    }).on('click', function () {
        aOldClaName = [];
        // 先获取li原来的class，再加上‘-selected’
        var selectName = this.className.split(' ')[0] + '-selected';
        changeClass(selectName);
        // 将选择结果记录在aOldClaName数组中
        $scoreLi.each(function () {
            aOldClaName.push(this.className);
        });
        alert('您给此商品的评分是：' + ($(this).index() + 1) + '分');
    });

    /**
     * 封装改变class函数,第一个class不变，只更改第二个class
     * 输入claName 表示要更改的类名
     * */
    function changeClass(claName) {
        // 循环所有li
        $scoreLi.each(function () {
            // 获取当前li的class数组，第一个为原来的class，不能改
            var aThisClaName = this.className.split(' ');
            this.className = aThisClaName[0] + ' ' + claName;
        });
    }
    // 评分部分结束
});
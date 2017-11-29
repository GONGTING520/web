$(function () {
    var $goodsShow = $('#goods-show');
    var $magnifying = $('.magnifying-glass', $goodsShow);
    var $drag = $('.drag', $magnifying);
    var $bigger = $('.bigger', $magnifying);
    var $biggerImg = $('img', $bigger);
    var $smallerImg = $('.smaller img', $magnifying);
    // 放大镜中部分开始
    $magnifying.hover(function () {
        $drag.add($bigger).css('display', 'block');
    }, function () {
        $drag.add($bigger).css('display', 'none');
    }).on('mousemove', function (e) {
        e = e || window.event;
        // 不能用client，client是相对于本画面整个，而page是相对于整个页面
        var iLeft = e.pageX - $drag.width() / 2 - $magnifying.offset().left;
        var iTop = e.pageY - $drag.height() / 2 - $magnifying.offset().top;
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


    // 切换放大镜中的图片开始
    var $smallImgLi = $('.small-img li', $goodsShow);
    $smallImgLi.on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var sThisSrc = $(this.children[0]).attr('alt');
        var sBiggerSrc = 'img/pro_img/' + sThisSrc + '_big.jpg';
        var sSmallerSrc = 'img/pro_img/' + sThisSrc + '_small.jpg';
        $biggerImg.attr('src', sBiggerSrc);
        $smallerImg.attr('src', sSmallerSrc);
        $('.magnifying-img', $goodsShow).attr('href', sBiggerSrc);
    });
    // 切换放大镜中的图片结束




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




    // 选择颜色部分开始
    var $goodsInfo = $('#goods-selected .goods-info');
    var $color = $('.color', $goodsInfo);
    $('.color-img li', $goodsInfo).on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var $img = $(this).children().eq(0); //获取当前li下面的img
        // 将当前点击图片的alt属性赋值给class为color的span，更改他的内容
        $color.text($img.attr('alt'));
        var sColor = $img.data('color'); //获取当前点击图片的color属性
        var iSelectedIndex = 0; //记录放大镜中被选中的li的索引，默认为0
        // 遍历所有的小图片li
        $smallImgLi.each(function (index) {
            // 如果当前li被选中的更改iSelectedIndex为当前li的索引
            if (this.className == 'selected') {
                iSelectedIndex = index;
            }
            // 如果当前为第三个图片
            if (index == 2) {
                // 如果颜色为粉绿则隐藏当前li，否则显示
                if (sColor == "green") {
                    $(this).css('display', 'none');
                } else {
                    $(this).css('display', 'block');
                    changeSmallImg($(this.children[0]), sColor, index);
                }
            } else {
                changeSmallImg($(this.children[0]), sColor, index);
            }
        });
        if (iSelectedIndex == 2 && sColor == 'green') {
            // 若下标为2，且为粉绿色，则去触发第一个li的点击事件
            $smallImgLi.eq(0).children().eq(0).trigger('click');
        } else {
            $smallImgLi.eq(iSelectedIndex).children().eq(0).trigger('click');
        }
    });

    /**
     * 切换图片的src
     * 输入要切换的元素elem，切换的颜色color，图片的索引index
     */
    function changeSmallImg(elem, color, index) {
        var sIndex = '';
        switch (index) {
            case 0:
                sIndex = 'one';
                break;
            case 1:
                sIndex = 'two';
                break;
            case 2:
                sIndex = 'three';
                break;
        }
        elem.attr({
            src: 'img/pro_img/' + color + '_' + sIndex + '.jpg',
            alt: color + '_' + sIndex
        });
    }
    // 选择颜色部分结束




    // 选择尺寸开始
    // 用事件委托做
    var $size = $('.size', $goodsInfo);
    $('.size-ul', $goodsInfo).on('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target != this) {
            $size.text(target.innerHTML);
            $(target).addClass('selected').siblings().removeClass('selected');
        }
    });
    // 选择尺寸结束




    // 选择数量开始
    var $number = $('.number', $goodsInfo);
    var $num = $('.num', $number);
    var $sum = $('.sum', $goodsInfo);
    var $sub = $('.sub', $number);
    $sub.add('.add', $number).on('click', function () {
        var iNum = $num.attr('value') * 1;
        if (this === $sub.get(0)) {
            $num.attr('value', function () {
                iNum--;
                if (iNum < 1) {
                    iNum = 1;
                }
                return iNum;
            });
        } else {
            $num.attr('value', ++iNum);
        }
        $sum.text(200 * $num.attr('value'));
    });
    // 选择数量结束





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


    // 加入购物车部分开始
    var $layer = $('#pop-layer');
    $('#goods-selected .add-cart').on('click', function () {
        this.LayerInner = '您选购了' + $num.val() + '件' + $size.text() +
            '尺寸的衬衫，颜色为：' + $color.text() + '。总计：' + $sum.text() + '元';
        $('.layer-inner', $layer).text(this.LayerInner);
        $layer.show();
    });
    $layer.on('click', function () {
        $(this).hide();
    });
    $('.head-close', $layer).hover(function () {
        $(this).addClass('head-close-hover');
    }, function () {
        $(this).removeClass('head-close-hover');
    });
    // 加入购物车部分结束
});
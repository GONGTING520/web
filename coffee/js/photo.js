$(function () {
    var $container = $('#container');
    var $smallLis = $('.right .small-photo li', $container);
    var $layer = $('#pop-up-layer');
    var $layerImg = $('.layer-img', $layer);
    var $bigImgLis = $('li', $layerImg);
    var $prev = $('.icon-jiantou-copy-copy', $layer);
    var $next = $('.icon-arrow-right-thick', $layer);
    var iNow = 0; //记录当前点击的图片索引
    $smallLis.on('click', function () {
        iNow = $(this).index();
        $layer.show();
        $layerImg.fadeIn();
        changeImg();
    });
    // 点击左箭头
    $prev.on('click', function () {
        iNow--;
        iNow = iNow < 0 ? $smallLis.length - 1 : iNow;
        changeImg();
    });
    // 点击右箭头
    $next.on('click', function () {
        iNow++;
        iNow = iNow == $smallLis.length ? 0 : iNow;
        changeImg();
    });
    $layer.add($layerImg).add('.icon-cuowu', $layer).on('click', function (e) {
        e = e || window.event;
        var target = e.target;
        //如果不是左箭头
        if (target != $prev.get(0)) {
            // 如果不是右箭头
            if (target != $next.get(0)) {
                $layer.hide();
            }
        }
    });

    function changeImg() {
        $bigImgLis.eq(iNow).addClass('selected').siblings().removeClass('selected');
    }
});
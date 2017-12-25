$(function () {
    var index = 0;
    var $bgImgs = $('#bg .bgi');
    var carouselTimer = setInterval(function () {
        index++;
        if (index == $bgImgs.length - 1) {
            index = 0;
        }
        $bgImgs.eq(index).addClass('selected').siblings().removeClass('selected');
    }, 3000);
});
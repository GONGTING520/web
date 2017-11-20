$(function () {
    var timer;
    var iNow = 0;
    var $li = $('#nav li');
    $li.on('click', function () {
        iNow = $(this).index();
        $(this).add('#content .item:eq(' + iNow + ')')
            .addClass('selected').siblings().removeClass('selected');
    });
    play();
    $('#container').hover(function () {
        clearInterval(timer);
    }, function () {
        play();
    });

    function play() {
        timer = setInterval(function () {
            iNow++;
            iNow = iNow % $li.length;
            $li.eq(iNow).trigger('click');
        }, 2000);
    };
});
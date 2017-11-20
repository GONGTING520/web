$(function () {
    var timer;
    var iNow = 2;
    var $li = $('#info li');
    $li.on('mouseenter', function () {
        iNow = $(this).index();
        changeImg();
    });

    play();

    // 给大div设置滑入清除定时器，滑出开启定时器的事件
    $('#container').hover(function () {
        console.log(1);
        clearInterval(timer);
    }, function () {
        console.log(2);
        play();
    });

    function play() {
        timer = setInterval(function () {
            iNow = ++iNow % $li.length;
            changeImg();
        }, 2000);
    }

    function changeImg() {
        $li.eq(iNow).children('a').addClass('selected').end().siblings().children('a').removeClass('selected');
        $('#imgs li').eq(iNow).addClass('selected').siblings().removeClass('selected');
    }
});
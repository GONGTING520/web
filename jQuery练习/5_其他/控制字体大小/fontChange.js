$(function () {
    $('#bigger,#smaller').on('click', function () {
        var $p = $('#content p');
        // if (this.id == 'bigger') {
        //     $p.css({
        //         fontSize: '+=2'
        //     });
        // } else {
        //     $p.css({
        //         fontSize: '-=2'
        //     });
        // }
        this.id == 'bigger' ? $p.css({
            fontSize: '+=2'
        }) : $p.css({
            fontSize: '-=2'
        });
    });
});
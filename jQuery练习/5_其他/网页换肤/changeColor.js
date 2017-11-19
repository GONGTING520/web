$(function () {
    $('#skin li').on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        $('div').get(0).className = this.id;
        $('div').get(1).className = this.id;
    });
});
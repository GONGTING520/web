$(function () {
    $(".skills .skill-select .skill-info").on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $(this).index()
        $(".skills-introduce li").eq(index == 0 ? 0 : index - 1)
            .addClass('selected').siblings()
            .removeClass('selected');
    });
});
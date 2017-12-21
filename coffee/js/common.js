$(function () {
    var $author = $('#author');
    var $authorContainer = $('.authorContainer', $author);
    var $authorInfo = $('.info', $authorContainer);
    var $authorLeader = $('.group-leader', $authorInfo);
    var $authorLeaderName = $('.leader', $authorInfo);
    var $authorGroup = $('.member', $authorInfo);
    var $authorGroupName = $('.group', $authorInfo);
    $author.hover(function () {
        $authorContainer.stop().show(500);
    }, function () {
        $authorContainer.stop().hide(500);
    });
    $authorGroup.on('click', function () {
        $authorGroupName.toggle(500);
    });
    $authorLeader.on('click', function () {
        $authorLeaderName.toggle(300);
    });
});
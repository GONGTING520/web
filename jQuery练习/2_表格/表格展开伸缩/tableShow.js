$(function () {
    $('#row1,#row2,#row3').addClass('yellow').on('click', function () {
        $(this).toggleClass('selected').nextUntil('.yellow').toggleClass('dis-none');
    });
});
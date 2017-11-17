$(function () {
    $('#search').on('keyup', function () {
        $('table tbody tr').addClass('hidden');
        $('table tbody tr:contains(' + $(this).val() + ')').removeClass('hidden');
    });
});
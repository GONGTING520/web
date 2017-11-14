$(function () {
    $('table tbody tr:even').addClass('yellow');
    $('table tbody tr:odd').addClass('orange');
    $('table tbody tr').on('click', function () {
        $(this).addClass('selected').find('input[name="chioce"]').prop('checked', true);
        $(this).siblings().removeClass('selected');
    });
    $('table tbody tr:eq(2)').trigger('click');
});
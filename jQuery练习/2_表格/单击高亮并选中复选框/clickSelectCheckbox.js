$(function () {
    $('table tbody tr:even').addClass('yellow');
    $('table tbody tr:odd').addClass('orange');
    $('table tbody tr').on('click', function () {
        // var $Chioce = $(this).find('input[name="chioce"]');
        // if ($Chioce.prop('checked')) {
        //     $(this).removeClass('selected');
        // } else {
        //     $(this).addClass('selected');
        // }
        // $Chioce.get(0).checked = !$Chioce.get(0).checked;
        $(this).toggleClass('selected').find('input[name="chioce"]').prop('checked', function (index, oldValue) {
            return !oldValue;
        });
    });
    $('table tbody tr:eq(2)').trigger('click');
});
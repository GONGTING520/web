$(function () {
    $('table tbody tr:even').addClass('yellow');
    $('table tbody tr:odd').addClass('orange');
    $('table tbody tr').on('click', function () {
        var $Chioce = $(this).find('input[name="chioce"]');
        if ($Chioce.prop('checked')) {
            $(this).removeClass('selected');
        } else {
            $(this).addClass('selected');
        }
        $Chioce.get(0).checked = !$Chioce.get(0).checked;
    });
});
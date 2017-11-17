$(function () {
    $('table .name').on('click', function () {
        if ($(this).has("input").length == 0) {
            var sInput = '<input type="text" value="' + this.innerHTML + '">';
            this.innerHTML = sInput;
            $(this).find('input').select();//让input输入框全选
        }
    });
});
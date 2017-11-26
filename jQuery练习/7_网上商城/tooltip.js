/**
 * 实现功能，滑入元素动态显示提示框
 * 若元素没有title则提示框显示的是元素的内容
 * 输入滑入元素的选择器selector
 */
function toolTip(selector) {
    $(selector).hover(function () {
        $('#tip').remove();
        this.tempTitle = $(this).attr('title') != undefined ? this.title : this.innerHTML;
        $('<div id="tip">' + this.tempTitle + '</div>').css({
            position: 'absolute',
            zIndex: 999,
            fontSize: 14,
            display: 'none',
            background: '#ebe995',
            border: '1px solid'
        }).insertAfter($(this)).show(100);
        this.title = '';
    }, function () {
        $('#tip').hide(200);
        this.title = this.tempTitle;
    }).on('mousemove', function (e) {
        $('#tip').offset({
            left: e.pageX + 15,
            top: e.pageY + 15
        });
    });
}
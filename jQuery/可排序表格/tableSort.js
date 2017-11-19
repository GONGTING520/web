$(function () {
    var $tbl = $('#tbl');
    var $tbody = $('tbody', $tbl);
    $('thead th', $tbl).on('click', function () {
        // 将其他元素的默认排序方式重置
        $(this).siblings().data('sort', 'asc');
        // 获取当前元素的排序方式
        var sType = $(this).data('sorttype');
        // 获取当前元素的索引
        var iIndex = $(this).index();
        // 获取当前元素的默认排序是升序还是降序
        var sSort = $(this).data('sort');
        var arr = [];
        // 获取所有的tr
        $('tr', $tbody).each(function () {
            arr.push(this);
        });
        // 排序tr
        arr.sort(function (a, b) {
            var aHtml = a.children[iIndex].innerHTML;
            var bHtml = b.children[iIndex].innerHTML;
            if (sType == 'number') {
                return sSort == 'asc' ? aHtml - bHtml : bHtml - aHtml;
            } else {
                return sSort == 'asc' ? aHtml.localeCompare(bHtml) : bHtml.localeCompare(aHtml);
            }
        });
        $(this).data('sort', sSort == 'asc' ? 'desc' : 'asc');
        // 将排好的内容插入tbody
        $tbody.empty();
        for (var i = 0; i < arr.length; i++) {
            $tbody.append(arr[i]);
        }
    });
});
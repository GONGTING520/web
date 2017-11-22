/**
 * 定义一个可以排序表格的类
 * 传入一个对象参数，包括表格的id，可以排序的列数和排序方式
 * */
function SortTable(option) {
    var $tbl = $(option.el); //获取要排序的表格
    var $tbody = $('tbody', $tbl);
    var aSortLi = option.sort; //获取排序数组中的数据
    // 获取所有的tr
    var arrTr = [];
    $('tr', $tbody).each(function () {
        arrTr.push(this);
    });
    //获取表头,并绑定点击事件
    $('th', $tbl).each(function (index) {
        for (var i = 0; i < aSortLi.length; i++) {
            if (aSortLi[i].index == index) {
                // 给相应的th加对应的排序方式和默认排序
                $(this).data({
                    type: aSortLi[i].type,
                    default: aSortLi[i].default
                }).on('click', function () {
                    // 首先先将当前th的兄弟的默认排序重置
                    $(this).siblings().data('default', 'asc');
                    // 获取当前th的排序方式和默认排序
                    var sType = $(this).data('type');
                    var sDefault = $(this).data('default');
                    // 点击的时候排序
                    arrTr.sort(function (a, b) {
                        // 获取表格相应列的内容
                        var aHTML = a.children[index].innerHTML;
                        var bHTML = b.children[index].innerHTML;
                        // 若类型为数字
                        if (sType == 'number') {
                            return sDefault == 'asc' ? aHTML - bHTML : bHTML - aHTML;
                        } else {
                            return sDefault == 'asc' ? aHTML.localeCompare(bHTML) : bHTML.localeCompare(aHTML);
                        }
                    });
                    // 修改当前th的默认排序
                    sDefault == 'asc' ? $(this).data('default', 'desc') : $(this).data('default', 'asc');
                    // 将排序结果替换原来的tr
                    $tbody.empty();
                    for (var i = 0; i < arrTr.length; i++) {
                        $tbody.append(arrTr[i]);
                    }
                });
            }
        }
    });
}
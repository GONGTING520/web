define(['isArray'], function (isArray) {
    function sort(arr) {
        if (isArray(arr)) {
            return arr.sort(function (a, b) {
                return a - b;
            });
        } else {
            return '您传的不是数组！';
        }
    }
    return sort;
});
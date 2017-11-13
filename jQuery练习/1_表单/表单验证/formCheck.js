$(function () {
    var sErrorName = '请输入至少6位用户名.';
    var sErrorEmail = '请输入正确的E-mail地址.';
    var sCorrect = '输入正确.';
    var reg = /^.+@.+\.[a-z]{2,4}$/i;

    // 给用户名的文本框添加键盘事件
    $('#username,#email').on('focus', function () {
        var $parent = $(this).parent();
        // 判断原来是否有此标签，若有则移除
        var $prompt = $parent.children('.prompt');
        $prompt ? $prompt.remove() : null;
        if (this.id == 'username') {
            // 判断条件是否成立来添加新得
            if ($(this).val().length < 6) {
                $parent.append('<span class="prompt error">' + sErrorName + '</span>');
            } else {
                $parent.append('<span class="prompt correct">' + sCorrect + '</span>');
            }
        } else {
            // 判断条件是否成立来添加新得
            if (!reg.test(this.value)) {
                $parent.append('<span class="prompt error">' + sErrorEmail + '</span>');
            } else {
                $parent.append('<span class="prompt correct">' + sCorrect + '</span>');
            }
        }
    }).on('keyup', function () {
        $(this).triggerHandler("focus");
    }).on('blur', function () {
        $(this).triggerHandler("focus");
    });

    $('#reset').on('click', function () {
        var $prompt = $('#uname,#ema').children('.prompt');
        // 移除所有后加上的东西
        $prompt.each(function () {
            $prompt.remove();
        });
    });

    $('#submit').on('click', function () {
        if ($('.correct').length == 2) {
            alert('注册成功，你的密码已发到你的邮箱，请查收');
        } else {
            return false;
        }
    });
});
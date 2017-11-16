$(function () {
    var sErrorName = '请输入至少6位用户名.';
    var sErrorEmail = '请输入正确的E-mail地址.';
    var sCorrect = '输入正确.';
    var reg = /^.+@.+\.[a-z]{2,4}$/i;

    // 给用户名的文本框添加键盘事件
    $('#username,#email').on('focus', function () {
        var $parent = $(this).parent();
        if (this.id == 'username') {
            // 判断条件是否成立来让正确的显示
            if ($(this).val().length < 6) {
                $parent.find('.error').removeClass('hidden');
                $parent.find('.correct').addClass('hidden');
            } else {
                $parent.find('.correct').removeClass('hidden');
                $parent.find('.error').addClass('hidden');
            }
        } else {
            // 判断条件是否成立来添加新得
            if (!reg.test(this.value)) {
                $parent.find('.error').removeClass('hidden');
                $parent.find('.correct').addClass('hidden');
            } else {
                $parent.find('.correct').removeClass('hidden');
                $parent.find('.error').addClass('hidden');
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
            $prompt.addClass('hidden');
        });
    });

    $('#submit').on('click', function () {
        console.log($('.error.hidden').length);
        if ($('.error.hidden').length == 2 && $('.correct.hidden').length == 0) {
            alert('注册成功，你的密码已发到你的邮箱，请查收');
        } else {
            return false;
        }
    });
});
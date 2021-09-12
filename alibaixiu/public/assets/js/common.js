$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗？');
    if (isConfirm) {
        // alert('用户点击了确认按钮');
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                // 退出成功
                location.href = 'login.html';
            },
            error: function() {
                // 退出失败
                alert('退出失败');
            }
        });
    }
});

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    // 返回拼接好的字符串
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 向服务器端发送请求 索要登录用户的详细信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        // console.log(response);
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
});
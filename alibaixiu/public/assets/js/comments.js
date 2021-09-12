// 向服务器发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        // 将服务器传回的数据进行拼接
        var html = template('commentsTpl', response);
        // 将拼接好的字符串渲染到页面中
        $('#commentsBox').html(html);
        // 将分页列表数据进行拼接
        var pageHTML = template('pageTpl', response);
        // 将拼接好的数据渲染到页面中
        $('#pageBox').html(pageHTML);
    }
});

// 分页按钮被点击时
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            // 将服务器传回的数据进行拼接
            var html = template('commentsTpl', response);
            // 将拼接好的字符串渲染到页面中
            $('#commentsBox').html(html);
            // 将分页列表数据进行拼接
            var pageHTML = template('pageTpl', response);
            // 将拼接好的数据渲染到页面中
            $('#pageBox').html(pageHTML);
        }
    });
}

// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function() {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            // 如果更改成功刷新页面
            location.reload();
        }
    });
});

// 当管理员点击删除按钮时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗？')) {
        // 获取当前要删除的评论id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                // 执行成功 刷新页面
                location.reload();
            }
        });
    }
});
// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        // 将服务器端传回的数据进行拼接
        var html = template('postsTpl', response);
        // 将拼接好的字符串渲染到页面
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

// 向服务器端发送请求 获取分页数据
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            // 将服务器端传回的数据进行拼接
            var html = template('postsTpl', response);
            // 将拼接好的字符串渲染到页面
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        // 将服务器端传回的数据进行拼接
        var html = template("categoryTpl", { data: response });
        // console.log(html);
        // 将拼接好的数据渲染到页面中
        $('#categoryBox').html(html);
    }
});

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            // 将服务器端传回的数据进行拼接
            var html = template('postsTpl', response);
            // 将拼接好的字符串渲染到页面
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    // 阻止表单默认提交行为
    return false;
});

// 当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function() {
    // 弹出删除确认框 和管理员确认是否真的要进行删除操作
    if (confirm('您真的要进行删除操作吗？')) {
        // 获取到管理员要删除的文章的id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                // 删除成功刷新页面
                location.reload();
            }
        });
    }
});
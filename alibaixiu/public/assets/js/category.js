// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            // 添加成功 刷新页面
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});

// 发送ajax请求 向服务器端索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        // 将服务器端返回的数据和HTML模板进行拼接
        var html = template('categoryListTpl', {
            data: response
        });
        // console.log(html);
        // 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            // console.log(response);
            // 拼接服务器端传过来的数据
            var html = template('modifyCategoryTpl', response);
            // console.log(html);
            // 就数据渲染到页面中
            $('#formBox').html(html);
        }
    });
});

// 当修改分类数据表单发送提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id');
    // 发送请求修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        success: function() {
            // 刷新页面
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
});

// 当用户点击删除按钮的时候
$('#categoryBox').on('click', '.delete', function() {
    // 获取要删除用户的id
    var id = $(this).attr('data-id');
    if (confirm('您真的要执行删除操作吗？')) {
        // 向服务器端发送删除分类的请求
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                // 刷新页面
                location.reload();
            }
        });
    }
});
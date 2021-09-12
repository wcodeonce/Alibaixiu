// 向服务器端发送请求 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        // 拼接服务器端传回来的数据
        var html = template('categoryTpl', { data: response });
        // 将拼接好的数据渲染到页面中
        $('#category').html(html);
    }
});

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function() {
    // 获取到管理员选择到的图片
    var file = this.files[0];
    // 创建formData对象
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章图片的上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉 $.ajax 方法不要处理data属性对应的参数
        processData: false,
        // 告诉 $.ajax 方法不要设置参数类型
        contentType: false,
        success: function(response) {
            // console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    });
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    });
    // 阻止表单默认提交的行为
    return false;
});

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// console.log(id);
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        strictPopulate: false,
        success: function(response) {
            // console.log(response);
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    response.categories = categories;
                    // console.log(response);
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            });
        }
    });
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}

// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取管理员要修改的文章id值
    var id = $(this).attr('data-id');
    // 向服务器端发送请求
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    });
    // 阻止表单默认提交的行为
    return false;
});
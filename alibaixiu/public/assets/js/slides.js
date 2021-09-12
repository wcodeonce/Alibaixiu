// 当管理员选择文件的时候
$('#file').on('change', function() {
    // 用户选择到的文件
    var file = this.files[0];
    // 创建formData对象 实现二进制文件的上传
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append('image', file);
    // 向服务器端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉 $.ajax 不要处理formData的格式
        processData: false,
        // 告诉 $.ajax 不要不要设置 contentType 这个属性的值
        contentType: false,
        success: function(response) {
            // console.log(response[0].image);
            $('#image').val(response[0].image);
        }
    });
});

// 当轮播图发生提交行为时
$('#slidesForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function() {
            // 刷新页面 显示最新数据
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});


// 向服务器端发送请求 索要轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        // console.log(response);
        // 将服务器返回的数据进行数据拼接
        var html = template('slidesTpl', {
            data: response
        });
        // 将拼接好的数据渲染到页面
        $('#slidesBox').html(html);
    }
});

// 当管理员点击删除轮播图
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('您真的要进行删除操作吗？')) {
        // 获取到要删除轮播图的id
        var id = $(this).attr('data-id');
        // console.log(id);
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                // 执行删除操作成功 刷新页面
                location.reload();
            }
        });
    }

});
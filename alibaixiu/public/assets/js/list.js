// 获取地址栏中的 categoryId 参数
var categoryId = getUrlParams('categoryId');

// 根据分类id获取文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(response) {
        // console.log(response);
        // 将文章列表数据和模板进行拼接
        var html = template('listTpl', {
            data: response
        });
        // 将拼接好的模板数据渲染到页面中
        // console.log(html);
        $('#listBox').html(html);
    }
});

// 根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        // console.log(response);
        // 将文章标题进行输出
        $('#categoryTitle').html(response.title);
    }
});
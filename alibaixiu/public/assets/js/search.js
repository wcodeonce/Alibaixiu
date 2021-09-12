// 获取到浏览器地址栏中的搜索关键字
var key = getUrlParams('key');

// 根据搜索关键字调用搜索接口 获取搜索结果
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(response) {
        // console.log(response);
        // 将搜索结果和模板进行拼接
        var html = template('searchTpl', {
            data: response
        });
        // 将拼接好的数据模板渲染到页面
        $('#listBox').html(html);
    }
});
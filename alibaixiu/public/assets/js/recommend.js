// 向服务器端发送请求 索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        // console.log(response);
        // 定义模板字符串
        // 为了将模板变成公共的 所以将模板写在了js文件中
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="/detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        // 将返回的数据进行拼接 使用render进行模板渲染
        var html = template.render(recommendTpl, {
            data: response
        });
        // 将拼接好的模板字符串数据渲染到页面
        // console.log(html);
        $('#recommendBox').html(html);
    }
});
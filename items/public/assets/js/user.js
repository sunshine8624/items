
// // 向服务器端发送请求 索要用户列表数据
// $.ajax({
// 	type: 'get',
// 	url: '/users',
// 	success: function (response) {
// 		console.log(response)
// 		// 使用模板引擎将数据和HTML字符串进行拼接
// 		var html = template('userTpl', { data: response });
// 		// 将拼接好的字符串显示在页面中
// 		$('#userBox').html(html);
// 	}
// });

// // 通过事件委托的方式为编辑按钮添加点击事件
// $('#userBox').on('click', '.edit', function () {
// 	// 获取被点击用户的id值
// 	var id = $(this).attr('data-id');
// 	// 根据id获取用户的详细信息
// 	$.ajax({
// 		type: 'get',
// 		url : '/users/' + id,
// 		success: function (response) {
// 			console.log(response)
// 			var html = template('modifyTpl', response);
// 			$('#modifyBox').html(html);
// 		}
// 	})
// });

// // 为修改表单添加表单提交事件
// $('#modifyBox').on('submit', '#modifyForm', function () {
// 	// 获取用户在表单中输入的内容
// 	var formData = $(this).serialize();
// 	// 获取要修改的那个用户的id值
// 	var id = $(this).attr('data-id');
// 	// 发送请求 修改用户信息
// 	$.ajax({
// 		type: 'put',
// 		url: '/users/' + id,
// 		data: formData,
// 		success: function (response) {
// 			// 修改用户信息成功 重新加载页面
// 			location.reload()
// 		}
// 	})

// 	// 阻止表单默认提交
// 	return false;
// });








// 当用户提交表单信息的时候 给表单添加submmit事件
// 并阻止它默认的提交行为 防止数据还没有写完就自动提交上去了
$('#userForm').on('submit',function(){
    // 将表单内容转换成字符串
    let formData = $(this).serialize()
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(response){
            // reload刷新页面
            location.reload();
        },
        error:function(response){
          alert('您的输入有误，请重新输入')
        }
    });
    return flase;
});

//  当用用户在提交资料的时候 同时也上传的头像的图片
//  获取表单并给表单绑定change事件
$('#avatar').on('change',function(){
    // 创建formdata 获取表单中图片的信息 转换类型留给ajax封装函数就可以了
    let formData = new FormData();
    // 将选择的文件添加到formdata表单里面
    formData.append('avatar',this.files[0])
    // ajax发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 让ajax不解析fordata的内容 不然后面是拿不到具体的地址的 图片预览也显示不出来的
        processData:false,
        // 让ajax 不设置请求的方式 ajax有一个默认的请求方式   这里已经设置新的请求方式了
        contentType:false,
      success:function(response){
          // 传回来的是数据库返回的地址和图片信息
         console.log(response);
         //默认的图片设置src属性 并给它赋予新图片上传的地址 利用attr来设置
        // 上传图片的显示 avatar 这个是接口文档给的参数名 不能随便该 表达的是一个图片地址
        $('#preview').attr('src',response[0].avatar)
         // 在html中设置一个隐藏域 将上传成功的信息放在里面 并和表单里面的其他数据一起提交
         $('#hiddenAvatar').val(response[0].avatar);
      }

    });
});
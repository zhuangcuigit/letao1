$(function(){

//  校验  发送ajax验证
var $form = $('form');
$form.bootstrapValidator({
  // 配置校验的图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  // 配置校验的规则
  fields: {
    username: {
      validators: {
        notEmpty: {
          message: '用户名不能为空'
        },
        stringLength: {
          message: '用户名长度为3-9位',
          min:3,
          max:9
        },
        callback: {
          message: '用户不存在'
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          message: '密码不能为空'
        },
        stringLength: {
          message: '密码长度是6-12位',
          min: 6,
          max: 12
        },
        callback: {
          message: '密码错误'
        }
      }
    }
  }

});

// 注册校验成功事件
$form.on('success.form.bv',function(e){

  // 阻止浏览器的默认行为
  e.preventDefault();

  // 发送ajax请求
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data: $form.serialize(),
    success:function(info){
      console.log(info);

      if(info.success){
        location.href = "index.html";
      }
      if(info.error == 1000){
        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
      }
      if(info.error == 1001){
        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
      }
    },
    error:function(err){
      
    }
  });

});




});
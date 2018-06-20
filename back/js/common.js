
//全局
// 进度条功能
NProgress.configure({ showSpinner: false } );  //禁用进度环

$(document).ajaxStart(function(){
  NProgress.start();  //所有的ajax开始时，进度条开始
});

$(document).ajaxStop(function(){
  NProgress.done();  //所有的ajax结束时，进度条结束
});

// 判断是否是登录了，没有登录跳到登录页
if(location.href.indexOf('login.html') == -1){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    data:null,
    success:function(info){
      if(info.error == 400){
        location.href = 'login.html';
      }
    }
  });
}

// 点击分类管理，出现二级菜单
$('.first').on('click',function(){
  $('.second').slideToggle();
});

// 点击左边图标，菜单隐藏

$('.btn-hidden').on('click',function(){
  $('.aside').toggleClass('now');
  $('.content').toggleClass('now');
 
});

// 点击右边鼠标，退出
$('.btn-drop').on('click',function(e){
  $('#logoutModal').modal('show');

  $('.btn-confirm').on('click',function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      data:null,
      success:function(info){
        if(info.success){
          location.href = 'login.html';
        }
      }
    });
  });
  
});



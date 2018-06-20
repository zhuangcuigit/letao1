$(function(){

  var page = 1;
  var pageSize = 5;

  render();

  function render(){

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        
        var html = template('tpl',info);
        $('tbody').html(html);

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        });
      }
    });
  }

  $('.add').on('click',function(){

    // 显示模态框
    $('#addCategory').modal('show');

  });
  // 添加数据，然后渲染
  $('.btn-add').on('click',function(){
   
    // 先校验，然后发送ajax
    var $form = $('#addForm');
    
    $form.bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryName: {
          validators: {
            notEmpty: {
              message: "请输入一级分类的名称"
            }
          }
        }
      }
    });

    // 注册表单验证成功事件
    $form.on('success.form.bv',function(e){
      e.preventDefault();
      
      $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$form.serialize(),
        success:function(info){
          if(info.success){
            // 关闭模态框 渲染第一页 模态框中的数据重置
            $('#addCategory').modal('hide');
            page = 1;
            render();
            $form.data('bootstrapValidator').resetForm();
          }
          
        }
      });
    });


   
  });
 


  
});
$(function(){

  var page = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        console.log(info);
        var html = template('tpl',info);
        $('tbody').html(html);
  
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/pageSize),
          onPageClicked: function(a,b,c,p){
            page = p;
            render();
          }
        });
        
      }
    });
  }

  $('.add').on('click',function(){
    $('#addBrand').modal('show');
  });

  

});
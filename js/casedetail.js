$(function(){
    if($(".fl_r").attr("casetype") == "zx")
    {
        var slip = $('.li-mask');
        var a = $('.o-m .ul-o li:first');
        //初始化滑块
        slip.css({
          'top': parseInt(a.position().top) + 'px'
        });
        var _line=parseInt($(window).height()/2);
        $(window).scroll(function(){
          $('.fl_l li').eq(0).addClass('active');
          //滚动到标杆位置,左侧导航加active
          $('.fl_r li').each(function(){
            var _target=parseInt($(this).offset().top-$(window).scrollTop()-_line);
            var _i=$(this).index();
            if (_target<=-124) {
                $('.fl_l li').removeClass('active');
                $('.fl_l li').eq(_i).addClass('active');
                slip.stop().animate({
                  top: parseInt($('.fl_l li').eq(_i).position().top) + 'px'
                }, 300);
                $(".li-mask").find("p").html($('.fl_l li').eq(_i).html());
            }
            //如果到达页面底部，给左侧导航最后一个加active
            else if($(document).height()==$(window).scrollTop()+$(window).height()){
              $('.fl_l li').removeClass('active');
              $('.fl_l li').eq($('.fl_r li').length-1).addClass('active');
            }
          });
        });
        $('.fl_l li').click(function(){

          //$(this).addClass('active').siblings().removeClass('active');
          var _i=$(this).index();
          var t = _i+1;
          if ($('.fl_r li').length > t) {
            $('body, html').animate({scrollTop:$('.fl_r li').eq(t).offset().top-_line-10},500);
          }
          else{
            $('body, html').animate({scrollTop:$('.fl_r li').eq(_i).offset().top-_line+300},500);
          }
           
        });
        $('.o-m .ul-o li').mouseover(function () {
          //显示滑块
          if (slip.css('display') == 'none') {
            slip.show();
          };
          //移动滑块
          slip.stop().animate({
            top: parseInt($(this).position().top) + 'px'
          }, 300);
        });

        $(".fl_l li").hover(function(){
            var xuhao = $(this).index();
            $(".li-mask").find("p").html($(this).html());
            $(".li-mask").attr("onclick","maodian("+xuhao+","+_line+")");
        });
    }
});

function maodian(xuhao,_line){

    var _i=xuhao;
    var t = _i+1;

    if ($('.fl_r li').length > t) {
      $('body, html').animate({scrollTop:$('.fl_r li').eq(t).offset().top-_line-10},500);
    }
    else{
      $('body, html').animate({scrollTop:$('.fl_r li').eq(_i).offset().top-_line+300},500);
    }
}
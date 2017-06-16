var _line = 0;
var xuhao = 0;
var tops = 0;
var beishu = 640;
$(function(){
  beishu = $(window).height();
    $(".li-mask").click(function(){
        maodian();
    });

        var slip = $('.li-mask');
        var a = $('.o-m .ul-o li:first');
        //初始化滑块
        slip.css({
          'top': parseInt(a.position().top) + 'px'
        });
        _line=parseInt($(window).height()/2);
        $(window).scroll(function(){
          $('.fl_l li').eq(0).addClass('active');
          //滚动到标杆位置,左侧导航加active
          $('.fl_r li').each(function(){
            var _target=parseInt($(this).offset().top-$(window).scrollTop()-_line);
            var _i=$(this).index();
            if(beishu <= 640){
                tops = -124;
            }
            else{
                tops = -60;
            }
            if (_target<=tops) {
                $('.fl_l li').removeClass('active');
                $('.fl_l li').eq(_i).addClass('active');
                slip.stop().animate({
                  top: parseInt($('.fl_l li').eq(_i).position().top) + 'px'
                }, 300);
                $(".li-mask").find("p").html($('.fl_l li').eq(_i).html());
            }
            else if(_target >= 240){
                slip.stop().animate({
                  top: parseInt($('.fl_l li').eq(0).position().top) + 'px'
                }, 300);
            }
            //如果到达页面底部，给左侧导航最后一个加active
            else if($(document).height()==$(window).scrollTop()+$(window).height()){
              $('.fl_l li').removeClass('active');
              $('.fl_l li').eq($('.fl_r li').length).addClass('active');
            }
            console.log(_target);
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
            xuhao = $(this).index();
            $(".li-mask").find("p").html($(this).html());
            // $(".li-mask").attr("onclick","maodian("+xuhao+","+_line+")");
            // console.log($(".li-mask").attr("onclick"));
        });

});

function maodian(){
    var _i=xuhao;
    var t = _i+1;
    var y=0;
    if(beishu <= 640){
        switch(_i){
          case 0:
            y=-50;
          break;
          case 1:
            if($('.fl_r li').length == 2){
                y=280;
            }
            else{
                 y=-120;
            }
          break;
          case 2:
            y=160;
          break;
          default:
            y=160;
          break;
        }
    }
    else{
        switch(_i){
          case 0:
            y=-250;
          break;
          case 1:
            if($('.fl_r li').length == 2){
                y=240;
            }
            else{
                 y=-120;
            }
           
          break;
          case 2:
            y=160;
          break;
          default:
            y=180;
          break;
        }      
    }

    if ($('.fl_r li').length > t) {
      $('body, html').animate({scrollTop:$('.fl_r li').eq(t).offset().top-_line+y},500);
    }
    else{
      $('body, html').animate({scrollTop:$('.fl_r li').eq(_i).offset().top-_line+y},500);
    }
}
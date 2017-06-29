/**
 * Created by ASUS on 2017/6/2.
 */

$(function(){
    var is_running=false;
    $(window).on("scroll",function(){
        //头部 吸顶功能
        var flag=false;
        var banner_top=$(".banner").offset().top;
        var offset_top=$(window).scrollTop();

        if(offset_top>banner_top){
            $(".header_dark").slideUp();
        }else {
            $(".header_dark").slideDown();
        }
        //section 背景图片出现
        $(".introduce li span").eq(0).animate({"top":"0","opacity":"1"},800,function(){
            $(".introduce li span").eq(1).animate({"top":"0","opacity":"1"},800,function(){
            $(".introduce li span").eq(2).animate({"top":"0","opacity":"1"},800);
            });
        });


        //博士用户数字变化动画
        var num_start=$(".education").offset().top-300;
        var offset_bottom=offset_top+$(window).height();
        if(offset_bottom>num_start&&!is_running) {
            is_running = true;
            //数数动画函数
            function num_change( obj, max_num, text_num, interval) {
                var i = 0;
                obj.timer = setInterval(function () {
                    i++;
                    obj.text(i);
                    if (i > max_num) {
                        clearInterval(obj.timer);
                        obj.text(text_num);
                    }
                }, interval);
            }
            //获取对象
            var oSchool=$("#school_num");
            var oTeacher=$("#teacher_num");
            var oParent=$("#parent_num");
            var oStudent=$("#student_num");
           //执行数数动画函数
            num_change(oSchool,130,131,10);
            num_change(oTeacher,300,5418,1);
            num_change(oParent,400,124517,1);
            num_change(oStudent,500,187322,1);
        }
        if(offset_bottom<num_start){
            is_running=false;
        }

        //回到顶部部分
        if(offset_top>300){
            $(".back_top").stop().fadeTo(200,1);
        }else{
            $(".back_top").stop().fadeTo(200,0);
        }
        $(".back_top").click(function(){
            $("html body").stop().animate({scrollTop:0},500);
        });
    });
    //头部吸顶结束
    //导航二级菜单开始
    $(".nav>li").hover(function(){
        //var li_index=$()
        $(this).find("ul").stop().slideDown(500);
    },function(){
        $(this).find("ul").stop().slideUp(200);
    });
    //导航二级菜单结束
    //banner轮播开始
    function carousel(){
        var timer=null;
        var img_index=2;//记录图片索引
        var flag=false;
        function rightSlide(){
            img_index++;
            var li_Length=$(".banner_img li").length;
            if(img_index>li_Length-1){
                img_index=0;
            }
            //banner动画
            if(img_index==1){

                $(".banner_text").fadeIn();
                $(".banner_text .text_h2").css({"animation":"move 0.3s linear 1s","animation-fill-mode":"forwards"});
                $(".banner_text .text_h3").css({"animation":"h3move 0.3s linear 2s","animation-fill-mode":"forwards"});
                $(".banner_text p").css({"animation":"pmove 0.3s linear 3s","animation-fill-mode":"forwards"});
            }else{
                $(".banner_text").fadeOut();
            }
            $(".banner_img li").eq(img_index).siblings().fadeOut("2s");
            $(".banner_img li").eq(img_index).fadeIn("5s",function(){flag=false;});
        }
        $(".left_arrow").click(function() {
            if(flag) return;
            flag=true;
            img_index--;
            var li_Length=$(".banner_img li").length;
            if(img_index<0){
                img_index=li_Length-1;
            }
            //banner动画
            if(img_index==1){

                $(".banner_text").fadeIn();
                $(".banner_text .text_h2").css({"animation":"move 0.3s linear 1s","animation-fill-mode":"forwards"});
                $(".banner_text .text_h3").css({"animation":"h3move 0.3s linear 2s","animation-fill-mode":"forwards"});
                $(".banner_text p").css({"animation":"pmove 0.3s linear 3s","animation-fill-mode":"forwards"});
            }else{
                $(".banner_text").fadeOut();
            }
            $(".banner_img li").eq(img_index).siblings().fadeOut("2s");
            $(".banner_img li").eq(img_index).fadeIn("5s",function(){flag=false;});

        });
        $(".right_arrow").click(function() {
            if(flag) return;
            flag=true;
           rightSlide();
        });
        setInterval(function(){
            rightSlide();
        },10000)
    }
    carousel();
    //carousel结束
    //教育平台部分
    (function slide(){var li_index=0;//记录将要显示的图片
    var li_wid=$(".education_introduce li").width();
    var flag=false;
    var li_quanlity=$(".education_introduce li").length;
        //设置图标
    for(var i=0;i<5;i++){
            $(".education_introduce li").eq(i).css({background:'url("images/education'+(i+1)+'.png") 50px 0 no-repeat'});
        }
        //点击左右箭头滑动效果
    $(".education #left_arrow ").click(function(){
        if(flag)return;
        flag=true;
        li_index--;
        if(li_index<0){
            li_index=4;
            $(".education_introduce").css({left:-li_wid*5});

        }
        $(".education_introduce").animate({left:-li_index*li_wid},300,function(){flag=false})
    });
    $(".education #right_arrow").click(function(){
        if(flag) return;
        flag=true;
        li_index++;
        if(li_index>5){
            li_index=1;
            $(".education_introduce").css({left:0});
        }
        $(".education_introduce").animate({left:-li_wid*li_index},500,function(){flag=false});

    });
    })();

    //功能部分特效
    var img_index;
    var arrM=[];
    var li_len=$("#function_content li").length;

    //显示图标
    for(var i=0;i<li_len-1;i++){
        $(".function  .function_mask .function_maskSp").eq(i).css({backgroundPosition:"-94px "+(-112*i)+"px"});
        $(".function .container ul li span").eq(i).css({backgroundPosition:"0 "+(-112*i)+"px"});
    }
    var view_wid=$(".function_view").width();
    $("#function_content li").hover(function(){
        $(this).find(".function_mask").css({display:"block"});
        img_index=$("#function_content li").index($(this));
        $(".function_img").eq(img_index).siblings().hide();
        $(".function_img").eq(img_index).show().css({left:view_wid}).stop().animate({
            left:0}
        );

    },function(){
        $(this).find(".function_mask").css({display:"none"});
    });





})
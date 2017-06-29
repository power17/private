$(function(){
    //定义全局变量
    var index=0;//第几层
    var timer=null;
    hideEle(index);
    //右边指示器点击
    $('.navigation li').on('click',function(){
        //定义变量
        index=$(this).index();
        //操作Dom
        $(this).addClass('current').siblings().removeClass('current');
        $('section').eq(index).show().siblings('section').hide();
        hideEle(index);
        console.log(index);
        drop();
    });

    $(window).mousewheel(function(event){
        var pageLength=$('.navigation li').length-1;
        clearInterval(timer);
        timer=setTimeout(function(){
            index-=event.deltaY;
            if(index<0){
                index=0;
            }else if(index>pageLength){
                index=pageLength;
            }
            $('section').eq(index).show().siblings('section').hide();
            $('.navigation li').eq(index).addClass('current').siblings().removeClass('current');
            hideEle(index);
            drop();
        },400)

    })
    //显示隐藏元素
    function hideEle(index){
        if(index==0){
            $('.header_left').hide();
            $('.scroll').show();
        }else{
            $('.header_left').show();
            $('.scroll').hide();
        }
    }
    //落空效果
    function drop(){
        setTimeout(function(){
            $('section').eq(index).removeClass('current').siblings('section').addClass('current')
        },10)

    }

});


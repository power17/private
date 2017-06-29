window.onload=function(){
    //改变头部透明度
    changeHeaderAlpha();
    //无限轮播
    activeBanner();
    seckillTime();

}

//改变头部透明度
function changeHeaderAlpha(){
    var topbar=document.getElementsByClassName('jd_topbar')[0];
    var banner=document.getElementsByClassName('jd_banner')[0];
    var bannerH=banner.offsetHeight;
    var scrollTop;
    var maxAlpha=0.8;
    var alpha=0;
    window.onscroll=function(){
        scrollTop=document.body.scrollTop;
        if(scrollTop<bannerH){
            alpha=maxAlpha*(scrollTop/bannerH);
        }else{
            alpha=maxAlpha;
        }
        topbar.style.background='rgba(201, 21, 35,'+alpha+')';
    }
}
//焦点图
function activeBanner(){
    //获取标签
    var banner=document.getElementsByClassName('jd_banner')[0];
    var ul=banner.getElementsByTagName('ul')[0];
    var lis=ul.getElementsByTagName('li');
    var ol=banner.getElementsByTagName('ol')[0];
    var pages=ol.getElementsByTagName('li');
    //获取常量和变量
    var bannerW=banner.offsetWidth;
    var index=1;
    var duration=1000;
    var curx=0;
    var timer=null;
    //设置过度、移除过渡、设置水平方向位移
    function setTransition(){
        ul.style.transition='all .2s ease';
        ul.style.webkitTransition='all .2s ease';
    }
    function  removeTransition(){
        ul.style.transition='none';
        ul.style.webkitTransition='none';
    }
    function changeTranslateX(x){
        ul.style.transform='translateX('+x+'px)';
        ul.style.webkitTransform='translateX('+x+'px)';
    }
    //开始定时器滚动
    timer=setInterval(scrollImg,duration);
    function scrollImg(){
        index++;
        curx=-index*bannerW;
        setTransition();
        changeTranslateX(curx);
    }

    function keepIndexSafe() {

        // 4.2.1若滚动到边界则进行index转移
        if(index >= lis.length - 1){
            index = 1;
        }else if (index <= 0){
            index = 8;
        }
        // 4.2.2非过渡位移
        curx = -index * bannerW;

        removeTransition();
        changeTranslateX(curx); // 尽量不要使用 计算来代替参数
        // 4.2.3执行currentPage变化
        currentPageChange();
    }
    ul.addEventListener('transitionEnd',keepIndexSafe);
    ul.addEventListener('webkitTransitionEnd',keepIndexSafe);
    function currentPageChange(){
        var pageIndex=index-1;
        console.log(index);
        for (var i = 0; i < pages.length; i++) {
            pages[i].className='';
        }
        pages[pageIndex].className='current';
    }
    //二、手势滑动
    var starX,moveX,changeX;
    starX=0;
    moveX=0;
    changeX=0;
    ul.addEventListener('touchstart',function(e){
        clearInterval(timer);
        starX= e.touches[0].clientX;
    });
    ul.addEventListener('touchmove',function(e){
        e.preventDefault();
        moveX=e.touches[0].clientX;
        changeX=moveX-starX;
        removeTransition();
        curx=-index*bannerW+changeX;
        changeTranslateX(curx)
    });
    ul.addEventListener('touchend',function(e){
        if(changeX>0.49*bannerW){
            index--;
        }else if(changeX<-0.49*bannerW){
            index++;
        }
        curx=-index*bannerW;
        setTransition();
        changeTranslateX(curx);
        timer=setInterval(scrollImg,duration);
        moveX=0;
        starX=0;
        changeX=0;
    })
}
//倒计时
function seckillTime(){
    var timer=document.getElementsByClassName('main_timer')[0];
    var em=timer.getElementsByTagName('em')[0];
    var spans=timer.getElementsByTagName('span');
    setInterval(function(){
        var now=new Date();
        var nowH=now.getHours();
        var nowM=now.getMinutes();
        var nowS=now.getSeconds();
        var nth=0;
        var leftH=0;
        var leftM=0;
        var leftS=0;
        if(nowH>0&&nowH<8){
            nth=0;
        }else {
            var n=8;
            nth=Math.floor(nowH/n)*n;
        }
        leftH=nowM==0&&nowS==0? 8-(nowH-nth) : 7-(nowH-nth);
        leftM=nowS==0? 60-nowM : 59-nowM;
        leftS=nowS==0? 0 : 59-nowS;
        spans[1].innerHTML=leftH;
        spans[3].innerHTML=Math.floor(leftM/10);
        spans[4].innerHTML=leftM%10;
        spans[6].innerHTML=Math.floor(leftS/10);
        spans[7].innerHTML=leftS%10;
    },1000)

}


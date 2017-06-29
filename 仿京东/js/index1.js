window.onload=function(){
    changeHeaderAlpha();
    activeBanner();
    secKillTime();
};
function changeHeaderAlpha(){
    var topbar=document.getElementsByClassName('jd_topbar')[0];
    var banner=document.getElementsByClassName('jd_banner')[0];
    var bannerH=banner.offsetHeight;
    var alpha=0;
    var scrollTop=0;
    var maxAlpha=0.8;
    window.onscroll=function(){
        scrollTop=document.body.scrollTop;
        if(scrollTop<=bannerH){
            alpha=(scrollTop/bannerH)*maxAlpha;
        }else {
            alpha=maxAlpha;
        }
        topbar.style.background='rgba(201, 21, 35,'+alpha+')';
    }
}
function activeBanner(){
    var jd_banner=document.getElementsByClassName('jd_banner')[0];
    var ul_imgbox=jd_banner.getElementsByTagName('ul')[0];
    var li_imgbox=ul_imgbox.getElementsByTagName('li');
    var ol_page=jd_banner.getElementsByTagName('ol')[0];
    var li_page=ol_page.getElementsByTagName('li');
    //设置变量
    var index=1;
    var bannerW=jd_banner.offsetWidth;
    var durtion=1000;
    var curx=0;
    var timer=null;
    function setTransition(){
        ul_imgbox.style.transition='all .2s ease';
        ul_imgbox.style.webkitTransition='all .2s ease'
    }
    function removeTransition(){
        ul_imgbox.style.transition='none';
        ul_imgbox.style.webkitTransition='none';
    }
    function  translateX(x){
        ul_imgbox.style.transform='translate('+x+'px)';
        ul_imgbox.style.webkitTransform='translate('+x+'px)';
    }
    timer=setInterval(scrollImg,durtion);
    function scrollImg(){
        index++;
        var curx=-index*bannerW;
        setTransition();
        translateX(curx);
        //pageChange();
    }
    function pageChange(){
        for (var i = 0; i < li_page.length; i++) {
            li_page[i].className='';
        }
        var pageIndex=index-1;

        li_page[pageIndex].className='current';
    }
    function keepIndexSafe(){
        //console.log(li_imgbox.length);
        if(index>=li_imgbox.length-1){
            index=1;
        }else if(index<=0){
            index=8;
        }
        curx=-bannerW*index;


        removeTransition();
        translateX(curx);
        pageChange();
    }
    ul_imgbox.addEventListener('transitionEnd',keepIndexSafe);
    ul_imgbox.addEventListener('webkitTransitionEnd',keepIndexSafe);
    //手势滑动
    var starX,moveX,changeX;
    starX=0;
    moveX=0;
    changeX=0;
    ul_imgbox.addEventListener('touchstart',function(e){
        e.preventDefault();
        clearInterval(timer);
        starX= e.touches[0].clientX;
    });
    ul_imgbox.addEventListener('touchmove',function(e){
        moveX= e.touches[0].clientX;
        changeX=moveX-starX;
        curx=-index*bannerW+changeX
        translateX(curx);
    });
    ul_imgbox.addEventListener('touchend',function(e){
        setInterval(timer);
        if(changeX>0.49*bannerW){
            index--;
        }else if(changeX<-0.49*bannerW){
            index++;
        }
        curx=-index*bannerW;
        setTransition();
        translateX(curx);
    })
}
//倒计时
function secKillTime(){
    var main_timer=document.getElementsByClassName('main_timer')[0];
    var spans=main_timer.getElementsByTagName('span');
    var em=main_timer.getElementsByTagName('em');
    setInterval(function(){
        var now=new Date();
        var nowH=now.getHours();
        var nowM=now.getMinutes();
        var nowS=now.getSeconds();
        var nth=0;
        var leftH,leftM,leftS;
        var n=2;
        if(nowH>0&&nowH<n){
            nth=0;
        }else {
            nth=Math.floor(nowH/n)*n;
        }
        leftH=nowM==0&&nowS==0?n-(nowH-nth):n-1-(nowH-nth);
        leftM=nowS==0? 60-nowM:59-nowM;
        leftS=nowS==0? 0:59-nowS;
        em.innerHTML=nth;
        spans[1].innerHTML=leftH;
        spans[3].innerHTML=Math.floor(leftM/10);
        spans[4].innerHTML=leftM%10;
        spans[6].innerHTML=Math.floor(leftS/10);
        spans[7].innerHTML=leftS%10;

    },1000)
}







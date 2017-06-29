window.onload=function(){
    changeHeaderAlpha();
    activeBanner();
    window.onresize=function(){
        setTimeout(function(){
            window.location.reload();
        },1000)
    }
};
function changeHeaderAlpha(){
    var topbar=document.getElementsByClassName('jd_topbar')[0];
    var banner=document.getElementsByClassName('jd_banner')[0];
    var alpha=0;
    var maxAlpha=0.8;
    var bannerH=banner.offsetHeight;
    window.onscroll=function(){
        var scrollTop=document.body.scrollTop;
        if(scrollTop<bannerH){
            alpha=(scrollTop/bannerH)*maxAlpha;
        }else{alpha=maxAlpha}
        topbar.style.background='rgba(201, 21, 35,'+alpha+')';
    }
}
function activeBanner(){
    var banner=document.getElementsByClassName('jd_banner')[0];
    var ul_img=banner.getElementsByTagName('ul')[0];
    var li_img=ul_img.getElementsByTagName('li');
    var ol_page=banner.getElementsByTagName('ol')[0];
    var page=ol_page.getElementsByTagName('li');
    //设置变量
    var curX=0;
    var index=1;
    var bannerW=banner.offsetWidth;
    var timer=null;
    var durtion=1000;
    timer=setInterval(scrollImg,durtion);
    //设置过渡、移除过渡、设置平移
    function setTransition(){
        ul_img.style.transition='all .2s ease';
        ul_img.style.webkitTransition='all .2s ease';
    }
    function  removeTransition(){
        ul_img.style.transition='none';
        ul_img.style.transition='none';
    }
    function imgTranslate(x){
        ul_img.style.transform='translateX('+x+'px)';
        ul_img.style.webkitTransition='translateX('+x+'px)';
    }
    function scrollImg(){
        index++;
        curX=-index*bannerW;
        setTransition();
        imgTranslate(curX);
    }
    function updatePage(){
        var pageIndex=index-1;
        for (var i = 0; i < page.length; i++) {
            page[i].className='';
        }
        page[pageIndex].className='current';
    }
    function indexSafe(){
        if(index>=li_img.length-1){
            index=1;
        }else if(index<=0){
            index=8
        }
        curX=-bannerW*index;
        removeTransition();
        imgTranslate(curX);
        updatePage();
    }
    ul_img.addEventListener('transitionend',indexSafe);
    var starX,moveX,changeX;
    ul_img.addEventListener('touchstart',function(e){
        clearInterval(timer);
        starX= e.touches[0].clientX;
    });
    ul_img.addEventListener('touchmove',function(e){
        moveX=e.touches[0].clientX;
        changeX=moveX-starX;
        curX=changeX-index*bannerW;
        removeTransition();
        imgTranslate(curX);
    });
    ul_img.addEventListener('touchend',function(){
        timer=setInterval(scrollImg,durtion);
        //setInterval(timer);
        if(changeX>0.49*bannerW){
            index--;

        }else if(changeX<-0.49*bannerW){
            index++;
        }
        curX=-index*bannerW;
        setTransition();
        imgTranslate(curX);
        starX = 0;
        moveX = 0;
        changeX = 0;
    })


}

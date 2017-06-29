
window.onload=function(){

    shortcutDisplay();


}
window.mjd={};
mjd.tap=function(obj,callback){
    var duration=300;
    var ismoving=false;
    var startTime=null;
    if(typeof obj!="object"){
        return;
    }

    obj.addEventListener('touchstart',function(e){
        startTime=Date.now();
    });
    obj.addEventListener('touchmove',function(e){
        e.preventDefault();
        ismoving=true;
    });
    obj.addEventListener('touchend',function(e){
        if(!ismoving&&Date.now()-startTime<=duration){
            if(callback){
                callback(e);
            }
        }
        ismoving=false;
    })


}
function shortcutDisplay(){
    var icon_shortcut=document.getElementsByClassName('icon_shortcut')[0];
    var jd_shortcut=document.getElementsByClassName('jd_shortcut')[0];
    mjd.tap(icon_shortcut,function(){
        var shortcutDisplay=jd_shortcut.style.display;
        if(shortcutDisplay=='none'){
            jd_shortcut.style.display='block';
        }else if(shortcutDisplay=='block'){
            jd_shortcut.style.display='none';
        }

    })

}
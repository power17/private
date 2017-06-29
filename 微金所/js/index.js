$(function(){
    $(window).on('resize',changeImgStyle);
    function changeImgStyle(){
        //获取屏幕的宽度
        var clientW=$(window).width();
        //大小图的显示
        var isShowLgImg=clientW>750;
        //获取所有item
        var $items=$('#wjs_banner .item');
        //遍历
        $($items).each(function(index,value){
            var $item=$(value);
            var attr=isShowLgImg? $item.data('lg-img'):$item.data('sm-img');
            var src="url("+attr+")";
            $item.css({
                backgroundImage:src
            });
            //当屏幕小于790，创建img标签放入
            if(!isShowLgImg){
                var $img='<img src="'+attr+'">';
                //先清空后删除
                $item.empty().append($img);
            }else{
                $item.empty();
            }

        })
    }
    $(window).trigger('resize');
    $(window).on('resize',changUlWidth);
    function changUlWidth(){
        var $ul=$('#wjs_product .nav');
        var $leftLis=$('li[role="presentation"]',$ul);

        var totalLiLength=0;
        $leftLis.each(function(index, value){
            totalLiLength+=$(value).width();
        });

            var parentWidth=$ul.parent().width();
        if(totalLiLength>=parentWidth){
            $ul.css({
                width:totalLiLength
            })
        }else {
            $ul.removeAttr('style');
        }


    }
})
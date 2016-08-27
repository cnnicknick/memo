$(function(){
    //填写内容的输入框
    var add=$('.add');
    var form=$('form');
    var flag=true;
    var formClose=$('.form-close');
    add.click(function(){
        if(flag){
            form.attr('data-a','animate-down').css('display','block');
            flag=false;
        }else{
            form.attr('data-a','animate-up').css('display','none');
            flag=true;
        }
    });
    formClose.click(function(){
        form.attr('data-a','animate-up').css('display','none');
        flag=true;
    });

    //提交信息
    $('.submitbtn').click(function(){
        var textv=form.find(':text').val();
        var conv=form.find('textarea ').val();
        var timev=form.find('#time').val();

        if(textv==""){
            alert("请输入标题");
            return;
        }
        if(conv==""){
            alert("请输入内容");
            return;
        }
        if(timev==""){
            alert("请选择时间");
            return;
        }

        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(':text').val('');
        form.find('textarea ').val('');
        form.find('#time').val('');

        var copy=$('.con:first').clone().appendTo('body').fadeIn(100).css({
            left:Math.random()*($(document).width()-$('.con').outerWidth()),
            top:Math.random()*($(document).height()-$('.con').outerHeight())
        }).attr('data-a','animate-sd').attr('id',obj.id);
        copy.find('.title-con').html(textv);
        copy.find('.con-con').html(conv);
        copy.find('.time-con').html(timev);

    });

    //拖动
    $(document).on('mousedown',function(e){
        var obj= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        $(document).on('mousemove',function(e){
            var px= e.pageX;
            var py= e.pageY;
            $(obj).trigger('drag',{left:px-ox,top:py-oy});
        });
        $(document).on('mouseup',function(e){
            $(document).off('mouseup');
            $(document).off('mousemove');
        });
    });
    $(document).delegate('.con','drag',function(e,data){
        $(this).css({
            left:data.left,
            top:data.top
        })
    });
    $(document).delegate('.con','mousedown',function(e,data){
        $('.con').css({zIndex:0});
        $(this).css({zIndex:1})
        e.preventDefault();
    });
    //显示加载已经保存的内容
    var message=localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<message.length;i++){
        copy=$(".con:first").clone().appendTo("body").css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random(),
            display:'block'
        }).attr('id',message[i].id);

        copy.find('.title-con').html(message[i].title);
        copy.find('.con-con').html(message[i].con);
        copy.find('.time-con').html(message[i].time);
    };
    $(document).delegate('.close','click',function(e,data){
        var id=$(this).parent().attr('id');
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    });

})
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// ios点击事件不触发
$(function() {  
    FastClick.attach(document.body);  
})
$(document).ready(function () {
    // 用于生成二维码
    var classname, idname
    generateImage('qrcodefirst', 'picfirst');
    // 兑换码
    var exchange = 123;
    var playnum = 0, //初始次数，由后台传入
        key,//中的奖品key
        currentClass,//当前奖品的class
        kindTitle,//当前奖品种类标题
        kindTitle_text,//奖品标题
        recordList = [],//后添加的中奖记录列表数组 
        isture = 0;//是否正在抽奖
    // 点击验证（兑换码验证）
   $('#prove').on('click',function(){
        if ($('#inputexchange').val() ==exchange ) {
            generateImage('qrcode','pic')
            playnum++;
            $('.playnum').html(playnum);//显示还剩下多少次抽奖机会
            $('.recode').hide();
            $('.lottery').show();
       } else {
            $('#inputexchange').val('')
            $('#exchangefail').text('*验证失败')
       }
   })
    // 转动转盘
    function rotateFunc(awards, angle, text) {
        isture = true;
        $("#playbtn").rotate({
            angle: 0,
            duration: 4000,          //旋转时间
            animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
            callback: function () {
                isture = false     // 标志为 执行完毕
                if (key == 'none') {
                    alert(key);
                } else {
                    var date = new Date;
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var winObj = {} ; 
                    winObj.currentClass = currentClass;
                    winObj.kindTitle = kindTitle;
                    winObj.kindTitle_text = kindTitle_text;
                    winObj.time = year+'年'+ month+'月'+ day+'日';
                    showMask();
                    if (key == 'winning') {
                        $('#prizecontent span:eq(0)').text(result)
                        $('.firstprize').show();
                        // 中奖
                        var str;
                        recordList.push(winObj);
                        //我的奖品列表
                        for (i = 0; i < recordList.length; i++) {
                            if (kindTitle === '话费') {
                                str = "<li class='huafei'><div>话费</div><div><p><span>50</span><span>元</span><span>电信话费</span></p><p>中奖日期:<span>"+ recordList[i].time+"</span></p></div></li>"
                            } else if(kindTitle === '京东卡') {
                                str = " <li class='" + recordList[i].currentClass + "'><div>"+recordList[i].kindTitle+"</div><div><p><span>"+recordList[i].kindTitle_text+"</span>元</p><p>卡号：<span>9087987979712312312312</span> </p><p>密码：<span>231231321</span></p> <p>中奖日期:<span></span>" + recordList[i].time + "</span></p></div><a class='directions' href='javascript:void(0);'></a></li>"
                            }else{
                                str = " <li class='" + recordList[i].currentClass + "'><div>"+recordList[i].kindTitle+"</div><div><p>"+recordList[i].kindTitle_text+"</p><p>卡号：<span>9087987979712312312312</span> </p><p>密码：<span>231231321</span></p> <p>中奖日期:<span></span>" + recordList[i].time + "</span></p></div><a class='directions' href='javascript:void(0);'></a></li>"
                            }
                        }
                        $('.winlist').append(str);
                    } else if (key == 'join') {
                        // 谢谢参与
                        $('.unprize').show();
                    } 
                }
            }
        });
    }
    // 对应奖品
    var clickfunc = function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8];
        //data为随机出来的结果，根据概率后的结果
        data = data[Math.floor(Math.random() * data.length)];
        // data =7;
        switch (data) {
            case 1:
                key = 'winning'
                result = '一等奖'
                currentClass = 'jingdong'
                kindTitle ='京东卡'
                kindTitle_text = '30'
                rotateFunc(1, 22.5, '一等奖');
                break;
            case 2:
                key = 'join'
                result = '谢谢参与'
                rotateFunc(2, 67.5, '谢谢参与');
                break;
            case 3:
                key = 'winning'
                result = '二等奖'
                currentClass ='yingpiao'
                kindTitle =' 影票'
                kindTitle_text = '网票网电子卡密'
                rotateFunc(3, 112.5, '二等奖');
                break;
            case 4:
                key = 'join'
                result = '谢谢参与'
                rotateFunc(4, 157.5, '谢谢参与');
                break;
            case 5:
                key = 'winning'
                result = '三等奖'
                currentClass = 'shipin'
                kindTitle = '视频'
                kindTitle_text = '爱奇艺月卡'
                rotateFunc(5,  202.5, '三等奖');
                break;
            case 6:
                key = 'join'
                result = '谢谢参与'
                rotateFunc(6,247.5, '谢谢参与');
                break;
            case 7:
                key = 'winning'
                result = '四等奖'
                currentClass = 'huafei'
                kindTitle = '话费'
                rotateFunc(8, 292.5, '四等奖');
                break;
            case 8:
                key = 'join'
                result = '谢谢参与'
                rotateFunc(7,337.5, '谢谢参与');
                break;
            
        }
    }

    // 点击转盘
    $("#playbtnWrap").click(function () {
        if (isture) return; // 如果在执行就退出
        isture = true; // 标志为 在执行
        if (playnum <= 0) { //当抽奖次数为0的时候执行
            showMask();
            $('#nochange').show();
            $('.playnum').html(0);//次数显示为0  
            isture = false;
        } else { //还有次数就执行
            playnum = playnum - 1; //执行转盘了则次数减1
            if (playnum <= 0) {
                playnum = 0;
                $('#playbtn').attr('src','./images/playbtn2.png');
            }
            $('.playnum').html(playnum);
            clickfunc();
        }
    });

    // 我的奖品
    $('#mypraise').on('click',function(){
        $('.lottery').hide();
        $('.gift').show();
    })
    // 我的奖品中说明内容
    $('.directions').on('click',function(){
        if ( $(this).parent('li').hasClass('jingdong')) {
            $('.used_context').html('<li>我是京东卡中说明内容我是京东卡中说明内容我是京东卡中说明内容</li><li>我是京东卡中说明内容我是京东卡中说明内容我是京东卡中说明内容</li><li>我是京东卡中说明内容我是京东卡中说明内容我是京东卡中说明内容</li>')
            // alert(1)    
        }else if($(this).parent('li').hasClass('yingpiao')){
            $('.used_context').html('<li>影评说明内容</li>')
        }else if($(this).parent('li').hasClass('shipin')){
            $('.used_context').html('<li>视频说明内容</li>')
        }
        $('.gift').hide();
        $('.used').show();        
       
    })
    // 使用说明（返回）
    $('.used_return').on('click',function(){
        $('.used').hide();
        $('.gift').show(); 
    })
    // 点击告诉好友
    $('#sendto').on('click',function(){
        showMask();
        $('.share').show();
    })

    // 点击活动规则
    $('.rulebtn').on('click',function(){
        showMask()
        $('.rule').show();
    })
    // 返回
    $('.return').on('click',function(){
        $(this).parent().parent().hide();
        $('.lottery').show();
    })
// 生成图片方法
function generateImage (classname,idname) {
    erweima(classname);
    setTimeout(function () {
        // 调用二维码生层图片
        erweima_pic(classname,idname);
    },500);
}
// 二维码生成图片
//参数分别是二维码的class，和id
function erweima_pic (classname, idname) {
    var getimg_length = $('.'+classname).children('img').length
    if (getimg_length == 0) {
        var copyDom = $('#'+idname).children('canvas')[0]
        var width = copyDom.width;
        var height = copyDom.height;
        var scale = 2;
        html2canvas(document.getElementById(idname),{
            dpi:window.devicePixelRatio*2,
            scale:scale,
            width:width,
            height:height,
        }).then(function(canvas){
            var imgUrl = canvas.toDataURL();
            $('#'+idname).css({'width':width,'height':height,'margin':'0 auto'})
            $('#'+idname).html('<img class="cavas_img" src="'+imgUrl+'" style="width:'+width+'px;height:'+height+'px">');
        })
    }
}
// 二维码
function erweima (classname){
    var link = "http://www.baidu.com"     //其中link为需生成二维码的链接
    $("."+classname).qrcode(
        {
           render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
           text : link,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
           width : "90",            // //二维码的宽度
           height : "90",              //二维码的高度
           background : "#ffffff",       //二维码的后景色
           foreground : "#459b98",        //二维码的前景色
           src: './images/code_tu.png'             //二维码中间的图片
       }
    );
    
}

 
    // 关闭按钮
    $('.close').on('click',function(){
        $(this).parent().hide();
        hideMask();
    })
    // 测试
    $('.test2').on('click',function(){
        $('.test2').css('color','red')
        playnum = 9; 
        $('#playbtn').attr('src','./images/playbtn1.png') 
        $('.playnum').text(playnum);
    })
    // 点击遮罩层关闭分享（测试用）
    $('.mask').on('click', function () {
        if ($('.share').css('display') == 'block') {
            hideMask();
            $('.share').hide();
            playnum++;
            $('#playbtn').attr('src','./images/playbtn1.png')
            $('.playnum').text(playnum);
        }
    })    
 
})
    //显示遮罩层
    function showMask() {
        $("#mask").css("height", $(document).height());
        $("#mask").css("width", $(document).width());
        $("#mask").show();
        $('body').css('position', 'fixed');
    }
    //隐藏遮罩层
    function hideMask() {
        $("#mask").hide();
        $('body').css('position', 'unset');
    }
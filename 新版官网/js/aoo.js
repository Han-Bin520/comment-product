$(function () {
    mainNavHover();
    dropDownHover();
    headerScroll();
    fontClick();
    recommendClick();

    //iframe弹窗层
    let top = 0;
    let $nav = $("body");
    $('.trigger').click(function (e) {
        let windowWidth = $(window).width();
        e.preventDefault();
        getPopup();
        if (windowWidth <=1024) {
            layer.open({
                type: 2,
                title: '',
                shadeClose: true,
                shade: [1, '#525252'],
                area: ['100%', '100%'],
                content: $(this).attr('href'),
                skin: 'demo-class',
                success: function(layero, index){
                    let theLeft = parseInt($(layero).css("left"));
                    $(".layer-close").css({
                        right:theLeft,
                        display:"block"
                    });
                }

            });
        }
        else if(windowWidth > 1024){
            layer.open({
                type: 2,
                title: '',
                shadeClose: true,
                shade: [1, '#525252'],
                area: ['1100px', '100%'],
                content: $(this).attr('href'),
                skin: 'demo-class',
               success: function(layero, index){
                   let theLeft = parseInt($(layero).css("left"));
                   $(".layer-close").css({
                       right:theLeft - 53,
                       display:"block"
                   });
               }
            });
        }
    });
    $(".layer-close").click(function (e) {
        layer.closeAll();
        getPopDown();
        $(this).css("display","none");
    });
    //记录window滚动高度
    function getPopup() {
        top = window.pageYOffset;
        $nav.css({
            position: "fixed",
            width: "100%",
            top: -top,
            overflow: "hidden"
        });
        return top;
    }
    function getPopDown() {
        $nav.attr('style', "");
        $nav.css("position", "relative");
        window.scrollTo(0, top);
        top = 0;
        return false;
    }


    //锚点跳转
    $(".dropdown .about-us>ul>li>a").click(function () {
        let params = $(this).attr("href");
        let i = params.indexOf("#");
        let str = params.substr(i,params.length);
        let mao = $(str);
        console.log(mao);
        let pos = mao.offset().top;
        console.log(pos);
        let poshigh = mao.height();
        console.log(poshigh);
        $("html,body").animate({
            scrollTop: pos - poshigh/2
        }, 500);
        return false;
    });

    //获取当前时间
    let oYear = $(".now-time .time-year>span");
    let oMouth = $(".now-time .time-mouth");
    let oDay = $(".now-time .time-day");
    setTime();
    setInterval(function () {
        setTime();
    }, 1000);
    function setTime() {
        let obj = getNowDate();
        oYear.html(obj.year);
        oMouth.html(obj.month+"/"+obj.day);
        oDay.html(obj.hour+":"+obj.minutes+":"+obj.seconds+" "+obj.week);
    }
    function getNowDate() {
        let date = new Date();
        let year = date.getFullYear() // 年
        let month = date.getMonth() + 1; // 月
        let day  = date.getDate(); // 日
        let hour = date.getHours(); // 时
        let minutes = date.getMinutes(); // 分
        let seconds =  date.getSeconds();
        let weekArr = ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ];
        let week = weekArr[date.getDay()];
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        return {
            year:year,
            month:month,
            day:day,
            hour:hour,
            minutes:minutes,
            seconds:seconds,
            week:week
        }
    }

    //导航栏列表hover效果
    function mainNavHover() {
        let scrollTop = 0;
        let $mainLi = $(".mainNav-right>ul>li>a");
        let $downMenuMove = $(".dropdown-in");
        $mainLi.hover(function () {
            let mainIndex = $(this).parent().index();
            let $downMenuCount = $(".dropdown-in>div").eq(mainIndex);
            $(".dropdown").css("display", "block");
            $downMenuCount.addClass("dropdown-status").siblings().removeClass("dropdown-status");
        });
        $downMenuMove.on("mouseleave", function () {
            $(".dropdown-menu").removeClass("dropdown-status");
            $(".dropdown").css("display", "none");
        });
    }

    //导航栏子菜单产品列表hover效果
    function dropDownHover() {
        let $downMenu = $(".dropdown-menu");
        $downMenu.on("mouseenter", ".dropdown-product", function () {
            let downIndex = $(this).index();
            let $downList = $(this).parent(".dropdown-left").next(".dropdown-right").children(".dropdown-list").eq(downIndex);
            $downList.addClass("list-block").siblings().removeClass("list-block");
            $(this).addClass("scroll-bar").siblings().removeClass("scroll-bar");
        })
    }

    //导航栏的吸顶效果
    function headerScroll() {
        let headHeight = $(".header").height();
        let oMainNav = $(".mainNav");
        let navBig = $(".mainNav .big");
        let navSmall = $(".mainNav .small");
        $(window).scroll(function () {
            let offsetY = $("body").scrollTop() + $("html").scrollTop();
            if (offsetY >= headHeight) {
                oMainNav.css({
                    position: "fixed",
                    top: 0,
                    zIndex: "9999"
                });
                oMainNav.addClass("small-nav");
                navBig.addClass("none-p");
                navSmall.removeClass("none-p");
                $(".banner").css("margin-top", "70px");
                $(".banner-other").css("margin-top", "70px");
                $(".dropdown").css("margin-top", "17px");


            } else {
                oMainNav.css({
                    position: "relative",
                    top: "auto"
                });
                oMainNav.removeClass("small-nav");
                navBig.removeClass("none-p");
                navSmall.addClass("none-p");
                $(".banner").css("margin-top", "0px");
                $(".banner-other").css("margin-top", "0px");
                $(".dropdown").css("margin-top", "0px");

            }
        });
    }


    //字体调整
    function fontClick() {
        $(".font_down").click(function () {
            $(".article-content-word p").css({
                fontSize: "14px",
                lineHeight: "24px",
            });
        });
        $(".font_default").click(function () {
            $(".article-content-word p").css({
                fontSize: "16px",
                lineHeight: "26px",
            });
        });
        $(".font_up").click(function () {
            $(".article-content-word p").css({
                fontSize: "18px",
                lineHeight: "32px",
            });
        });
    }

    //其他产品列表点击
    function recommendClick() {
        $(".recommend-left-other>ul>li").click(function () {
            let recommendIndex = $(this).index();
            let $recommendRight = $(".recommend-fade .recommend-right").eq(recommendIndex);
            $recommendRight.addClass("recommend-block").siblings().removeClass("recommend-block");
        });
    }

    /*@waterfall 案例节选瀑布流
* @param {object} ibox 父类容器对象
* @param {number} item 每个单独对象
*/
    function waterfall(ibox, item) {
        let pos = [],
            $items = $(item),
            fontSize = getComputedStyle(window.document.documentElement)['font-size'].split('px')[0],
            _box_width = $(ibox).width() / fontSize,
            _owidth = $items.eq(0).width() / fontSize + .2,
            _num = Math.floor(_box_width / _owidth);
        let i = 0;
        for (; i < _num; i++) {
            pos.push([i * _owidth, 0]);
        }
        $items.each(function () {
            let _this = $(this),
                _temp = 0,
                _height = _this.height() / fontSize + .23;
            for (let j = 0; j < _num; j++) {
                if (pos[j][1] < pos[_temp][1]) {
                    _temp = j;
                }
            }
            this.style.cssText = 'left:' + (pos[_temp][0] + .20) + 'rem; top:' + pos[_temp][1] + 'rem;';
            pos[_temp][1] = pos[_temp][1] + _height;
            $(ibox).css("height", (pos[_temp][1] + 3) + "rem");
        });
    }
    waterfall(".excerpts-box", ".excerpts-item");

    /*@description 文字溢出ie兼容
* @param {object} elem 标签对象
* @param {number} num 超过多少字添加省略号
*/
    textOver($(".thematic-swiper-img>a>p"), 45);
    textOver(".news-articles-right .the-top p", 25);
    textOver(".general-case-right a p", 36);
    function textOver(elem,num){
        $(elem).each(function () {
            if($(this).text().length > num){
                $(this).text($(this).text().replace(/[ ]/g,"").substring(0,num));
                $(this).html($(this).html()+"...");
            }
        })
    }
});
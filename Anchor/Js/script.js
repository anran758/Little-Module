// 说明 ：用 Javascript 实现锚点(Anchor)间平滑跳转 
// scroller(el, duration)
// el : 目标锚点 ID
// duration : 持续时间，以毫秒为单位，越小越快

// 转换为数字 
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}

// 获取元素信息 
function getPos(e) {
    // left and top value
    var l = 0;
    var t = 0;
    //取整
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    // 获取屏幕宽高(包括滚动条)
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;

    // offsetParent返回一个指向最近的定位元素,标准模式如果没有就返回html/body,表示迁移量都是相对其中来计算.
    while (e.offsetParent) {
        // l+偏移量+左(上)边框宽度
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        // 这时候e是最近的定位元素或者body
        e = e.offsetParent;
    }

    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    };
}

// 获取滚动条信息 
function getScroll() {
    var t, l, w, h;

    // 获取偏移量,屏幕宽高
    // 兼容IE
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        // chrome
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h
    };
}

// 锚点(Anchor)间平滑跳转 
function scroller(el, duration) {
    // 如果传入的值不是对象,那就获取id赋值给el
    if (typeof el != 'object') {
        el = document.getElementById(el);
    }

    if (!el) return;

    // var z = this; 
    // this.el = el; 
    // 
    this.p = getPos(el);
    // 滚动条信息
    this.s = getScroll();

    this.clear = function() {
        window.clearInterval(this.timer);
        this.timer = null;
    };
    // 返回从1970年1月1日午夜到指定日期之间的毫秒数
    this.t = (new Date()).getTime();

    this.step = function() {
        var t = (new Date()).getTime();
        // 两次保存的时间差,再除于持续的时间
        var p = (t - this.t) / duration;

        if (t >= duration + this.t) {
            this.clear();
            window.setTimeout(function() {
                this.scroll(this.p.y, this.p.x);
            }, 13);
        } else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (this.p.y - this.s.t) + this.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (this.p.x - this.s.l) + this.s.l;
            this.scroll(st, sl);
        }
    };
    this.scroll = function(t, l) {
        // 将获取坐标传给函数,在滚到指定坐标处.
        window.scrollTo(l, t);
    };
    this.timer = window.setInterval(function() {
        this.step();
    }, 13);
}
var isSmallScreen = window.innerWidth < 500;
function getPoem(t, n) {
    var e = document.querySelector(t)
      , a = document.querySelector(n)
      , i = new XMLHttpRequest;
    function o() {
        e.innerHTML = "晚来天欲雪，".concat(isSmallScreen ? "<br/>" : "", "能饮一杯无？"),
        a.innerHTML = "【唐代】白居易《问刘十九》"
    }
    i.open("get", "https://v2.jinrishici.com/one.json"),
    i.withCredentials = !0,
    i.timeout = 3e3,
    i.onreadystatechange = function() {
        if (4 === i.readyState)
            if (200 <= i.status && i.status < 300 || 304 == i.status) {
                var t = JSON.parse(i.responseText);
                isSmallScreen ? (e.innerHTML = t.data.content.replace(/\，/g, "，<br/>"),
                a.innerHTML = "《".concat(t.data.origin.title, "》<br/>") + "【".concat(t.data.origin.dynasty, "】").concat(t.data.origin.author)) : (e.innerHTML = t.data.content,
                a.innerHTML = "《".concat(t.data.origin.title, "》") + "【".concat(t.data.origin.dynasty, "】").concat(t.data.origin.author))
            } else
                o()
    }
    ,
    i.ontimeout = o,
    i.onerror = o,
    i.send()
}
getPoem("#poem", "#info");
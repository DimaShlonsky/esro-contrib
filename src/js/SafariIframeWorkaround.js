//Add this to the pages hosting eSRO iframe in order to deal with Safari browsers allowing iframe window to set cookies if it had not been navigated to
//modify the eSROUrl parameter value as required
(function fixSafariCookies(eSROUrl) {
    var doc = window.document, loc = doc.location,
        r=/(\?|&)safariCallback=true(?=&|$)/;
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (r.test(loc.search)) {
        doc.cookie = "safariRedirDone=1";
        if (window.history.replaceState) {
            window.history.replaceState(undefined, undefined, loc.pathname + loc.search.replace(r, ""));
        }
    }
    else if (!(/(^|;)\s*safariRedirDone=1(;|$)/).test(doc.cookie) && userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1) {
        loc.href = eSROUrl + "Safari.aspx?url=" + encodeURIComponent(loc.href + (loc.searh ? "&" : "?") + "safariCallback=true");
    }
})("//esro.com/");
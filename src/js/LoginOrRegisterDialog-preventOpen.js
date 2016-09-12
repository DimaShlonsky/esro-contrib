$("body.screen-ClientRequiredFallback_aspx").one("dialogcreate", ".loginOrRegisterDlg", function (e) {
    e.preventDefault();
    $(document).one("ajaxSend", function (e, xhr, options) {
        var url = "LoginOrRegisterDlg.aspx";
        if (options.url.substr(0, url.length).toLowerCase() == url.toLowerCase()) {
            xhr.abort();
        }
    });
    $(".ui-dialog-content", this).on("dialogopen", function (e) {
        $(this)
            .dialog("option", "close", function () { })
            .dialog("close");
    });
});
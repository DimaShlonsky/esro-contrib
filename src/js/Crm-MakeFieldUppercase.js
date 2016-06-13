define(['jquery'], function ($) {
    return (function makeFieldsUpperCase(inputs) {
        var registerDialog = $(".ui-dialog.loginOrRegisterDlg .ui-dialog-content:visible");
        if (registerDialog.length) {
            applyLogic(registerDialog)
        }
        $(document).on("dialogopen", ".loginOrRegisterDlg", function (e, ui) {
            applyLogic(e.target)
        });

        //CrmCreateAccount.aspx
        if ($("body").is(".screen-CrmCreateAccount_aspx, .screen-crmcreateaccount_aspx")) {
            applyLogic($("#frmCreateAccount"));
        }

        //'edit' dialog in eCRM
        if ($("body").is(".screen-CrmDetails_aspx")) {
            $(document).ajaxComplete(function (e, xhr, options) {
                url = options.url;
                if (url.substr(0, 11).toLowerCase() == "crmtab.aspx") {
                    var params = $.fn.location("parseQueryParams", url.substr(12));
                    if (JSON.parse(params.parameters || params.Parameters).Parameters["@UIViewName"] == "eSRO.Crm.Customer Design+Dialog") {
                        var div = screensStack[screensStack.length - 1].obj;
                        applyLogic(div);
                    }
                }
            });
        }

        function applyLogic(elem) {
            $(inputs, elem)
            .css("text-transform", "uppercase")
            .on("blur", function (e) {
                var me = $(this);
                me.val(
                    me.val().toUpperCase()
                )
            });
        }
    });
});



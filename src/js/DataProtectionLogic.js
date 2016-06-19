//sample:
//require(['DataProtectionLogic'], function(applyLogic){
//  applyLogic("<guid1>", ["<guid2>", "<guid3>"], ["<guid3>", "<guid4>"], 
//              {"Address":true, "Address2":false, "City":true, "State":true, "Country":true, "ZipCode":true} //name: mandatory?
//  );
//});
define(['jquery'], function ($) {
    return (function (masterEmailQuestionId, slaveEmailQuestionIds, mailQuestionIds, addressFields) {
        //'register' dialog
        var registerDialog = $(".ui-dialog.loginOrRegisterDlg .ui-dialog-content:visible");
        if (registerDialog.length) {
            applyLogic(registerDialog, false)
        }
        $(document).on("dialogopen", ".loginOrRegisterDlg", function (e, ui) {
            applyLogic(e.target, false)
        });

        //CrmCreateAccount.aspx
        if ($("body").is(".screen-CrmCreateAccount_aspx, .screen-crmcreateaccount_aspx")) {
            applyLogic($("#frmCreateAccount"), true);
        }

        //'Contact me' dialog in eCRM
        if ($("body").is(".screen-CrmDetails_aspx")) {
            $(document).ajaxComplete(function (e, xhr, options) {
                url = options.url;
                if (url.substr(0, 11).toLowerCase() == "crmtab.aspx") {
                    var params = $.fn.location("parseQueryParams", url.substr(12));
                    if (JSON.parse(params.parameters || params.Parameters).Parameters["@UIViewName"] == "eSRO.Crm.ContactMeDialog") {
                        var div = screensStack[screensStack.length - 1].obj;
                        applyLogic(div, false);
                    }
                }
            });
        }

        function applyLogic(container, applyAddressLogic) {
            var allDpQuestions = $(".DpQuestionsContainer input, dt[name=DataProtectionDetails]", container),
                masterEmailQuestion = filterByIds(allDpQuestions, [masterEmailQuestionId]),
                mailQuestions = filterByIds(allDpQuestions, mailQuestionIds),
                slaveEmailQuestions = filterByIds(allDpQuestions, slaveEmailQuestionIds);

            //set default answers
            allDpQuestions.not(mailQuestions)
                    .attr("checked", true);

            getInputs(masterEmailQuestion).change(function () {
                var answerIsYes = getAnswer(getInputs(masterEmailQuestion));
                slaveEmailQuestions.each(function () {
                    var inputs = getInputs($(this));
                    inputs.attr("disabled", !answerIsYes);
                    toggle(inputs, answerIsYes);
                });
            }).change();

            function filterByIds(qs, ids) {
                return qs.filter(function (i, e) {
                    return $.grep(ids, function (ge, gi) {
                        return $(e).prop("value") == ge;
                    }).length > 0;
                });
            }
            function getInputs(questions) {
                if (questions.is("input")) {
                    return questions;
                } else {
                    return questions.find("+dd input");
                }
            }
            function getAnswer(inputs) {
                if (inputs.is("input[type=checkbox]")) {
                    return inputs.is(":checked");
                } else {
                    return inputs.filter("[value=10]:checked").length > 0;
                }
            }
            function toggle(inputs, status) {
                var inputType = inputs.is("input[type=checkbox]") ? "checkbox" : "radio",
                    dataContainer = inputType == "checkbox" ? inputs : inputs.closest("ul");
                if (!status) {
                    if (inputType == "checkbox") {
                        dataContainer.data("prevValue", inputs.is(":checked"));
                        inputs.prop("checked", false);
                    } else {
                        dataContainer.data("prevValue", inputs.filter(":checked").val())
                        inputs.filter("input[value=20]").prop("checked", true);
                    }
                } else if (dataContainer.data("prevValue")!==undefined) {
                    if (inputType == "checkbox") {
                        inputs.prop("checked", dataContainer.data("prevValue"));
                    } else {
                        inputs.filter("input[value=" + dataContainer.data("prevValue") + "]").attr("checked", true);
                    }
                }
            }

            //attach validators for address fields
            $.each(addressFields, function (k, v) {
                if (v) {
                    $(".dataField[name=\'" + k + "']", container).addClass("mandatory");
                    $(".label." + k + " .mandatoryFieldMarker", container).text("*");
                }
            });
            require(["js/validation"], function () {
                attachValidators(container);
                if (applyAddressLogic) {
                    mailQuestions.change(function () {
                        var show = getAnswer(getInputs(mailQuestions));
                        $.each(addressFields, function (k, v) {
                            var input = $(".dataField[name=\'" + k + "']", container);
                            input.parents(".row").toggle(show);
                            if (v) {
                                if (show) {
                                    enableFieldValidators(input);
                                } else {
                                    disableFieldValidators(input);
                                }
                            }
                        });
                    }).change();
                }
            });

            $(document).bind("AfterUserDetailsPageLoaded.esro", function () {
                masterEmailQuestion.change();
            });
        }
    });
});
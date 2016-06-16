define(['jquery'], function ($) {
    "use strict";
    return (function limitPriceTypeRatios(limits) {
        if ($(".selectTickets").length == 0) {
            return;
        }

        $(".selectTickets").bind("init.esro.selectTickets", function (event) {
            var button = $(".selectTickets .proceed a"),
                replacementButton = button.clone(true).addClass("replacement");

            button.hide().after(replacementButton);
            replacementButton
                .off("click")
                .on("click", function (e) {
                    if (checkLimits() === false) {
                        e.preventDefault();
                    } else {
                        button.trigger(e);
                    }
                });
        });

        function checkLimits() {
            for (var i = 0; i < limits.length; i++) {
                var primaryCount = 0, secondaryCount = 0,
                    ratio = limits[i].ratio || 1,
                    primaryPriceTypeIds = limits[i].primary,
                    secondaryPriceTypeIds = limits[i].secondary,
                    tickets = selectTicketsControl.tickets, ticket;
                if (primaryPriceTypeIds.constructor != Array) {
                    primaryPriceTypeIds = [primaryPriceTypeIds];
                }
                if (secondaryPriceTypeIds.constructor != Array) {
                    secondaryPriceTypeIds = [secondaryPriceTypeIds];
                }
                for (var itemId in tickets) {
                    ticket = tickets[itemId];
                    for (var j = 0; j < primaryPriceTypeIds.length; j++) {
                        if (ticket.PriceTypeId == primaryPriceTypeIds[j]) {
                            primaryCount++;
                            break;
                        }
                    }
                    for (var j = 0; j < secondaryPriceTypeIds.length; j++) {
                        if (ticket.PriceTypeId == secondaryPriceTypeIds[j]) {
                            secondaryCount++;
                            break;
                        }
                    }
                }
                if (primaryCount * ratio < secondaryCount) {
                    $("<div>").text(limits[i].message).dialog({
                        dialogClass: 'alert-dialog pre-wrapped',
                        modal: true,
                        buttons: {
                            ok: function () {
                                $(this).dialog("close");
                            }
                        },
                        resizable: false,
                        title: null
                    });
                    return false;
                }
            }
        }
    });
});
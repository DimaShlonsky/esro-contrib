//Modifies the behavior of SelectTickets control in GA mode for a certain price type, causing it to add multiple tickets for each ticket added
define(['jquery'], function ($) {
    return (function autoMultiplyPriceType(priceTypeId, multiplier) {
        $(".selectTickets.mode-GeneralAdmission, .selectTickets.mode-BestAvailable").bind("init.esro.selectTickets", function (event) {
            var row = $(".row:has(.priceTypes[value='" + priceTypeId + "'])", this)
                inputCount = row.find(".count");
            if (inputCount.length > 0) {
                var priceLevel = $("#selPriceLevel", this).val(),
                    price = selectTicketsControl.pricing.areaPricing[priceTypeId].priceLevels[priceLevel].fullPrice;
                row.find(".pricing > .price").text(FormatCurrency(price * multiplier));
                inputCount.hide();
                if (inputCount.is(".numericSpinner.ui-spinner-input")) {
                    inputCount.spinner("destroy");
                }
                var altSpinner = $("<input>", {
                    type: "number",
                    value: Math.floor(inputCount.val() / multiplier),
                    "class": "numericSpinner fake-spinner"
                });
                inputCount.after(altSpinner);
                altSpinner
                    .numericSpinner({ min: 0 })
                    .on("spinchange spinstop", function () {
                        inputCount
                            .val($(this).val() * multiplier)
                            .change();
                    })
            }
        });
    });
});
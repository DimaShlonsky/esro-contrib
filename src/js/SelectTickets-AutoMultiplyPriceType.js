//Modifies the behavior of SelectTickets control in GA mode for a certain price type, causing it to add multiple tickets for each ticket added
define(['jQuery'], function ($) {
    return (function autoMultiplyPriceType(priceTypeId, multiplier) {
        $(".selectTickets.mode-GeneralAdmission").bind("init.esro.selectTickets", function (event) {
            var inputCount = $(".row:has(.priceTypes[value='" + priceTypeId + "']) .count", this);
            if (inputCount.length > 0) {
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
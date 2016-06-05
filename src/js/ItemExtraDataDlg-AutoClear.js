//causes the Items Extra Data form in the basket page to be cleared when moving between the basket items
$(basketValidationPanel).bind("itemsExtraDataDialog.show.esro", function (e, container) {
    $("#btnNext, #btnPrev", container).click(function () {
        if ($(".basketManRow.selected", container).is(".missing")) {
            $(".dataField:visible", container).val("");
        }
    });
});
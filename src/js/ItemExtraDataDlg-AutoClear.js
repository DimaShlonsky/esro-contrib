$(basketValidationPanel).bind("itemsExtraDataDialog.show.esro", function (e, container) {
    $("#btnNext, #btnPrev", container).click(function () {
        if ($(".basketManRow.selected", container).is(".missing")) {
            $(".dataField:visible", container).val("");
        }
    });
});
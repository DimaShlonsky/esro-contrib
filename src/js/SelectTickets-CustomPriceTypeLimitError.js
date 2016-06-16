//Replaces the LimitPriceTypePerEvent error message with a custom one saying "<price type> SOLD OUT"
$eSRO.api.bind("afterSetAreaTickets.TicketingController", function (e, status, data, errorThrown, xhr) {
    if (status == "error") {
        var err = JSON.parse(xhr.responseText);
        if (err.type == "OperationResultException" && err.faultCode == "LimitPriceTypePerEvent1" && err.faultDetail.Available == 0) {
            err.message = err.faultDetail.PriceType + " SOLD OUT";
            xhr.responseText = JSON.stringify(err);
        }
    }
});

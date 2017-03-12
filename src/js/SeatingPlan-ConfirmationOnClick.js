/* Shows an alert dialog when a seat is clicked, requiring to click "ok" before the ticket is added
    Example, assuming the file is at /custom: 
        require.config({
            config:{
                'custom/SeatingPlan-ConfigurationOnClick':{
                    txtAlert:"Alert!",
                    txtTitle:"Title here",
                    txtOk: "Accept",
                    txtCancel: "Reject"
                }
            }
        });
        require(['custom/SeatingPlan-ConfigurationOnClick']);
*/
define(['module', 'js/SeatingPlan'], function (module, SP) {
    var cfg = module.config(),
	    seatingPlan;
    SP.getInstancePromise(document)
        .then(function (spInstance) {
            seatingPlan = spInstance;
            return spInstance.getLoadedPromise();
        })
        .done(function () {
            $("img.seat", seatingPlan.seatsContainer).on("seatClicked.esro", function (e, seat) {
                var me = this, args = $.makeArray(arguments);
                if (e.skipSeatInfoCheck || !seat.info || $(me).data("alertAccepted") || seat.status != 10) {
                    return;
                }
                e.result = false;
                e.stopImmediatePropagation();
                $("<div>",
                    { text: cfg.txtAlert || seat.info }
                ).dialog({
                    title:(cfg.txtTitle),
                    buttons: [
                        {
                            text:(cfg.txtOk || "ok"),
                            click: function () {
                                $(this).dialog("close");
                                $(me).data("alertAccepted", true);
                                proceed();
                            }
                        },
                        {
                            text: (cfg.txtCancel || "cancel"),
                            click: function () {
                                $(this).dialog("close")
                            }
                        }
                    ]
                });
                function proceed() {
                    var e = $.Event("seatClicked.esro");
                    e.skipSeatInfoCheck = true;
                    $(me).trigger(e, args.slice(1))
                }
            })
        });
});

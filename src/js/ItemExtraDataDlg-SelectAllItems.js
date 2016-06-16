//makes all the items in the itemExtraDataDialof selected by default, allowing to fill the form for all the items at the same time
if (typeof (basketValidationPanel) != "undefined") {
	$(basketValidationPanel).bind("itemsExtraDataDialog.show.esro", function(e, container){
		$(".basketManRow>*", container).click(function(e){ e.stopPropagation(); });
		$("input.allSelector", container).each(function(i,e){
			var inp = $(this);
			inp.attr("checked", true);
			inp.click();
			inp.attr("checked", true);
			//setCheckboxGroup(inp);
		});
	});
}
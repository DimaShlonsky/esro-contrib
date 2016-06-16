//Shows a warning message if you edited data in UserDetailsForm and trying to navigate away without submitting
$(document).bind("AfterUserDetailsPageLoaded.esro", function (e) {
	var attached=false;
	$("input,select,textarea", "#UserDetailsForm").one("change", function(){
		if (!attached){
			var handler = function() {
				//$(".dialog-waiting .ui-dialog-content").dialog("destroy");
				return 'You edited the details, but the changes are not saved yet!';
			};
			$(window).on('beforeunload', handler);
			$("#btnSubmit").click(function(){
				$(window).off('beforeunload', handler);
			});
			attached = true;
		}
	});
});
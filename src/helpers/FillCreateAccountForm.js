(function (n) {
    $.each(["FirstName", "LastName", "MiddleName", "NamePrefix", "NameSuffix", "Initials", "AccountName", "TaxExemptNumber", "VatRegistrationNumber", "Phone", "Phone2", "Phone3", "Password", "Address", "Address2", "City", "Country", "ZipCode", "IDNumber", "Age", "State", "Address3", "Fax", "Website"]
	, function (k, v) {
	    $("[name=" + v + "]").val(n);
	});
    $("[name=Email]").val(n + "@localhost");
    $("[name=Password]").val("aA12345!");
    $("select[name]").each(function (i, e) {
        $(this).val($(this).find("option[value]:not([value='']):eq(0)").val());
    });
})((new Date()).valueOf().toString().substr(5));
define(['https://rawgit.com/chancejs/chancejs/master/dist/chance.min.js'], function (Chance) {
    return function(){
        var chance = new Chance(),
            fields = {"FirstName":chance.first(),
                "Email":chance.email()+".example.com",
                "LastName":chance.last(),
                "MiddleName":"",
                "NamePrefix":chance.name_prefix(),
                "NameSuffix":chance.name_suffix(),
                "TaxExemptNumber":chance.natural(),
                "VatRegistrationNumber":chance.natural(),
                "Phone":chance.phone(), 
                "Phone2":chance.phone(),
                "Phone3":chance.phone(),
                "Password":"aA12345!",
                "Address": chance.address(),
                "Address2":"",
                "Address3":"",
                "City":chance.city(),
                "Country":chance.country(),
                "ZipCode":chance.zip(),
                "IDNumber":chance.israelId(),
                "Age":chance.age(),
                "State":chance.state(), 
                "Fax": chance.phone(),
                "Website":chance.url()
            };
        fields.AccountName = fields.Website;
        fields.Initials = fields.FirstName.substr(0, 1).toUpperCase() + fields.LastName.substr(0, 1).toUpperCase();
        fields.PasswordVerify = fields.Password;
        $.each(fields, function (k, v) {
            var input = $("[name]").filter(function (i, e) { return $(e).attr("name") == k; });
            if (input.is("select")) {
                var option = input.find("option").filter(function(i,e){ return like($(e).val(), v) || like($(e).text(), v);});
                if (option.length==0)  option = input.find("option[value]:not([value='']):eq(0)");
                input.val(option.val());
            } else {
                input.val(v);
            }
        });
    }
    function like(a,b){
        return $.trim(a).toLowerCase() == $.trim(b).toLowerCase();
    }
});
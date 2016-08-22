<%@ Control Language="C#" AutoEventWireup="true" %>
<% 
	var productDescription = ((eSRO.Code.Ticketing.TicketingProductPage)Page).ProductDescription;
%>
<script runat="server">
	public string Expression {get; set;}
	public string Format {get; set;}
</script>
<% Response.Write(String.Format(Format, System.Web.UI.DataBinder.Eval(productDescription, Expression))); %>

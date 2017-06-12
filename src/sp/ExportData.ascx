<%@ Control Language="C#" %>
<script runat="server">
	public string Expression {get; set;}
	public string Format {get; set;}
</script>
<% Response.Write(String.Format(Format, System.Web.UI.DataBinder.Eval(this, Expression))); %>

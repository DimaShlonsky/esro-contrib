<%@ Control Language="C#" %>
<%-- only works with .net>4.6.1 --%>
<script runat="server">
	public string Expression {get; set;}
	private string m_Format = "{0}";
	public string Format {set{ m_Format=value;}}
	private string m_InnerFormat = "{0}";
	public string InnerFormat {set{ m_InnerFormat=value;}}
	public string Escape {get; set;}
</script>
<%
object val = System.Web.UI.DataBinder.Eval(this, Expression);
string strVal = String.Format(m_InnerFormat, val);
if (Escape=="html"){
	strVal = Server.HtmlEncode(strVal);
}else if(Escape=="js"){
	strVal = HttpUtility.JavaScriptStringEncode(strVal);
}
Response.Write(String.Format(m_Format, strVal));
%>

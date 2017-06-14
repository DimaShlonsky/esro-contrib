<%@ Control Language="C#" %>
<script runat="server">
	public string Expression {get; set;}
	private string m_Format = "{0}";
	public string Format {set{ m_Format=value;}}
	public string InnerFormat {get; set;}
	public string Escape {get; set;}
	public string TryGetItemKey {get; set;}
</script>
<%
    object val;
    if (!string.IsNullOrEmpty(InnerFormat))
    {
        val = System.Web.UI.DataBinder.Eval(this, Expression, InnerFormat);
    }else
    {
        val = System.Web.UI.DataBinder.Eval(this, Expression);
    }
    if (val is IDictionary && TryGetItemKey!=null){
        if (((IDictionary)val).Contains(TryGetItemKey)){
            val = ((IDictionary)val)[TryGetItemKey];
        }else
        {
            val = null;
        }
    }
    if (Escape=="html" && val!=null){
        val = Server.HtmlEncode(val.ToString());
    }else if(Escape=="json"){
        val = Newtonsoft.Json.JsonConvert.SerializeObject(val);
    }
    Response.Write(String.Format(m_Format, val));
%>

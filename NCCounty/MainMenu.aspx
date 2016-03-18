<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainMenu.aspx.cs" Inherits="NCCounty.MainMenu" %>
<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>
<html>

<head runat="server">
    <title></title>
    
    <%: Styles.Render("~/content/CSS")%>
    <%: Scripts.Render("~/bundles/Leaflet") %>
    <%: Scripts.Render("~/bundles/Javascript")%>
    <%: Scripts.Render("~/bundles/Maps") %>

</head>
<body>
	<form id="form1" runat="server">
	<asp:ScriptManager EnablePageMethods="true" EnablePartialRendering="true" runat="server" />
	<asp:Panel ID="panelMain" runat="server">
		<div class="divTablesInput">
			<div class="divRows"><b>Welcome To WCU Mapping</b></div>
			<div class="divRows">
				<div class="divCells"><asp:Button ID="Button1" runat="server" Text="Median GRE" OnClick="MedianGre" /></div>
				<div class="divCells"><asp:Button ID="Button3" runat="server" Text="Average GRE" OnClick="AverageGre" /></div>
				
			</div>
			<div class="divRows">
				<div class="divCells"><asp:Button ID="Button4" runat="server" Text="Admitted Students" OnClick="AdmittedStudents" /></div>
				<div class="divCells"><asp:Button ID="Button5" runat="server" Text="Admittance Choropleth" OnClick="AdmittedStudentsChoropleth" /></div>
			</div>
		</div>
	</asp:Panel>
	
	<asp:Panel ID="panelDisplay" runat="server">
		<div class="divRows"><asp:Button ID="Button2" runat="server" Text="Return To Main Menu" OnClick="ReturnMainMenu"/></div>
		<div class="map-wrap">
			<div id="map"></div>
		</div>
	</asp:Panel>
	</form>
</body>
</html>

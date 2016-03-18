using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web.UI;
using NCCounty.Models;
using Newtonsoft.Json;

namespace NCCounty
{
	public partial class MainMenu : Page
	{
	    public MainMenu()
	    {
	        Admin = new DA_Admits();
	        Gre = new DA_GRE();
	    }

	    public DA_Admits Admin { get; set; }
        public DA_GRE Gre { get; set; }


	    protected void Page_Load(object sender, EventArgs e)
		{
			if (Page.IsPostBack == false)
			{
				panelMain.Visible = true;
				panelDisplay.Visible = false;
			}
		}
		protected void MedianGre(object sender, EventArgs e)
		{
			panelMain.Visible = false;
			panelDisplay.Visible = true;

            List<TO_GRE> list = Gre.RetrieveMedianGreCounty(ConfigurationManager.AppSettings["MedianGre"]);

		    //Call javascript function to create json string
            ClientScript.RegisterStartupScript(GetType(), "", "medianGreCounty('" + JsonConvert.SerializeObject(list) + "')", true);
		}

	    protected void AverageGre(object sender, EventArgs e)
		{
			panelMain.Visible = false;
			panelDisplay.Visible = true;

		    List<TO_GRE> list = Gre.RetrieveAvgGreCounty(ConfigurationManager.AppSettings["AverageGre"]);

		    //Call javascript function to create json string
			ClientScript.RegisterStartupScript(GetType(), "", "avgGreCounty('" + JsonConvert.SerializeObject(list) + "')", true);
		}
        
	    protected void AdmittedStudents(object sender, EventArgs e)
		{
			panelMain.Visible = false;
			panelDisplay.Visible = true;

	        List<TO_Admits> list = Admin.GetAdmittedStudents(ConfigurationManager.AppSettings["AdmittedStudents"]);
			
            //Call javascript function to create json string
			ClientScript.RegisterStartupScript(GetType(), "", "admittedStudents('"+JsonConvert.SerializeObject(list)+"')", true);
		}

        protected void AdmittedStudentsChoropleth(object sender, EventArgs e)
        {
            panelMain.Visible = false;
            panelDisplay.Visible = true;

            List<TO_Admits> list = Admin.GetAdmittedStudents(ConfigurationManager.AppSettings["AdmittedStudents"]);
           
            //Call javascript function to create json string
            ClientScript.RegisterStartupScript(GetType(), "", "choroplethAdmittedStudents('" + JsonConvert.SerializeObject(list) + "')", true);
        }

		protected void ReturnMainMenu(object sender, EventArgs e)
		{
			panelMain.Visible = true;
			panelDisplay.Visible = false;
		}
	}
}
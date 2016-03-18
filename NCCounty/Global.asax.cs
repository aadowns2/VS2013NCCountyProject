using System;
using System.Web;
using System.Web.Optimization;
using NCCounty.Models;

namespace NCCounty
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
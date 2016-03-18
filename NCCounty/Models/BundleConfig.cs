using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace NCCounty.Models
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/Leaflet").Include(
               "~/Javascript/Leaflet/leaflet-src.js",
               "~/Javascript/Leaflet/leaflet-label.js",
               "~/Javascript/Leaflet/leaflet-providers.js",
               "~/Javascript/Leaflet/leaflet-geocoder.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/Javascript")
                .IncludeDirectory("~/Javascript/AppCode", "*.js", true)
                .IncludeDirectory("~/Javascript/D3", "*.js", true)
                .IncludeDirectory("~/Javascript/Extensions", "*.js", true)
                .IncludeDirectory("~/Javascript/Jquery", "*.js", true));

            bundles.Add(new StyleBundle("~/content/CSS")
                .IncludeDirectory("~/CSS", "*.css", true));
               
            bundles.Add(new ScriptBundle("~/bundles/Maps")
                .IncludeDirectory("~/Javascript/Maps", "*.js", true));
            
        }

    }
}
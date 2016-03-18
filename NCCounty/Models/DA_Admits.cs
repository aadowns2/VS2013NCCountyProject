using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Newtonsoft.Json;

namespace NCCounty.Models
{
	public class DA_Admits
	{
		public List<TO_Admits> GetAdmittedStudents(string filename)
		{
            List<TO_Admits> list = new List<TO_Admits>();
		    try
		    {
		        using (
		            SqlConnection con =
		                new SqlConnection(ConfigurationManager.ConnectionStrings["SchoolDatabase"].ConnectionString))
		        {
		            con.Open();

		            using (SqlCommand cmd = new SqlCommand("usp_R_AdmitStatus", con))
		            {
		                cmd.CommandType = CommandType.StoredProcedure;
		                using (SqlDataReader reader = cmd.ExecuteReaderExtended())
		                    while (reader.Read())
		                        list.Add(new TO_Admits
		                        {
		                            Name = reader["ResidenceCounty"].ToNullSafeString(),
		                            Admitted = reader["Admitted"].ChangeType<int>(),
		                            NotAdmitted = reader["Not Admitted"].ChangeType<int>(),
		                            Waitlist = reader["Waiting List"].ChangeType<int>(),
		                            NoAction = reader["No Action"].ChangeType<int>(),
		                            Rejected = reader["Rejected"].ChangeType<int>()
		                        });
		            }
		        }

		        using (FileStream fs = new FileStream(filename, FileMode.OpenOrCreate))
		        using (StreamWriter sw = new StreamWriter(fs))
		        using (JsonWriter jw = new JsonTextWriter(sw))
		        {
		            jw.Formatting = Formatting.Indented;
		            JsonSerializer serializer = new JsonSerializer();
		            serializer.Serialize(jw, new List<TO_Admits>());
		        }
            }

		    catch (Exception ex)
		    {
                string log = ex.ToLogString("Database Error");
                string fileName = ConfigurationManager.AppSettings["SqlError"];
                using (FileStream fs = new FileStream(fileName, FileMode.OpenOrCreate))
                using (StreamWriter sw = new StreamWriter(fs))
                    sw.WriteLine(log);
		    }
		    return list;
		}
	}
}
namespace NCCounty.Models
{
	public class TO_Admits
	{
		public string Name { get; set; }
		public int Admitted { get; set; }
		public int NotAdmitted { get; set; }
		public int Waitlist { get; set; }
		public int NoAction { get; set; }
		public int Rejected { get; set; }
	}
}
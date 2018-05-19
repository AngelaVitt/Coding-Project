namespace Manager.ServiceAccessLayer
{
    public class SAM : ISAM
    {
        private JavaScriptSerializer _jss = new JavaScriptSerializer();
        private string _fuzionManagerAccessToken = FuzionUtility.GetSettingValue("FuzionManagerAccessToken");
		
		public async Task<HttpResponseMessage> GetIPAddresses()
        {
        	
        }
    }
}
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Knockout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private static string API_KEY = "00000000000000000000000000000000";

        [HttpGet("country/all")]
        [ResponseCache(Duration= 2592000)]
        public async Task<string> AllCountries()
        {
            using (var client = new HttpClient())
            {
                var result = await client.GetStringAsync($"https://battuta.medunes.net/api/country/all/?key={API_KEY}");
                return result;
            }
        }

        [HttpGet("region/{countryCode}/all")]
        [ResponseCache(Duration = 2592000)]
        public async Task<string> Regions(string countryCode)
        {
            using (var client = new HttpClient())
            {
                var result = await client.GetStringAsync($"https://battuta.medunes.net/api/region/{countryCode}/all/?key={API_KEY}");
                return result;
            }
        }

        [HttpGet("find/country/{region}/")]
        [ResponseCache(Duration = 2592000)]
        public async Task<string> FindCountry(string region)
        {
            using (var client = new HttpClient())
            {
                var result = await client.GetStringAsync($"https://battuta.medunes.net/api/country/search/?region={region}&key={API_KEY}");
                return result;
            }
        }
    }
}
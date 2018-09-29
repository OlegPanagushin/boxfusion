using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Both.Models;

namespace Both.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var model = new IndexViewModel
            {
               // Region = "Chittagong"
            };
            return View(model);
        }

        [HttpPost]
        public IActionResult Post([FromForm]IndexViewModel model)
        {
            return RedirectToAction("Thanks", model);
        }

        public IActionResult Thanks(IndexViewModel model)
        {
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

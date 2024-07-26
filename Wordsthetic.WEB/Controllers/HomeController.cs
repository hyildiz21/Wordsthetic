using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Wordsthetic.DB;
using Wordsthetic.DB.Models;
using Wordsthetic.WEB.Models;

namespace Wordsthetic.WEB.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        WordstheticContext context;
        public HomeController(ILogger<HomeController> logger)
        {
            context = new WordstheticContext();
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Add(string engWord, string trWord)
        {
            
            Word word = new Word
            {
                EngText = engWord,
                TrText = trWord
            };
            context.Words.Add(word);
            context.SaveChanges();
            return Json("ok");
        }

        public JsonResult Get()
        {
            return Json(context.Words.ToList().OrderByDescending(x=>x.WordId));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

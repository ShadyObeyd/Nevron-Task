using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Calculator.App.Controllers
{
    public class HomeController : Controller
    {
        private readonly Random _rnd;

        private const string NumbersKey = "numbers";

        public HomeController()
        {
            _rnd = new Random();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddNumber()
        {
            string json = HttpContext.Session.GetString(NumbersKey);

            List<int> numbers;

            if (string.IsNullOrEmpty(json))
            {
                numbers = new();
            }
            else
            {
                numbers = JsonSerializer.Deserialize<List<int>>(json);
            }

            int number = _rnd.Next(1, 1001);

            numbers.Add(number);
            HttpContext.Session.SetString(NumbersKey, JsonSerializer.Serialize(numbers));

            return Ok(new { number, numbers.Count });
        }

        public IActionResult ClearNumbers()
        {
            string json = HttpContext.Session.GetString(NumbersKey);

            if (string.IsNullOrEmpty(json))
            {
                return Ok();
            }

            HttpContext.Session.Remove(NumbersKey);

            return Ok();
        }

        public IActionResult SumNumbers()
        {
            string json = HttpContext.Session.GetString(NumbersKey);

            if (string.IsNullOrEmpty(json))
            {
                return Ok(0);
            }

            List<int> numbers = JsonSerializer.Deserialize<List<int>>(json);

            return Ok(numbers.Sum());
        }

        public IActionResult GetData()
        {
            string json = HttpContext.Session.GetString(NumbersKey);

            if (string.IsNullOrEmpty(json))
            {
                return Ok(new { });
            }

            List<int> numbers = JsonSerializer.Deserialize<List<int>>(json);

            int sum = numbers.Sum();

            return Ok(new { numbers, numbers.Count, sum });
        }
    }
}
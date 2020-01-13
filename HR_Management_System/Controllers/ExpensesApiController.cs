using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System;
using HR_Management_System.Data;
using HR_Management_System.Models;
using Microsoft.AspNetCore.Hosting;

namespace HR_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesApiController : ControllerBase
    {
        private readonly EmployeeContext _context;
        private readonly IWebHostEnvironment _env;
        public ExpensesApiController(EmployeeContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/ExpensesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetExpenses()
        {
            try
            {
                var data= _context.Expenses.Select(exp=> new{expensesId=exp.ExpensesId, deptId=exp.Department.DeptId,departmentName= exp.Department.DepartmentName, purchaseDate=exp.PurchaseDate, purchaseBy=exp.PurchaseBy,title=exp.Title,bill=exp.Bill,upload=exp.Upload}).ToList();
                return  data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;

            }
        }

        // GET: api/ExpensesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expenses>> GetExpenses(int id)
        {
            var expenses = await _context.Expenses.FindAsync(id);

            if (expenses == null)
            {
                return NotFound();
            }

            return expenses;
        }

        // PUT: api/ExpensesApi/5
        [HttpPut("{id}"),DisableRequestSizeLimit]
        public async Task<IActionResult> PutExpenses(int id, [FromForm] Expenses expenses)
        {
            if (id != expenses.ExpensesId)
            {
                return BadRequest();
            }
            expenses = await UploadImage(expenses);

            _context.Entry(expenses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpensesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExpensesApi
        [HttpPost,DisableRequestSizeLimit]
        public async Task<ActionResult<Expenses>> PostExpenses([FromForm] Expenses expenses)
        {
            if (expenses.Upload != null && expenses.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(expenses.Upload.FileName);


                string filePath = Path.Combine("images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await expenses.Upload.CopyToAsync(fs);
                }

                expenses.Bill = filePath.Replace(@"\", "/");
                expenses.Upload = null;
            }



            _context.Expenses.Add(expenses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenses", new { id = expenses.ExpensesId }, expenses);
        }

        private async Task<Expenses> UploadImage(Expenses expenses)
        {
            if (expenses.Upload != null && expenses.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(expenses.Upload.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await expenses.Upload.CopyToAsync(fs);
                }

                expenses.Bill = filePath.Replace(@"\", "/");
                expenses.Upload = null;
            }
            return expenses;
        }
        // DELETE: api/ExpensesApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expenses>> DeleteExpenses(int id)
        {
            var expenses = await _context.Expenses.FindAsync(id);
            if (expenses == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expenses);
            await _context.SaveChangesAsync();

            return expenses;
        }

        private bool ExpensesExists(int id)
        {
            return _context.Expenses.Any(e => e.ExpensesId == id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System;
using HR_Management_System.Models;

namespace HR_Management_System.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public ExpensesApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/ExpensesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expenses>>> GetExpenses()
        {
            return await _context.Expenses.ToListAsync();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenses(int id, Expenses expenses)
        {
            if (id != expenses.ExpensesId)
            {
                return BadRequest();
            }

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
        [HttpPost]
        public async Task<ActionResult<Expenses>> PostExpenses(Expenses expenses)
        {
            _context.Expenses.Add(expenses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenses", new { id = expenses.ExpensesId }, expenses);
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

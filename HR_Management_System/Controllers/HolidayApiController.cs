using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System;
using HR_Management_System.Data;
using HR_Management_System.Models;

namespace HR_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public HolidayApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/HolidayApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Holiday>>> GetHolidays()
        {
            return await _context.Holidays.ToListAsync();
        }

        // GET: api/HolidayApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Holiday>> GetHolidays(int id)
        {
            var holidays = await _context.Holidays.FindAsync(id);

            if (holidays == null)
            {
                return NotFound();
            }

            return holidays;
        }

        // PUT: api/HolidayApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHolidays(int id, Holiday holidays)
        {
            if (id != holidays.HolidayId)
            {
                return BadRequest();
            }

            _context.Entry(holidays).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HolidaysExists(id))
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

        // POST: api/HolidayApi
        [HttpPost]
        public async Task<ActionResult<Holiday>> PostHolidays(Holiday holidays)
        {
            _context.Holidays.Add(holidays);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHolidays", new { id = holidays.HolidayId }, holidays);
        }

        // DELETE: api/HolidayApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Holiday>> DeleteHolidays(int id)
        {
            var holidays = await _context.Holidays.FindAsync(id);
            if (holidays == null)
            {
                return NotFound();
            }

            _context.Holidays.Remove(holidays);
            await _context.SaveChangesAsync();

            return holidays;
        }

        private bool HolidaysExists(int id)
        {
            return _context.Holidays.Any(e => e.HolidayId == id);
        }
    }
}

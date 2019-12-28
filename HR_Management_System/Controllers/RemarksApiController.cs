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
    public class RemarksApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public RemarksApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/RemarksApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Remarks>>> GetRemarks()
        {
            return await _context.Remarks.ToListAsync();
        }

        // GET: api/RemarksApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Remarks>> GetRemarks(int id)
        {
            var remarks = await _context.Remarks.FindAsync(id);

            if (remarks == null)
            {
                return NotFound();
            }

            return remarks;
        }

        // PUT: api/RemarksApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRemarks(int id, Remarks remarks)
        {
            if (id != remarks.RemarkId)
            {
                return BadRequest();
            }

            _context.Entry(remarks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RemarksExists(id))
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

        // POST: api/RemarksApi
        [HttpPost]
        public async Task<ActionResult<Remarks>> PostRemarks(Remarks remarks)
        {
            _context.Remarks.Add(remarks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRemarks", new { id = remarks.RemarkId }, remarks);
        }

        // DELETE: api/RemarksApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Remarks>> DeleteRemarks(int id)
        {
            var remarks = await _context.Remarks.FindAsync(id);
            if (remarks == null)
            {
                return NotFound();
            }

            _context.Remarks.Remove(remarks);
            await _context.SaveChangesAsync();

            return remarks;
        }

        private bool RemarksExists(int id)
        {
            return _context.Remarks.Any(e => e.RemarkId == id);
        }
    }
}

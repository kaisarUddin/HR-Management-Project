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
    public class LeavesApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public LeavesApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/LeavesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leave>>> GetLeaves()
        {
            return await _context.Leaves.ToListAsync();
        }

        // GET: api/LeavesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Leave>> GetLeave(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            return leave;
        }

        // PUT: api/LeavesApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, Leave leave)
        {
            if (id != leave.LeaveId)
            {
                return BadRequest();
            }

            _context.Entry(leave).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
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

        // POST: api/LeavesApi
        [HttpPost]
        public async Task<ActionResult<Leave>> PostLeave(Leave leave)
        {
            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeave", new { id = leave.LeaveId }, leave);
        }

        // DELETE: api/LeavesApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Leave>> DeleteLeave(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);
            if (leave == null)
            {
                return NotFound();
            }

            _context.Leaves.Remove(leave);
            await _context.SaveChangesAsync();

            return leave;
        }

        private bool LeaveExists(int id)
        {
            return _context.Leaves.Any(e => e.LeaveId == id);
        }
    }
}

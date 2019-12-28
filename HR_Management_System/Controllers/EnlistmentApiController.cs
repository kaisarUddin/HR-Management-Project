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
    public class EnlistmentApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EnlistmentApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/EnlistmentApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enlistment>>> GetEnlistments()
        {
            return await _context.Enlistments.ToListAsync();
        }

        // GET: api/EnlistmentApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Enlistment>> GetEnlistment(int id)
        {
            var enlistment = await _context.Enlistments.FindAsync(id);

            if (enlistment == null)
            {
                return NotFound();
            }

            return enlistment;
        }

        // PUT: api/EnlistmentApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnlistment(int id, Enlistment enlistment)
        {
            if (id != enlistment.EnlistmentId)
            {
                return BadRequest();
            }

            _context.Entry(enlistment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnlistmentExists(id))
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

        // POST: api/EnlistmentApi
        [HttpPost]
        public async Task<ActionResult<Enlistment>> PostEnlistment(Enlistment enlistment)
        {
            _context.Enlistments.Add(enlistment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnlistment", new { id = enlistment.EnlistmentId }, enlistment);
        }

        // DELETE: api/EnlistmentApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Enlistment>> DeleteEnlistment(int id)
        {
            var enlistment = await _context.Enlistments.FindAsync(id);
            if (enlistment == null)
            {
                return NotFound();
            }

            _context.Enlistments.Remove(enlistment);
            await _context.SaveChangesAsync();

            return enlistment;
        }

        private bool EnlistmentExists(int id)
        {
            return _context.Enlistments.Any(e => e.EnlistmentId == id);
        }
    }
}

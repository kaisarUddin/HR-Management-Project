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
    public class ManagerApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public ManagerApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/ManagerApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manager>>> GetManagers()
        {
            return await _context.Managers.ToListAsync();
        }

        // GET: api/ManagerApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Manager>> GetManager(int id)
        {
            var manager = await _context.Managers.FindAsync(id);

            if (manager == null)
            {
                return NotFound();
            }

            return manager;
        }

        // PUT: api/ManagerApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutManager(int id, Manager manager)
        {
            if (id != manager.ManagerId)
            {
                return BadRequest();
            }

            _context.Entry(manager).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ManagerExists(id))
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

        // POST: api/ManagerApi
        [HttpPost]
        public async Task<ActionResult<Manager>> PostManager(Manager manager)
        {
            _context.Managers.Add(manager);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetManager", new { id = manager.ManagerId }, manager);
        }

        // DELETE: api/ManagerApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Manager>> DeleteManager(int id)
        {
            var manager = await _context.Managers.FindAsync(id);
            if (manager == null)
            {
                return NotFound();
            }

            _context.Managers.Remove(manager);
            await _context.SaveChangesAsync();

            return manager;
        }

        private bool ManagerExists(int id)
        {
            return _context.Managers.Any(e => e.ManagerId == id);
        }
    }
}

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
    public class PayrollPolicyApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public PayrollPolicyApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/PayrollPolicyApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayrollPolicy>>> GetPayrollPolicy()
        {
            return await _context.PayrollPolicy.ToListAsync();
        }

        // GET: api/PayrollPolicyApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayrollPolicy>> GetPayrollPolicy(int id)
        {
            var payrollPolicy = await _context.PayrollPolicy.FindAsync(id);

            if (payrollPolicy == null)
            {
                return NotFound();
            }

            return payrollPolicy;
        }

        // PUT: api/PayrollPolicyApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayrollPolicy(int id, PayrollPolicy payrollPolicy)
        {
            if (id != payrollPolicy.PolicyId)
            {
                return BadRequest();
            }

            _context.Entry(payrollPolicy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayrollPolicyExists(id))
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

        // POST: api/PayrollPolicyApi
        [HttpPost]
        public async Task<ActionResult<PayrollPolicy>> PostPayrollPolicy(PayrollPolicy payrollPolicy)
        {
            _context.PayrollPolicy.Add(payrollPolicy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayrollPolicy", new { id = payrollPolicy.PolicyId }, payrollPolicy);
        }

        // DELETE: api/PayrollPolicyApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayrollPolicy>> DeletePayrollPolicy(int id)
        {
            var payrollPolicy = await _context.PayrollPolicy.FindAsync(id);
            if (payrollPolicy == null)
            {
                return NotFound();
            }

            _context.PayrollPolicy.Remove(payrollPolicy);
            await _context.SaveChangesAsync();

            return payrollPolicy;
        }

        private bool PayrollPolicyExists(int id)
        {
            return _context.PayrollPolicy.Any(e => e.PolicyId == id);
        }
    }
}

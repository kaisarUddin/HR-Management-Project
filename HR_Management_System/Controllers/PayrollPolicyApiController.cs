using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System.Data;
using HR_Management_System.Models;

namespace HR_Management_System.Controllers
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
            var data = new List<PayrollPolicy>();
            try
            {
                data = _context.PayrollPolicy.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return data;
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
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

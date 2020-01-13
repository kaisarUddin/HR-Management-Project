using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System.Data;
using HR_Management_System.Models;

namespace HR_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public SalaryApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/SalaryApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSalaries()
        {
            var data = await _context.Salaries.Include(s=>s.Leave).Include(a=>a.PayrollPolicy).Select(s=> new
            {
                salaryId = s.SalaryId,
                employeeId = s.EmployeeId,
                employeeName = s.Employees.FullName,
                policyId = s.PolicyId,
                leaveId=s.LeaveId,
                policyType = s.PayrollPolicy.PolicyType,
                salaryType = s.SalaryType,
                basic = s.Basic,
                overTime=s.OverTime,
               totalLeave=s.Leave.TotalLeave,
                //transportAllowance = s.TransportAllowance,
                transportAllowance = s.Basic * s.PayrollPolicy.TA /100,
                houseRent = s.Basic * s.PayrollPolicy.HR / 100,
                medicalAllowance = s.Basic * s.PayrollPolicy.MA / 100,
                foodAllowance = s.Basic * s.PayrollPolicy.FA / 100,
                festivalBonus = s.Basic * s.PayrollPolicy.FB / 100,
                oTRate = s.OverTime * 500,
                providentFund = s.Basic * s.PayrollPolicy.PF / 100,
                leaveFine =  s.Leave.TotalLeave*1000,
                grossSalary = s.Basic + s.Basic * s.PayrollPolicy.TA / 100 + s.Basic * s.PayrollPolicy.HR / 100 + s.Basic * s.PayrollPolicy.MA / 100 + s.Basic * s.PayrollPolicy.FA / 100+ s.Basic * s.PayrollPolicy.FB / 100+ s.OverTime * 500
                - s.Basic * s.PayrollPolicy.PF / 100 - s.Leave.TotalLeave * 1000
            }).ToListAsync();
            return data;
        }

        // GET: api/SalaryApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salary>> GetSalary(int id)
        {
            var salary = await _context.Salaries.FindAsync(id);

            if (salary == null)
            {
                return NotFound();
            }

            return salary;
        }

        // PUT: api/SalaryApi/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalary(int id, Salary salary)
        {
            if (id != salary.SalaryId)
            {
                return BadRequest();
            }

            _context.Entry(salary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryExists(id))
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

        // POST: api/SalaryApi
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Salary>> PostSalary(Salary salary)
        {
            try
            {
                _context.Salaries.Add(salary);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSalary", new { id = salary.SalaryId }, salary);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return null;
            }
        }

        // DELETE: api/SalaryApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Salary>> DeleteSalary(int id)
        {
            var salary = await _context.Salaries.FindAsync(id);
            if (salary == null)
            {
                return NotFound();
            }

            _context.Salaries.Remove(salary);
            await _context.SaveChangesAsync();

            return salary;
        }

        private bool SalaryExists(int id)
        {
            return _context.Salaries.Any(e => e.SalaryId == id);
        }
    }
}

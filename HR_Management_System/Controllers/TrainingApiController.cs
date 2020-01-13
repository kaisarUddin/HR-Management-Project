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
    public class TrainingApiController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public TrainingApiController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/TrainingApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetTrainings()
        {
            try
            {
                var data=_context.Trainings.Select(t=>new{trainingId=t.TrainingId,trainingTitle=t.TrainingTitle,startDate=t.StartDate,endDate=t.EndDate,employeeId=t.Employee.EmployeeId,fullName=t.Employee.FullName,departmentName=t.Department.DepartmentName}).ToList();
                return data;
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                return null;
            }
        }

        // GET: api/TrainingApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Training>> GetTraining(int id)
        {
            var training = await _context.Trainings.FindAsync(id);

            if (training == null)
            {
                return NotFound();
            }

            return training;
        }

        // PUT: api/TrainingApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTraining(int id, Training training)
        {
            if (id != training.TrainingId)
            {
                return BadRequest();
            }

            _context.Entry(training).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingExists(id))
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

        // POST: api/TrainingApi
        [HttpPost]
        public async Task<ActionResult<Training>> PostTraining(Training training)
        {
            _context.Trainings.Add(training);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTraining", new { id = training.TrainingId }, training);
        }

        // DELETE: api/TrainingApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Training>> DeleteTraining(int id)
        {
            var training = await _context.Trainings.FindAsync(id);
            if (training == null)
            {
                return NotFound();
            }

            _context.Trainings.Remove(training);
            await _context.SaveChangesAsync();

            return training;
        }

        private bool TrainingExists(int id)
        {
            return _context.Trainings.Any(e => e.TrainingId == id);
        }
    }
}

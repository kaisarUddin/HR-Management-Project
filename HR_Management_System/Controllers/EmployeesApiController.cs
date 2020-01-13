using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Management_System.Data;
using HR_Management_System.Models;
using Microsoft.AspNetCore.Hosting;

namespace HR_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesApiController : ControllerBase
    {
        private readonly EmployeeContext _context;
        private readonly IWebHostEnvironment _env;

        public EmployeesApiController(EmployeeContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/EmployeesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEmployees()
        {
           
            try
            {
                var data = _context.Employees.Select(emp=>   new{ employeeId =  emp.EmployeeId , fullName = emp.FullName, departmentName = emp.Department.DepartmentName, designationName = emp.Designation.DesignationName, shiftName=emp.Shift.ShiftName, gender=emp.Gender,address=emp.Address,mobileNo=emp.MobileNo,email=emp.Email, enlistmentId=emp.Enlistment.EnlistmentId, joinDate = emp.Enlistment.JoinDate,bloodGroup=emp.BloodGroup,maritalStatus=emp.MaritalStatus, profilePicture=emp.ProfilePicture, upload=emp.Upload }).ToList();
                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
       
        }

        // GET: api/EmployeesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/EmployeesApi/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"),DisableRequestSizeLimit]
        public async Task<IActionResult> PutEmployee(int id, [FromForm] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            employee = await UploadImage(employee);
            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/EmployeesApi
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
       
        [HttpPost,DisableRequestSizeLimit]
        public async Task<ActionResult<Employee>> PostEmployee([FromForm] Employee employee)
        {


            if (employee.Upload != null && employee.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(employee.Upload.FileName);


                string filePath = Path.Combine("images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await employee.Upload.CopyToAsync(fs);
                }

                employee.ProfilePicture = filePath.Replace(@"\", "/");
                employee.Upload = null;
            }

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }
        private async Task<Employee> UploadImage(Employee employee)
        {
            if (employee.Upload != null && employee.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(employee.Upload.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await employee.Upload.CopyToAsync(fs);
                }

                employee.ProfilePicture = filePath.Replace(@"\", "/");
                employee.Upload = null;
            }
            return employee;
        }

        // DELETE: api/EmployeesApi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}

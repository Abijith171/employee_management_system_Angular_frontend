import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MainService } from '../service/main.service';
import {   IEmployee } from '../model/interface/mainServ';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent 
implements OnInit
 {

  isSuccus : boolean=false;
  editEmployee : any =null;
  isformVisible: boolean = false;
  isEditMode = false;
  
  departments :string[]=[
    "HR",
    "Engineering",
    "Finance",
    "Development",
    "Marketing",
    "Information Technology",
    "Customer Support",
    "Research and Development",
    "Procurement",
    "Operations",
    "Sales",
    "Quality Assurance",
  ];

  roles :string[]=[
    "HR Manager",
     "HR Coordinator",
    "Recruitment Specialist",
    "Employee Relations Specialist",

    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Software Engineer",
    "Quality Engineer",
   
    "Financial Analyst",
    "Accountant",
    "Chief Financial Officer (CFO)",    
    "Accounts Payable/Receivable Specialist",

    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Game Developer",

    "Marketing Manager ",
    "Digital Marketing Specialist ",
    "Content Strategist ",
    "Marketing Analyst ",
    "Brand Manager ",

    "IT Manager ",
    "Network Administrator ",
    "Systems Analyst ",
    "IT Support Specialist ",
    "Cybersecurity Analyst ",

    "Sales Executive ",
    "Sales Manager ",
    "Account Manager ",

    "QA Engineer ",
    "QA Analyst ",
    "Quality Manager ",
  ]

  employees: IEmployee[] = [];

  newEmployee: IEmployee = {
    employee_id: 0,
    name: '',
    email_id:'',
    contact: 0,
    department: '',
    role: '',
    actions : ''
  };
 
  addEmployee()
  {
    const newEmployeeCopy : IEmployee={
      ...this.newEmployee,employee_id:this.employees.length+1
    };

    this.employees.push(newEmployeeCopy);
    this.resetForm()
    {
      this.newEmployee={
        employee_id: 0,
      name: '',
      email_id:'',
      contact: 0,
      department: '',
      role: '',
      actions : ''
      };
    }
  }

  constructor(private MService: MainService ,private route : ActivatedRoute ) {
   }


   ngOnInit(): void {
    this.loadEmployees();
   this.MService.getAllemps
  this.newEmployee.employee_id = this.route.snapshot.params['IEmployee.employee_id'];
  
   }

   loadEmployees(): void
    {

    this.MService.getAllemps().subscribe(data => {

      this.employees = data;

    });
  }

  onUpdate(employee: IEmployee): void {
    this.isformVisible = true; 
    this.isEditMode = true;
    this.newEmployee = { ...employee }; 
    
  }
  
  saveChanges(): void 
  {
      this.MService.updateEmployee(this.newEmployee.employee_id, this.newEmployee).subscribe({
        next: (response) => {
          alert("Updated successfully")
          console.log('Employee updated successfully:', response);

          const index = this.employees.findIndex(emp => emp.employee_id === this.newEmployee.employee_id);
        if (index !== -1) {
          this.employees[index] = { ...this.newEmployee }; 
        }
          this.isSuccus = true;
          this.isformVisible = false; 
          this.isEditMode = false; 
        },
        error: (err) => {
          alert("Failed to update employee.")
          console.error('Error updating employee:', err);
          this.isSuccus = false;
        },
      });
     
  }

  
  ondelete(employee_id: number) {
    this.MService.deleteemployee(employee_id).subscribe(data =>
       {
        console.log('Employee deleted successfully:', data)
        alert("Employee deleted successfully!")
        this.isSuccus = true;
        this.loadEmployees();
       }
    )
  }

  AddEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.email_id && this.newEmployee.contact && this.newEmployee.department && this.newEmployee.role) {
      const newEmployeeCopy: IEmployee = {
        ...this.newEmployee,
        employee_id: this.employees.length + 1,
      };
  
      this.MService.postemployee(newEmployeeCopy).subscribe({
        next: (response) => {
          alert("Employee added successfully")
          console.log('Employee added successfully:', response);
          this.isSuccus = true;
          this.isformVisible = false;
          this.loadEmployees();
        },
        error: (err) => {
          alert("Failed to add employee.")
          console.error('Error adding employee:', err);
          this.isSuccus = false;
        },
      });
  
      this.resetForm();
    } else {
      console.warn('Invalid employee data. Please fill all fields.');
      alert("Please fill all required fields.")
      this.isSuccus = false;
    }
  }
  
  resetForm(): void {
    this.newEmployee = {
      employee_id: 0,
      name: '',
      email_id: '',
      contact: 0,
      department: '',
      role: '',
      actions: '',
    };
  }
 }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { projectsClass } from '../../model/projectclass';
import { ProjectService } from '../../service/projectServ/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectArry: projectsClass[] = [];
  isSuccus: boolean = false;
  editEmployee: any = null;
  isformVisible: boolean = false;
  isEditMode = false;

  ProjectClass: projectsClass = {
    project_id: 0,
    project_name: '',
    employee_id: 0,
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    status: ''
  };

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


  constructor(private projectService: ProjectService , private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProjects(); 
    this.loadProject();
    this.ProjectClass.project_id = this.router.snapshot.params['projectsClass.project_id'];
  }

  private getProjects(): void {
    this.projectService.getAllproj().subscribe(
      (data) => {
        this.projectArry = data; 
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }


  //Delete
deleteProject(project_id : number): void 
{
  this.projectService.deleteproj(project_id).subscribe(
    ()=>{this.getProjects();
      alert("Project Deleted Successfully");
      console.log('Project Deleted Successfully');
    },
    (error) =>{
      alert("Failed to delete");
      console.error('Error deleting project :', error);
    }
  );
  
}

loadProject() : void
{
  this.projectService.getAllproj().subscribe(data => {
    this.projectArry = data;
  });
}

//Adding 
addProject() : void
{
  if(this.ProjectClass.project_name && this.ProjectClass.employee_id  && this.ProjectClass.startDate && this.ProjectClass.endDate && this.ProjectClass.status && this.ProjectClass.role  )
  {
    const addedProject : projectsClass=
    {
      ...this.ProjectClass,
      project_id : this.projectArry.length +1,
    };
 
  this.projectService.postproject(addedProject).subscribe({
    next: (response) => {
      alert("Project added successfully")
      console.log('Project added successfully:', response);
      this.isSuccus = true;
      this.isformVisible = false;
      this.isEditMode= false;
      this.loadProject();
    },
    error: (err) => {
      alert("Failed to add project.")
      console.error('Error adding project:', err);
      this.isSuccus = false;
    },
  });

    this.resetForm();
}

}
onUpdate(project :projectsClass) : void{
  this.isformVisible =true;
  this.isEditMode= true;
  this.ProjectClass = { ...project};
}

saveChanges(): void {
    this.projectService.putProject(this.ProjectClass.project_id, this.ProjectClass).subscribe({
      next: (response) => {
        alert("Updated successfully");
        console.log('Project updated successfully:', response);
        const index = this.projectArry.findIndex(proj => proj.project_id === this.ProjectClass.project_id);
        if (index !== -1) {
  //         this.projectArry[index] = { ...response }; 
         this.projectArry[index] = response; 
        }
        this.resetForm();
        this.isSuccus = true;
        this.isformVisible = false;
        this.isEditMode = false;
      },
      error: (err) => {
        alert("Failed to update project.");
        console.error('Error updating project:', err);
        this.isSuccus = false;
      },
    });
  }


  resetForm(): void {
    this.ProjectClass = {
      project_id: 0,
      project_name: '',
      employee_id: 0,
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      status: ''
    };
  }
}

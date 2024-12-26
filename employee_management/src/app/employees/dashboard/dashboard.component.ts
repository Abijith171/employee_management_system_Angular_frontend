import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { MainService } from '../../service/main.service';
import { IEmployee } from '../../model/interface/mainServ';
import { count } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  [x: string]: any;

  employeeCount : number = 0;

  
  constructor(private MService: MainService  ) {
  }
  ngOnInit(): void 
  {
    this.MService.employeeCount().subscribe(
      (count) => {
        this.employeeCount = count;
      }
    );
  }

}

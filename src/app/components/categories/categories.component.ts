import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { RouterLink } from '@angular/router';
import { Category2 } from 'src/app/core/interfaces/category2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService){}

  categoires:Category2[]=[]
ngOnInit(): void {
  this._EcomdataService.category().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.categoires=response.data
    }
  })
}
}

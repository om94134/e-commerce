import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Products } from 'src/app/core/interfaces/products';
import { Category2 } from 'src/app/core/interfaces/category2';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService){}
  barnds:Category2[]=[]
 ngOnInit(): void {
   this._EcomdataService.brands().subscribe({
    next:(response)=>{
      console.log(response.data);
  this.barnds=response.data
    }
   })
 }

}

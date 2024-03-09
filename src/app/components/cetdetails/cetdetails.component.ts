import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Category2 } from 'src/app/core/interfaces/category2';

@Component({
  selector: 'app-cetdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cetdetails.component.html',
  styleUrls: ['./cetdetails.component.css']
})
export class CetdetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}
catId:string|null=``
catdetails:Category2={} as Category2
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.catId=param.get('id')
    }
  })
  this._EcomdataService.getcatdetails(this.catId).subscribe({
    next:(response)=>{
console.log(response);
this.catdetails=response.data
    }
  })
}


}

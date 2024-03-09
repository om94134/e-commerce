import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService ){}
carid:string|null=``
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     this.carid = param.get('id')
     console.log(this.carid);
     
    }
  })
}

paymentForm:FormGroup=new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl(''),
})


handelform():void{
this._EcomdataService.paymentmethod(this.carid , this.paymentForm.value).subscribe({
  next:(response)=>{
    console.log(response);
    if(response.status == 'success')
    {
      window.open(response.session.url)
    }
  }
})
}

}

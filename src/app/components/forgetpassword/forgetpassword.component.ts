import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router ){}
msgsuccess:string=``
msgcode:string=``
errmsg:string=``

  formForget:FormGroup=new FormGroup({
    email:new FormControl("")
  })

  forgetpasseword():void{
    this._AuthService.forgetPassword(this.formForget.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.msgsuccess=response.message
        document.querySelector('.forgetpassword')?.classList.add('d-none')
       document.querySelector('.verfiycode')?.classList.remove('d-none')
        
      },
      error:(err:HttpErrorResponse)=>{
        
        this.errmsg=err.error.message
      }
    })
  }

  formverfiy:FormGroup=new FormGroup({
    resetCode:new FormControl("")
  })

  verfycode():void{
    this._AuthService.verfiyCode(this.formverfiy.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.msgcode=response.status
 if(response.status == 'Success')
 {
  this._Router.navigate(['/resetpassword'])
 }
      }
    })
  }
}


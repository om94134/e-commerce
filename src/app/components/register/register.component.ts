import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,RouterLink ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  constructor(private AuthService:AuthService , private _Router:Router){}
  errmsg:string=``
  isloading:boolean=false
  registerForm:FormGroup=new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword:new FormControl(''),
    mobile:new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators:[this.confirmPassword]}as FormControlOptions)
  confirmPassword(group:FormGroup):void{
    const password = group.get('password')
    const rePassword =group.get('rePassword')
    if(rePassword?.value == "")
    {
      rePassword.setErrors({required:true})
    }
    else if(rePassword?.value != password?.value)
     {
      rePassword?.setErrors({mismatch:true})
     }
  }

  handelForm():void{
    if(this.registerForm.valid){
this.isloading=true
      this.AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success')
          {
             this._Router.navigate(['/login'])
             this.isloading=false

          }
        },
        error:(err:HttpErrorResponse)=>{
              this.errmsg= err.error.message
              this.isloading=false
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  constructor(private AuthService:AuthService , private _Router:Router){}
  errmsg:string=``
  isloading:boolean=false
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
   
  })


  handelForm():void{
    if(this.loginForm.valid){
      this.isloading=true
      this.AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success')
          { localStorage.setItem('eToken' , response.token)
             this._Router.navigate(['/home'])
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
      this.loginForm.markAllAsTouched()
    }
  }

}


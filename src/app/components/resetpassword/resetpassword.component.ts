import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  constructor(private AuthService:AuthService , private _Router:Router){}
  errmsg:string=``
  isloading:boolean=false
  restForm:FormGroup=new FormGroup({
    email:new FormControl(''),
    newPassword:new FormControl('' )
   
  })


  handelForm():void{
    this.isloading=true
    if(this.restForm.valid){
      this.AuthService.restPasword(this.restForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          if(response.message == 'success')
          {
 console.log(response);
 
            this.isloading=false
             this._Router.navigate(['/login'])
          }
        },
        error:(err)=>{
          console.log(err);
          this.isloading=false
        }
      })
    }
    else{
      this.restForm.markAllAsTouched()
    }
  }

}




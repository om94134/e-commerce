import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService , private _Renderer2:Renderer2){}
  cartdetails:any=null

ngOnInit(): void {
  this._EcomdataService.getCart().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.cartdetails=response.data
    }
  })
}

reomveItem(id:string , element:HTMLButtonElement):void{
  this._Renderer2.setAttribute(element , 'disabled' , 'true')
  this._EcomdataService.removeCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.cartdetails=response.data
      this._Renderer2.removeAttribute(element , 'disabled')
      this._EcomdataService.cartnumber.next(response.numOfCartItems)
    },
    error:(err)=>{
      this._Renderer2.removeAttribute(element , 'disabled')

    }
  })
}
changecount(counter:number , id:string , el1:HTMLButtonElement , el2:HTMLButtonElement):void{
 if(counter >=0)
 {
  this._Renderer2.setAttribute(el1 ,'disabled' , 'true')
  this._Renderer2.setAttribute(el2 ,'disabled' , 'true')
  this._EcomdataService.updataCount( id , counter).subscribe({
    next:(response)=>{
      console.log(response);
      this.cartdetails=response.data
      this._Renderer2.removeAttribute(el1 , 'disabled')
      this._Renderer2.removeAttribute(el2 , 'disabled')
    },
  })
 }
}
clear():void{
  this._EcomdataService.clearCart().subscribe({
    next:(reponse)=>{
      if(reponse.message == 'success')
      {
        this.cartdetails=null
        this._EcomdataService.cartnumber.next(0)
      }
    }
  })
}

}

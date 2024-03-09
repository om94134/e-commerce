import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule , RouterLink ,RouterLinkActive ],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent  implements OnInit{
  constructor(private _Router:Router  , private _EcomdataService:EcomdataService , private _Renderer2:Renderer2){}
cartnum:number=0
wishnum:number=0

@ViewChild('navbar') element!:ElementRef

@HostListener('window:scroll')
onscroll():void{

  if(scrollY > 500)
  {
    this._Renderer2.addClass(this.element.nativeElement , ('px-5'))
    this._Renderer2.addClass(this.element.nativeElement , ('shadow'))
  }
  else
  {
    this._Renderer2.removeClass(this.element.nativeElement , ('px-5'))
    this._Renderer2.removeClass(this.element.nativeElement , ('shadow'))
  }
}
ngOnInit(): void {
  this._EcomdataService.cartnumber.subscribe({
    next:(data)=>{
      this.cartnum=data
    }
  })
  this._EcomdataService.getCart().subscribe({
    next:(response)=>{
      this.cartnum=response.numOfCartItems
    }
  })
  this._EcomdataService.wishlistnumber.subscribe({
    next:(response)=>{
      this.wishnum=response
      console.log(this.wishnum);  
    }
  })
  this._EcomdataService.addtomyheart().subscribe({
    next:(response)=>{
    this.wishnum=response.count
    }
  })
}
  signOut():void{
     localStorage.removeItem('eToken')
     this._Router.navigate(['/login'])
  }
}

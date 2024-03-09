import { Products } from './../../core/interfaces/products';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { CutextPipe } from 'src/app/core/pipes/cutext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category2 } from 'src/app/core/interfaces/category2';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , CutextPipe , CarouselModule , RouterLink , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService , private _ToastrService:ToastrService , private _Renderer2:Renderer2){}

popularProduct:Products[]=[]
categoires:Category2[]=[]
searchTerm:string=``
wishlist:string[]=[]


ngOnInit(): void {
  this._EcomdataService.popularProduct().subscribe({
    next:(response)=>{
      this.popularProduct=response.data
    console.log(response.data);
    }
  })
  this._EcomdataService.category().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.categoires=response.data
      
    }
  })

  this._EcomdataService.addtomyheart().subscribe({
    next:(reponse)=>{
      console.log( "heart",reponse);
const newdata=reponse.data.map((item:any)=>item._id)
this.wishlist=newdata
    }
  })
}
goToCart(proid:any , element:HTMLButtonElement):void{
  this._Renderer2.setAttribute(element , 'disabled' , 'true')
  this._EcomdataService.addCart(proid).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message)
      this._Renderer2.removeAttribute(element , 'disabled')
      this._EcomdataService.cartnumber.next(response.numOfCartItems)
    },
    error:(err)=>{
      this._Renderer2.removeAttribute(element , 'disabled')
    }
  })
}
removefav(prodid:string|undefined):void{
this._EcomdataService.removefavfromwishlist(prodid).subscribe({
  next:(reponse)=>{
    console.log( "rem" , reponse.data);
    this._ToastrService.success(reponse.message)
    this.wishlist=reponse.data
this._EcomdataService.wishlistnumber.next(reponse.data.length)
  }
})
}

addwishlist(prodid:string|undefined):void{
  this._EcomdataService.addtowishlist(prodid).subscribe({
next:(response)=>{
  console.log( "add" , response);
  this._ToastrService.success(response.message)
  this.wishlist=response.data
  this._EcomdataService.wishlistnumber.next(response.data.length)

}
  })
}
categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplaySpeed:3000,
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false,
  autoplay:true
}
mainSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  autoplaySpeed:3000,
  nav: false,
  autoplay:true
}

}

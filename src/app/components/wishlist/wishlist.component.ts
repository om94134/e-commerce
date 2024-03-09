import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Products } from 'src/app/core/interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CutextPipe } from 'src/app/core/pipes/cutext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , RouterLink , CutextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit  {
constructor(private _EcomdataService:EcomdataService , private _ToastrService  :ToastrService , private _Renderer2:Renderer2){}
popularProduct:Products[]=[]
wishlist:string[]=[]

 
ngOnInit(): void {
  this._EcomdataService.addtomyheart().subscribe({
    next:(response)=>{
      console.log(response);
      this.popularProduct=response.data
      const newdata=response.data.map((item:any)=>item._id)
this.wishlist=newdata
    }
  })
}
addwishlist(prodid:string|undefined):void{
  this._EcomdataService.addtowishlist(prodid).subscribe({
next:(response)=>{
  console.log(response);
  this._ToastrService.success(response.message)
  this.wishlist=response.data
  this._EcomdataService.wishlistnumber.next(response.data.length)

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
      console.log(reponse.data);
      this._ToastrService.success(reponse.message)
      this.wishlist=reponse.data
      const newdata = this.popularProduct.filter((item:any)=>this.wishlist.includes(item._id))
      this.popularProduct=newdata
      this._EcomdataService.wishlistnumber.next(reponse.data.length)

    }
  })
  }

}

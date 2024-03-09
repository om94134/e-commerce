import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/core/interfaces/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService , private _ActivatedRoute:ActivatedRoute , private _Renderer2:Renderer2 , private _ToastrService:ToastrService){}
productDetails:any=null
productId:any
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
    this.productId =  param.get('id')
    this._EcomdataService.productDetails(this.productId).subscribe({
      next:(response)=>{
           console.log(response.data);
this.productDetails=response.data
      }
    })
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

detailsoptionas: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

}

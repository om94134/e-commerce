import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomdataService } from 'src/app/core/services/ecomdata.service';
import { Products } from 'src/app/core/interfaces/products';
import { RouterLink } from '@angular/router';
import { CutextPipe } from 'src/app/core/pipes/cutext.pipe';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink , CutextPipe , NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService , private _Renderer2:Renderer2 , private _ToastrService:ToastrService){}
popularProduct:Products[]=[]
pageSize:number=0
page:number=1
total:number=0
  ngOnInit(): void {
    this._EcomdataService.popularProduct().subscribe({
      next:(response)=>{
        this.popularProduct=response.data
      console.log(response.data);
      this.pageSize=response.metadata.limit
      this.page=response.metadata.currentPage
      this.total=response.results
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
  pageChanged(event:any):void{
    this._EcomdataService.popularProduct(event).subscribe({
      next:(response)=>{
        this.popularProduct=response.data
      console.log(response.data);
      this.pageSize=response.metadata.limit
      this.page=response.metadata.currentPage
      this.total=response.results
      }
    })
  }
}

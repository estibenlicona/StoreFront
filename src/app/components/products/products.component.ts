import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

//Interfaces
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	products: Array<IProduct>;

  constructor(
    private readonly _productService: ProductService
  ) { 
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(){
    await this._productService.getProducts().then( (resp:any) => {
			if(resp?.body){
        return resp?.body;
      }
		})
		.then( (products: Array<IProduct>) => {
			this.products = products;
		});
    console.log(this.products);
  }

  async deleteProduct(id: any){

    Swal.fire({
			icon: 'info',
			title: "Espere",
			text: "Guardando información",
			allowOutsideClick: false
		});
		Swal.showLoading();

    await this._productService.deleteProduct(id).then( (resp:any) => {
			if(resp?.body){
        return resp?.body;
      }
		})
		.then( (resp) => {
      if(resp){
        Swal.fire({
          icon: 'success',
          title: 'Delete',
          text: 'Successful process.',
        });
        this.getProducts();
      }
		});
  }
}

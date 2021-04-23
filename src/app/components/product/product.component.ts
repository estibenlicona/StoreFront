import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductModel } from '../../models/product.model';
import { isNull } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	product: ProductModel = new ProductModel(); 
	constructor(
		private readonly _productService: ProductService,
		private route: ActivatedRoute 
	) { }

	ngOnInit(): void {
		this.getProduct();
	  }
	
	async getProduct(){
		const id:any = this.route.snapshot.paramMap.get('id');
		if(id != null){
			await this._productService.getProduct(id).then( (resp:any) => {
				if(resp?.body){
					return resp?.body;
				}
			})
			.then( (products: IProduct) => {
				this.product = products;
			});
			console.log(this.product);
		}
	}

	async save( form: NgForm ){

		if ( form.invalid ) {
			console.log('Formulario no válido');
			return;
		}

		Swal.fire({
			icon: 'info',
			title: "Espere",
			text: "Guardando información",
			allowOutsideClick: false
		});
		Swal.showLoading();
	
		let promise: any;
		let body = this.product;	
		if ( this.product.id ) {
			promise = await this._productService.updateProduct( body );
		} else {
			delete body.id;
			promise = await this._productService.createProduct(body);
		}
		if(typeof promise === 'object' && promise.body){
			Swal.fire({
				icon: 'success',
				title: this.product.name,
				text: 'Successful process.',
			});
			if(!this.product.id){
				this.product = new ProductModel();
			}
			
		}else{
			Swal.fire({
				icon: 'error',
				title: 'Server error',
				text: 'We have problems, please try again later.',
			});
		}

	}

}

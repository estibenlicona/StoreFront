import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	private url: string = '/appstore/api/';
	constructor(
		private http: HttpClient 
	) { 
		
	}

	getToken(){

		const httpOptions = {
			headers: new HttpHeaders({
			  'Accept':  'application/json',
			  'Content-Type':  'application/json'
			})
		};

		const body = { 
			Username: "estibenlicona",
			Password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" 
		};

		const urlToken = this.url + 'token';
		const promise = this.http.post(urlToken, body, httpOptions).toPromise();
		return promise;
	}

	async getProduct(id:any){
		let authorization:string = '';
		await this.getToken()
		.then( (resp:any) => {
			return `Bearer ${resp.token}`;
		})
		.then( token => {
			authorization = token;
		});

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept':  'application/json',
				Authorization: authorization
			})
		};

		const urlProduct = this.url + 'product/' + id;
		const promise = this.http.get(urlProduct, httpOptions).toPromise();
		return promise;
	}

	async getProducts(){

		let authorization:string = '';
		await this.getToken()
		.then( (resp:any) => {
			return `Bearer ${resp.token}`;
		})
		.then( token => {
			authorization = token;
		});

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept':  'application/json',
				Authorization: authorization
			})
		};

		const urlProducts = this.url + 'product';
		const promise = this.http.get(urlProducts, httpOptions).toPromise();
		return promise;

	}

	async createProduct(product: IProduct){
		
		let authorization:string = '';
		await this.getToken()
		.then( (resp:any) => {
			return `Bearer ${resp.token}`;
		})
		.then( token => {
			authorization = token;
		});

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept':  'application/json',
				Authorization: authorization
			})
		};

		const urlProduct = this.url + 'product';
		const promise =  this.http.post(urlProduct, product, httpOptions).toPromise();
		return promise;
	}

	async deleteProduct(id:any){
		let authorization:string = '';
		await this.getToken()
		.then( (resp:any) => {
			return `Bearer ${resp.token}`;
		})
		.then( token => {
			authorization = token;
		});

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept':  'application/json',
				Authorization: authorization
			})
		};

		const urlProduct = this.url + 'product/' + id;
		const promise =  this.http.delete(urlProduct, httpOptions).toPromise();
		return promise;
	}

	async updateProduct(product: IProduct){
		let authorization:string = '';
		await this.getToken()
		.then( (resp:any) => {
			return `Bearer ${resp.token}`;
		})
		.then( token => {
			authorization = token;
		});

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept':  'application/json',
				Authorization: authorization
			})
		};

		const urlProduct = this.url + 'product/' + product.id;
		const promise =  this.http.put(urlProduct, product, httpOptions).toPromise();
		return promise;
	}

}




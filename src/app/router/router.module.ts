import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProductsComponent } from '../components/products/products.component';
import { ProductComponent } from '../components/product/product.component';

const routes: Routes = [
	{ path: 'products', component: ProductsComponent },
	{ path: 'product/:id', component: ProductComponent }, 
	{ path: 'product', component: ProductComponent },
  	{ path: '**', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRouterModule { }

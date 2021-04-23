import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouterModule } from './router/router.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

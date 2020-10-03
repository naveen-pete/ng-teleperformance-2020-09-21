import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductsComponent } from './products/products.component';

// http://localhost:4200 - Home
// http://localhost:4200/products - Products
// http://localhost:4200/products/new - ProductForm
// http://localhost:4200/products/100 - ProductDetail
// http://localhost:4200/products/100/edit - ProductForm
// http://localhost:4200/sign-up - SignUp
// http://localhost:4200/login - Login
// http://localhost:4200/sdfsfsfd - 
//   1. Show Not Found component
//   2. Redirect to Home component

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'new', component: ProductFormComponent },
      { path: ':id', component: ProductDetailComponent }, // route parameters
      { path: ':id/edit', component: ProductFormComponent }
    ]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
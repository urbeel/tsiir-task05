import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {NgOptimizedImage} from "@angular/common";
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {ApiInterceptor} from "./interceptors/api.interceptor";
import {CartPageComponent} from './pages/cart-page/cart-page.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AdminBarComponent} from './components/admin-bar/admin-bar.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';
import {UpdateCategoryModalComponent} from './components/modals/update-category-modal/update-category-modal.component';
import {ProductsPageComponent} from './pages/products-page/products-page.component';
import {
  UpdateProductQuantityModalComponent
} from './components/modals/update-product-quantity-modal/update-product-quantity-modal.component';
import {CreateProductModalComponent} from './components/modals/create-product-modal/create-product-modal.component';
import {OrdersPageComponent} from './pages/orders-page/orders-page.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {CreateAdminModalComponent} from './components/modals/create-admin-modal/create-admin-modal.component';
import {HttpResponseInterceptor} from "./interceptors/http-response.interceptor";
import {GlobalErrorBarComponent} from './components/global-error-bar/global-error-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginPageComponent,
    ProductCardComponent,
    RegistrationPageComponent,
    ProductPageComponent,
    CartPageComponent,
    AdminBarComponent,
    CategoriesPageComponent,
    UpdateCategoryModalComponent,
    ProductsPageComponent,
    UpdateProductQuantityModalComponent,
    CreateProductModalComponent,
    OrdersPageComponent,
    UsersPageComponent,
    CreateAdminModalComponent,
    GlobalErrorBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

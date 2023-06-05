import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {customerGuard} from "./guards/customer.guard";
import {CategoriesPageComponent} from "./pages/categories-page/categories-page.component";
import {adminGuard} from "./guards/admin.guard";
import {ProductsPageComponent} from "./pages/products-page/products-page.component";
import {OrdersPageComponent} from "./pages/orders-page/orders-page.component";
import {UsersPageComponent} from "./pages/users-page/users-page.component";

const routes: Routes = [
  {path: "", component: HomePageComponent, title: "Online store"},
  {path: "login", component: LoginPageComponent, title: "Login"},
  {path: "registration", component: RegistrationPageComponent, title: "Registration"},
  {path: "products/:product-id", component: ProductPageComponent},
  {path: "cart", component: CartPageComponent, canActivate: [customerGuard]},
  {path: "categories", component: CategoriesPageComponent, canActivate: [adminGuard]},
  {path: "products", component: ProductsPageComponent, canActivate: [adminGuard]},
  {path: "orders/:order-status", component: OrdersPageComponent, canActivate: [adminGuard]},
  {path: "users", component: UsersPageComponent, canActivate: [adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

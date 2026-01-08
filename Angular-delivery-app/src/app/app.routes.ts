import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { OrderComponent } from './order-component/order-component';
import { ServicesComponent } from './services-component/services-component';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'order', component: OrderComponent},
    {path: 'services', component: ServicesComponent}
];

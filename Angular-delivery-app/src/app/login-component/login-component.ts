import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  imports: [RouterOutlet, RouterModule, FormsModule ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router){}

  loginvalidation(){

    if(this.email === "admin" && this.password === "root"){
      Swal.fire({
      title: 'Success!',
      text: 'Correct credentials',
      icon: 'success',
      confirmButtonText: 'OK'
      });
      this.router.navigate(['/home']);
    }else{
      Swal.fire({
      title: 'Failed!',
      text: 'Use correct credentials',
      icon: 'error',
      confirmButtonText: 'Try again'
      });
      this.router.navigate(['/']);
    }
  }

}

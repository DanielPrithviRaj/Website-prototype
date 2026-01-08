import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-component',
  imports: [RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  constructor(private router: Router){}

  onlyNumbers(event: any) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}

  form = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
    area: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
  })

  registerdata(){
    
    if(this.form.invalid){
      Swal.fire({
      title: 'Invalid',
      text: 'Please fill all fields!',
      icon: 'error',
      confirmButtonText: 'Try again'
      });
      return;
    }
      Swal.fire({
      title: 'Success',
      text: 'Registered Successfully!',
      icon: 'success',
      confirmButtonText: 'Ok'
      });
    this.router.navigate(['/']);

  }

}

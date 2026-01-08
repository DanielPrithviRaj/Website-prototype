import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-order-component',
  imports: [FormsModule],
  templateUrl: './order-component.html',
  styleUrl: './order-component.css',
})
export class OrderComponent {


  onSubmit(orderForm : NgForm){
    console.log(orderForm.value)
  }
}

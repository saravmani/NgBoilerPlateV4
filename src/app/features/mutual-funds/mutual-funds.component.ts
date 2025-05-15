import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mutual-funds',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mutual-funds.component.html',
  styleUrl: './mutual-funds.component.css'
})
export class MutualFundsComponent {

}

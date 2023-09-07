import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['test1@test.com', Validators.email],
    password: ['123456', [ Validators.minLength(6) ] ],
    name: ['test1', [ Validators.minLength(4) ]]
  });


  register() {
    if( !this.myForm.valid ) return;
    
    const { email, password, name } = this.myForm.value;
    this.authService.register(email, name, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (errorMessage) => {
          Swal.fire('Error', errorMessage, 'error');
        }
      });
  };

}

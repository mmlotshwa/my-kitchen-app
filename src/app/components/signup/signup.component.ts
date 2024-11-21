import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FontAwesomeModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  myForm: FormGroup = new FormGroup({});
  message: string = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faExclamationCircle = faExclamationCircle;
  passwordVisible = false;
  confirmPasswordVisible = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}

  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
        confirmPassword: ['', [Validators.required]],
        dietary: ['', Validators.required]
      }, {validator: this.passwordMatchValidator });
  }

  submitForm(){
    this.submitted = true;
    if(this.userService.checkEmail(this.myForm.value.email)) {
      this.message = 'User already exists! Please Sign In!';
    } else {
      this.userService.addUser(
        this.myForm.value.firstname,
        this.myForm.value.lastname,
        this.myForm.value.email,
        this.myForm.value.password,
        this.myForm.value.dietary
      )
      this.message = 'User successfully loaded! Sign in please!';
    }
    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 2000);
  }

  passwordMatchValidator(form: FormGroup){
    return (form.get('password')?.value === form.get('confirmPassword')?.value ? null : {mismatch: true});
  }

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmVisibility(){
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope,  faLock, faEye, faEyeSlash, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ FontAwesomeModule, ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent{
  myForm: FormGroup = new FormGroup({});
  message: string='';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faArrowRight = faArrowRight;
  faLock = faLock;
  faEnvelope = faEnvelope;
  faExclamationCircle = faExclamationCircle;
  passwordVisible = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}

  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',Validators.required],
      })

      this.userService.addUser(
        "Mandla",
        "Mlotshwa",
        "mandlam@hotmail.com",
        "20@Angular24",
        "Vegan"
      )
  }

  submitForm(){
    this.submitted = true;
    console.log('User Authentication Status: ' + this.userService.isAuthenticated);

    if(this.userService.checkLogin(this.myForm.value.email,this.myForm.value.password)) {
      this.message = 'Login successful';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);

      const user: any | undefined = this.userService.getUserByEmail(this.myForm.value.email);
      if(user) {
        this.userService.setUser(user); //Set current logged in user....
      }
      console.log('User Authentication Status: ' + this.userService.isAuthenticated);
    } else {
      this.message = 'Invalid username or password';
    }
  }

  toggleVisibility(){
    this.passwordVisible = !this.passwordVisible;
  }
}

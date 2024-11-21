import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ FontAwesomeModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  user: any;
  myForm: FormGroup = new FormGroup({});
  message: string = '';
  faExclamationCircle = faExclamationCircle;
  oldEmail: string = '';
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;

      if(user){
        this.oldEmail = user.email;
        this.myForm = this.formBuilder.group({
          firstname: ['', [Validators.required, Validators.minLength(3)]],
          lastname: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          dietary: ['', Validators.required]
        });
        this.myForm.patchValue(user);
      }
      this.myForm.markAsPristine;
    }); 
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }

  submitForm(){
    if(this.myForm.get('firstname')?.dirty){
      this.userService.setFirstname(this.oldEmail, this.myForm.get('firstname')?.value);
    }

    if(this.myForm.get('lastname')?.dirty){
      this.userService.setLastname(this.oldEmail, this.myForm.get('lastname')?.value);
    }

    if(this.myForm.get('email')?.dirty){
      this.userService.setEmail(this.oldEmail, this.myForm.get('email')?.value);
    }

    if(this.myForm.get('dietary')?.dirty){
      this.userService.setDietary(this.oldEmail, this.myForm.get('dietary')?.value);
    }
  }
}

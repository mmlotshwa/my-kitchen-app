import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse,  faAddressBook, faAddressCard, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{
  faHouse = faHouse;
  faAddressBook = faAddressBook; 
  faAddressCard =faAddressCard; 
  faRightToBracket = faRightToBracket; 
  faRightFromBracket = faRightFromBracket;
  user: any;
  username: string = '';
  isAuthenticated: boolean = false;
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;

      if(user){
        this.username = user.firstname + ' ' + user.lastname;
        this.isAuthenticated = true;
      }
    });
  }

  onSignOut(){
    this.isAuthenticated = false;
    this.userService.setUser(undefined);
  }

}

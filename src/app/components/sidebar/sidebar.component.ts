import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBurger, faUser, faSliders } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  faDashboard = faBurger;
  faUser = faUser;
  faSliders = faSliders;
  user: any;
  username: string = '';
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;

      if(user){
        this.username = user.firstname + ' ' + user.lastname;
      }
    });
  }
}

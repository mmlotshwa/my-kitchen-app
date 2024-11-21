import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  user: any;
  username: string = '';
  photos: any[] = [];
  preferred: string = '';
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;

      if(user){
        this.username = user.firstname + ' ' + user.lastname;
        this.preferred = user.dietary;
        this.applyUserDietaryPreferences(this.preferred);
        // Subscribe to filtered photos
        this.userService.filteredPhotos$.subscribe((photos) => {
        this.photos = photos;
      });
      }
    }); 
  }

  applyUserDietaryPreferences(preferred: string) {
    if(preferred.toLowerCase() !== "all"){
      this.userService.filterPhotosByTitle(preferred);
    }
  }

}

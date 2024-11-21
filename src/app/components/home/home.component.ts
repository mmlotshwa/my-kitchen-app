import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  photos: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Fetch all photos when the component initializes
    this.userService.fetchAllPhotos();

    // Subscribe to filtered photos
    this.userService.filteredPhotos$.subscribe((photos) => {
      this.photos = photos;
    });
  }

}

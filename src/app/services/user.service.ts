import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dietary: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: User[] = [];
  //holds current auntethicated user
  private userSubject = new BehaviorSubject<any>(null); 
  user$ = this.userSubject.asObservable(); 

  //keep a photo collection of all the photos and also of filtered photos depending on user diet preference...
  private photoCollectionSubject = new BehaviorSubject<any[]>([]); // Holds all photos
  photoCollection$ = this.photoCollectionSubject.asObservable();

  private filteredPhotosSubject = new BehaviorSubject<any[]>([]); // Holds filtered photos
  filteredPhotos$ = this.filteredPhotosSubject.asObservable();

  constructor() { 
    
  }

  addUser(firstname: string, lastname: string, email: string, password: string, dietary: string){
    this.users.push({ firstname, lastname, email, password, dietary});
  }

  checkLogin(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

  getUsers(): User[] {
    return this.users;
  }

  checkEmail(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  setFirstname(email: string, firstname: string) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.firstname = firstname; 
      const userIndex = this.users.findIndex(u => u.email === email); 
      if (userIndex !== -1) {
        this.users[userIndex] = user; 
        this.setUser(user); 
      }
    }
  }

  setLastname(email: string, lastname: string) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.lastname = lastname; 
      const userIndex = this.users.findIndex(u => u.email === email); 
      if (userIndex !== -1) {
        this.users[userIndex] = user; 
        this.setUser(user); 
      }
    }
  }

  setDietary(email: string, dietary: string) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.dietary = dietary; 
      const userIndex = this.users.findIndex(u => u.email === email); 
      if (userIndex !== -1) {
        this.users[userIndex] = user; 
        this.setUser(user); 
      }
    }
  }

  setEmail(email: string, newEmail: string) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.email = newEmail; 
      const userIndex = this.users.findIndex(u => u.email === email); 
      if (userIndex !== -1) {
        this.users[userIndex] = user; 
        this.setUser(user); 
      }
    }
  }

  setUser(user: User | undefined){
    this.userSubject.next(user);
  }

  getUser(){
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getUser;
  }

  // Set the entire photo collection
  setPhotoCollection(photos: any[]) {
    this.photoCollectionSubject.next(photos);
    this.filteredPhotosSubject.next(photos); // Initially, filtered = all
  }

  // Fetch all photos (mock implementation)
  fetchAllPhotos() {
    const photos = [
      { id: 1, url: 'images/cake-vegetarian.jpeg', title: 'vegetarian', describe: 'Chocolate Cake' },
      { id: 2, url: 'images/falafel-vegan.jpeg', title: 'vegan', describe: 'Vegan Falafel' },
      { id: 3, url: 'images/fish-vegan.jpeg', title: 'vegan', describe: 'Vegan Fish' },
      { id: 4, url: 'images/glutan-vegan.jpeg', title: 'vegan', describe: 'Vegan Glutan' },
      { id: 5, url: 'images/lentil-patties-vegan.jpeg', title: 'vegan', describe: 'Vegan Lentil Patties' },
      { id: 6, url: 'images/meal-vegan.jpeg', title: 'vegan', describe: 'Vegan Meal' },
      { id: 7, url: 'images/meal-vegetarian.jpeg', title: 'vegetarian', describe: 'Vegetarian Meal' },
      { id: 8, url: 'images/minipies-vegetarian.jpeg', title: 'vegetarian', describe: 'Mini Pies (Vegetarian)' },
      { id: 9, url: 'images/pie-meal-vegetarian.jpeg', title: 'vegetarian', describe: 'Pie Meal (Vegetarian)' },
      { id: 10, url: 'images/pizza-vegan.jpeg', title: 'vegan', describe: 'Vegan Pizza' },
      { id: 11, url: 'images/platters-vegan.jpeg', title: 'vegan', describe: 'Vegan Platters' },
      { id: 12, url: 'images/sushi-pizza-patties-vegetarian.jpeg', title: 'vegetarian', describe: 'Platters: Sushi (Vg), Pizza, Patties' },
      { id: 13, url: 'images/sushi-vegan.jpeg', title: 'vegan', describe: 'Vegan Sushi' },
      { id: 14, url: 'images/assorted-vegetarian.jpeg', title: 'vegetarian', describe: 'Assorted Dishes (Vegetarian)' },
    ];
    this.setPhotoCollection(photos);
  }

  // Filter photos by title
  filterPhotosByTitle(title: string) {
    const allPhotos = this.photoCollectionSubject.value;
    const filtered = allPhotos.filter((photo) =>
      photo.title.toLowerCase().includes(title.toLowerCase())
    );
    this.filteredPhotosSubject.next(filtered);
  }
}

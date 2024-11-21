import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe( //This helps with ansynchronous fetching of the user to ensure to avoid a promise (which needs waiting) by using observable
      map(user => {
        if (user) {
          return true;
        }
        this.router.navigate(['/signin']);
        return false;
      })
    );
  }    
}

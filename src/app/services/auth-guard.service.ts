import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : 
  boolean 
  | UrlTree 
  | Promise<boolean | UrlTree> 
  | Observable<boolean | UrlTree>  {
   
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    );

  }
}

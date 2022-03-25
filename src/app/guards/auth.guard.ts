import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CrudsService } from 'src/app/servicios/crud.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: CrudsService, private router:Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //debugger;
    if(this.authSvc.isLoggedIn(state.url)){
      return true; 
    }else{
      this.router.navigate(["/login"]);    
      return false; 
    }
  }
  
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);  
  const isLoggedIn = tokenService.isLoggedIn();  
  if (!isLoggedIn) { 
    const router = inject(Router);
    if(tokenService.isJobSeeker()){
      router.navigate(['auth/login/job-seeker']);
    }else {
      router.navigate(['auth/login/company'])
    }
  }
  return isLoggedIn;  
};

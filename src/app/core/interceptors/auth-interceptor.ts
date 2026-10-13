import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuth = inject(SessionService).isAuthenticated;
  const token = "IAa3AzLflO4ogK4WAevhXHPJstf8cIkwGfpVL3c7DBROwJrPqJlqGwIEXQhc";

  if (!isAuth) {
    return next(req);
  }

  const newRequest = req.clone({
    headers: req.headers
    .set('Authorization', `Bearer ${token}`)
    .append("Cache-Control", "no-cache")
    .append("Pragma", "no-cache")
    .append("Content-type", "application/json")
    .append("Accept", "application/json")
  });
  return next(newRequest);
};
//content-type application/json



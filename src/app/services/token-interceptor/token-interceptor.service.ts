import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private refreshing_in_progress: boolean;
  private _accessToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );

  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    return this.auth.token.pipe(
      take(1),
      switchMap((token) => {
        console.log('token: ', token);
        return next.handle(this.addAuthHeader(req, token)).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              // get refresh token value
              return this.auth.refreshToken.pipe(
                take(1),
                switchMap((refreshToken) => {
                  console.log('refreshToken: ', refreshToken);
                  // If there are tokens then send refresh token request
                  if (refreshToken && token) {
                    // Call refresh_token api using auth service
                    return this.callRefreshTokenApi(req, next);
                  } else {
                    // logout
                    return this.logout(err);
                  }
                })
              );
            }

            // In case of 403 http error (refresh token failed)
            if (err instanceof HttpErrorResponse && err.status === 403) {
              // logout
              return this.logout(err);
            }

            // if error has status neither 401 nor 403 then just return this error
            // return throwError(err);
            return throwError(() => err);
          })
        );
      })
    );
  }

  addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const isApiUrl = req.url.startsWith(environment.serverBaseUrl);
    if (token && isApiUrl) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return req;
  }

  callRefreshTokenApi(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshing_in_progress) {
      this.refreshing_in_progress = true;
      this._accessToken$.next(null);

      return this.auth.getNewTokens().pipe(
        switchMap((response: any) => {
          this.refreshing_in_progress = false;
          this._accessToken$.next(response.accessToken);
          // repeat failed request with new token
          return next.handle(this.addAuthHeader(req, response.accessToken));
        })
      );
    } else {
      // Wait while we get new token
      return this._accessToken$.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          // repeat failed request with new token
          return next.handle(this.addAuthHeader(req, token));
        })
      );
    }
  }
  logout(error): Observable<HttpEvent<any>> {
    this.auth.logout();
    // return throwError(error);
    return throwError(() => error);
  }
}

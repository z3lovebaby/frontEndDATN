import { Strings } from './../../enum/strings';
import { GlobalService } from './../../services/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(
    private router: Router,
    private auth: AuthService,
    private global: GlobalService
  ) {}

  async canMatch(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const existingRole = route.data?.['role'];
    console.log('Required Role:', existingRole);

    const user = await this.auth.getUser();
    console.log('Authenticated User:', user);

    if (user) {
      // Check if the user's account is active
      if (user?.status !== 'active') {
        this.auth.logout();
        this.navigate(Strings.LOGIN);
        return false;
      }

      // Check if user role matches the route requirement
      if (user?.type === existingRole) return true;

      // If role doesn't match, redirect to appropriate page
      this.redirect(user?.type);
      return false;
    } else if (user === false) {
      // Show alert if user is not logged in
      this.showAlert(existingRole);
      return false;
    } else {
      // Navigate to login if user is undefined
      this.navigate(Strings.LOGIN);
      return false;
    }
  }

  private navigate(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  private showAlert(role: string): void {
    this.global.showAlert(
      'Please check your Internet Connectivity and try again',
      'Retry',
      [
        {
          text: 'Logout',
          handler: () => {
            this.auth.logout();
            this.navigate(Strings.LOGIN);
          },
        },
        {
          text: 'Retry',
          handler: () => {
            this.redirect(role);
          },
        },
      ]
    );
  }

  private redirect(role: string): void {
    let url: string = Strings.TABS;
    if (role === Strings.ADMIN_TYPE) url = Strings.ADMIN;
    this.navigate(url);
  }
}

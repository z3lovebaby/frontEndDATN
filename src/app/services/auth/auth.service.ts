import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, from, Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { ProfileService } from '../profile/profile.service';
import { Strings } from 'src/app/enum/strings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = new BehaviorSubject<string>(null);
  private _refreshToken = new BehaviorSubject<string>(null);

  get token() {
    return this._token.asObservable();
  }
  get refreshToken() {
    return this._refreshToken.asObservable();
  }
  n;

  constructor(
    private router: Router,
    private storage: StorageService,
    private api: ApiService,
    private profile: ProfileService,
    private injector: Injector
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const data = {
        email,
        password,
      };
      const response = await this.api.get('user/login', data);
      console.log(response);
      this.setUserData(response?.token, response?.refreshToken);
      this.updateProfileData(response?.user);
      return response;
    } catch (e) {
      throw e;
    }
    //return await this.storage.setStorage('uid', 'ABSGAHSJKAJSKAJSKA');
  }

  async getToken() {
    let token: string = this._token.value;
    if (!token) {
      token = (await this.storage.getStorage(Strings.TOKEN)).value;
      this.updateToken(token);
    }
    await this.getRFToken();
    return token;
    //return await this.storage.getStorage('uid');
  }
  async getRFToken() {
    let rftoken: string = this._refreshToken.value;
    if (!rftoken) {
      rftoken = (await this.storage.getStorage(Strings.REFRESH_TOKEN)).value;
      this.updateRFToken(rftoken);
    }
    return rftoken;
    //return await this.storage.getStorage('uid');
  }
  getNewTokens(): Observable<any> {
    const refreshToken = this._refreshToken.value;
    return from(this.api.post('user/refresh_token', { refreshToken })).pipe(
      tap((response) => {
        this.setUserData(response?.accessToken, response?.refreshToken);
      })
    );
  }
  async getUser() {
    const token = await this.getToken();
    console.log(token);
    try {
      if (token) {
        const user: any = await this.profile.getProfile();
        console.log(user);
        if (user) return user;
        return false;
      }
      return null;
    } catch (e) {
      if (token) return false;
      return null;
    }
  }
  isLoggedIn() {
    return this.getToken();
  }

  isTokenAvailable() {
    return from(this.getToken());
  }

  async register(formValue) {
    try {
      const data = {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        type: 'user',
        status: 'active',
        password: formValue.password,
      };

      const response = await this.api.post('user/signup', data);
      console.log(response);
      this.setUserData(response?.token, response?.refreshToken);
      this.updateProfileData(response?.user);
      return response;
    } catch (e) {
      throw e;
    }
    // return await this.storage.getStorage('uid');
  }

  async setUserData(token: string, refreshToken: string) {
    this.storage.setStorage(Strings.TOKEN, token);
    this.storage.setStorage(Strings.REFRESH_TOKEN, refreshToken);
    this.updateRFToken(refreshToken);
    this.updateToken(token);
  }
  updateToken(value) {
    this._token.next(value);
  }
  updateRFToken(value) {
    this._refreshToken.next(value);
  }

  updateProfileData(data) {
    // const profile = this.injector.get(ProfileService);
    // profile.updateProfileData(data);
    this.profile.updateProfileData(data);
  }

  async sendResetPasswordOtp(email: string) {
    try {
      const data = { email };
      const response = await this.api.get(
        'user/send/reset/password/token',
        data
      );
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async verifyResetPasswordOtp(email: string, otp: string) {
    try {
      const data = {
        email,
        reset_password_token: otp,
      };
      const response = await this.api.get(
        'user/verify/resetPasswordToken',
        data
      );
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(data) {
    try {
      const response = await this.api.patch('user/reset/password', data);
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  }

  logout() {
    this.storage.removeStorage(Strings.TOKEN);
    this.storage.removeStorage(Strings.REFRESH_TOKEN);
    this.profile.updateProfileData(null);
    this._refreshToken.next(null);
    this._token.next(null);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

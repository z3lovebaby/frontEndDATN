import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _profile = new BehaviorSubject<User>(null);

  get profile() {
    return this._profile.asObservable();
  }

  constructor(private api: ApiService, private auth: AuthService) {}

  async getProfile() {
    try {
      const profile_data = this._profile.value;
      if (!profile_data) {
        const profile = await this.api.get('user/profile');
        console.log('profile data: ', profile);
        // const data = new User(
        //   profile?.email,
        //   profile?.phone,
        //   profile?.name,
        //   profile?._id,
        //   profile?.type,
        //   profile?.status,
        //   profile?.email_verified
        // );
        this.updateProfileData(profile);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updatePhoneNumber(phone) {
    try {
      const profile = await this.api.patch('user/update/phone', { phone });
      console.log('profile data: ', profile);
      // const data = new User(
      //   profile.email,
      //   profile.phone,
      //   profile.name,
      //   profile._id,
      //   profile.type,
      //   profile.status,
      //   profile.email_verified
      // );
      this.updateProfileData(profile);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateProfile(param) {
    try {
      const profile_data = await this.api.patch('user/update/profile', {
        ...param,
      });
      const profile = profile_data?.user;
      await this.auth.setUserData(
        profile_data?.token,
        profile_data?.refreshToken
      );
      console.log('profile data: ', profile);
      this.updateProfileData(profile);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  resendOtp() {
    return this.api
      .get('user/send/verification/email')
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  async verifyEmailOtp(data) {
    try {
      const response = await this.api.patch('user/verify/emailToken', data);
      let profile_data: User = this._profile.value;
      if (profile_data) {
        profile_data = { ...profile_data, email_verified: true };
        this.updateProfileData(profile_data);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  updateProfileData(profile) {
    const data = new User(
      profile.email,
      profile.phone,
      profile.name,
      profile._id,
      profile.type,
      profile.status,
      profile.email_verified
    );
    console.log(data);
    this._profile.next(data);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileData } from 'src/app/data/profile.data';
import { Profile } from 'src/app/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly _profile = new BehaviorSubject<Profile>(ProfileData);
  profile = this._profile.asObservable();

  constructor() { }

  editData(key: string, value: string) {
    this._profile.getValue()[key] = value;
    this._profile.next(this._profile.getValue());
  }

  getMap(profile: Profile) {
    return new Map(Object.entries(profile));
  }
}

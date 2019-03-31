export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id?: string;
  birth?: Birth;
  email?: string;
  gender?: string;
  location?: Location;
  name?: Name;
  phoneNo?: string;
  profilePhoto?: ProfilePhoto;
  roles?: any;
  userName?: string;
  audit?: {}
}

export interface ProfileInfo {
  name?: any;
  id?: string;
  token?: string;
  userPhotoURL?: string;
  email?: string;
  location?: any;
  birth?: any;
  profilePhoto?: any;
  userName?: string;
}

export interface UserPasswordReset {
  userId: string;
  newPassword: string;
  code: string;
}

export interface UserProfile {
  id?: string;
  name?: Name;
  location?: Location;
  birth?: Birth;
  gender?: string;
  email?: string;
  phone?: string;
  configuration?: string;
  roles?: string;
  isEnabled?: boolean;
  isLockedOut?: boolean;
  lastActive?: string;
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  profilePhoto?: ProfilePhoto;
  audit?: Audit;
}

export interface Name {
  title?: string;
  first?: string;
  last?: string;
  fullname?: string;
}

export interface Location {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: LocationCoordinates;
  timezone?: LocationTimezone;
}

export interface LocationCoordinates {
  latitude?: string;
  longitude?: string;
}

export interface LocationTimezone {
  offset?: string;
  name?: string;
  dst?: string;
}

export interface Birth {
  date?: string;
  age?: string;
}

export interface ProfilePhoto {
  id?: string;
  large?: string;
  medium?: string;
  thumbnail?: string;
}

export interface Audit {
  registerDate?: string;
  registerAge?: string;
  lastUpdated?: string;
}

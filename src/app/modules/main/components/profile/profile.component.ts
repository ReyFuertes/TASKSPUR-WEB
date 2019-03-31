import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef  } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DropdownItems } from "../../../../models/dropdown.model";
import { MainService } from "../../main.service";
import { ImageResponse } from "../../../../models/image.model";
import { CommonService } from "../../../../services/common.service";
import { environment } from "../../../../../environments/environment";
import { MessageService } from 'primeng/api';
import { Countries } from "../../../../shared/constants/countries.contant";
import { LocalStorageService } from "../../../../services/localStorage.service";
import { scaleAnimation } from "../../../../shared/animations/scale.animation";
import { MainState } from "../../main.reducer";
import { ProfileInfoAction } from "../../main.actions";
import { Store } from "@ngrx/store";
import { UserProfile } from "../../../../models/user.model";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [scaleAnimation]
})
export class ProfileComponent implements OnInit {
  public profileInformationText = 'Profile Information';
  public animationState: string = 'small';
  public profileForm: FormGroup;
  public countries: DropdownItems[] = Countries;
  public isSubmitting: boolean = false;
  public showTermsCondition: boolean = false;
  public showPrivacyPolicy: boolean = false;
  public hasError: boolean = false;
  public errorMsg: string = '';
  public imageDisplayUrl: string;
  public userId: string;
  public blob: any;
  public profileInfo: UserProfile;

  @ViewChild('email') input: ElementRef;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: "My Profile",
      path: ''
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private commonService: CommonService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private localStorage: LocalStorageService,
    private store: Store<MainState>
  ){
    const emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    this.profileForm = this.formBuilder.group({
      id: [""],
      userName: [""],
      name: this.formBuilder.group({
        first: ["", Validators.compose([Validators.required])],
        last: ["", Validators.compose([Validators.required])]
      }),
      birth: this.formBuilder.group({
        date: [""]
      }),
      email: ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      profilePhoto: this.formBuilder.group({
        id: [""],
        url: [""]
      }),
      image:[null],
      ProfileImage:[null],
      location: this.formBuilder.group({
        street: [""],
        city: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required])],
        postalCode: [""]
      })
    });
  }

  ngOnInit(): void {
    this.mainService.getProfile().subscribe( userProfile => {
      this.store.dispatch(new ProfileInfoAction ({ profileInfo: userProfile['user'] }));
       this.profileInfo = userProfile['user'];
       if(!this.profileForm.value.userName) {
         this.profileForm.patchValue(this.profileInfo);
       }
    });
    if(this.localStorage.getProfileInfo()) {
      this.profileForm.patchValue(this.localStorage.getProfileInfo());
    } 
   
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.animationState = (this.animationState === 'small' ? 'large' : 'small');
    }, 100);
  }
  
  public onClear(): void {
    this.profileForm.controls['email'].setValue('');
    this.profileForm.get('email').markAsPristine();
  }

  public handleImageChange(event: any): void {
    this.blob = event;
  }

  public onSubmit() {
    this.isSubmitting = true;
    let formData = new FormData();

    if(this.blob) {
      formData.append("Type", "t");
      formData.append("file", this.blob, this.blob.name.split('.')[1]);
      this.uploadImage(formData, this.saveProfile);
    } else {
      this.saveProfile();
    }
  }

  private uploadImage(formData: any, callback: any) {
    this.commonService.uploadImage(formData).subscribe((response: ImageResponse) => {
      callback(response);
    })
  }

  public saveProfile = (image?: ImageResponse) => {   
    const payload = {
      id:  this.profileForm.value.id,
      userName:  this.profileForm.value.userName,
      name: {
        first: this.profileForm.value.name.first,
        last: this.profileForm.value.name.last
      },
      location:{
        street: this.profileForm.value.location.street,
        city: this.profileForm.value.location.city,
        state: this.profileForm.value.location.state,
        country: this.profileForm.value.location.country,
        postalCode: this.profileForm.value.location.postalCode,
        coordinates: {},
        timeZone:  {},
      },
      birth: {
        date: this.profileForm.value.birth.date
      },
      email: this.profileForm.value.email,
      profilePhoto: {
        id: image ? image.id : null
      },
      audit: {}
    };

    this.mainService.updateProfile(payload).subscribe(() => {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Profile updated sucessfully', life: 3000 });
      this.isSubmitting = false;
    },
    () => {
      this.messageService.add({severity:'error', summary: 'Error Message', detail: 'Failed to update profile', life: 3000 });
      this.isSubmitting = false;
    });
  }

  public displayProfileImage(imageId: string): void {
    this.mainService.getProfileImage(imageId).subscribe(response => {
      if(response)
        this.imageDisplayUrl = `${environment.baseUrl}${environment.imageUrl}${response.fileName}`;
    })
  }
}

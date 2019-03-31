import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MainService } from "../../main.service";
import { MessageService } from 'primeng/api';
import { passwordValidationRegex } from "../../../../shared/utils";
import { scaleAnimation } from '../../../../shared/animations/scale.animation';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [scaleAnimation]
})
export class SettingsComponent implements OnInit {
  public settingInformationText = 'Manage your account';
  public animationState: string = 'small';
  public settingForm: FormGroup;
  public isSubmitting: boolean = false;
  public isValidPassword: boolean = false;
  public isInvalidPassword: boolean = false;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: ' Profile',
      path: '/profile'
    },
    {
      text: 'Settings',
      path: ''
    }
  ];

  constructor(private formBuilder: FormBuilder,
    private mainService: MainService,
    private messageService: MessageService,
  ) {
    this.settingForm = this.formBuilder.group({
      currentPassword: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
      repeatPassword: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = (this.animationState === 'small' ? 'large' : 'small');
    }, 100);
  }

  public showPassword(event: any): void {
    if (event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public changePassword(): void {
    const payload = {
      userId: JSON.parse(localStorage.getItem('user'))['id'],
      currentPassword: this.settingForm.value.currentPassword,
      newPassword: this.settingForm.value.password
    };

    this.mainService.accountChangePassword(payload).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully.', life: 2000 });
      this.isSubmitting = false;

      this.settingForm.reset();
    },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Change password failed. Old password is incorrect', life: 3000 });
        this.isSubmitting = false;

        this.settingForm.reset();
      });

  }

}

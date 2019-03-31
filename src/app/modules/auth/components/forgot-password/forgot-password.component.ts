import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { scaleAnimation } from '../../../../shared/animations/scale.animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [scaleAnimation]
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public isSubmitting: boolean = false;
  public emailSendSuccess: boolean = false;
  public email: string = '';
  public hasExceed: boolean = false;
  public animationState: string = 'small';

  constructor(private messageService: MessageService, private renderer: Renderer, private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private store: Store<AppState>) {
    const emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = (this.animationState === 'small' ? 'large' : 'small');
    }, 100);
  }

  public onSubmit(): void {
    const email = this.forgotPasswordForm.value.email

    this.isSubmitting = true;

    this.auth.forgotPassword(email).subscribe(response => {
      if (response) {
        this.emailSendSuccess = true;
        this.isSubmitting = false;

        this.messageService.add({ severity: 'success', summary: 'Succesfully Sent', detail: 'A link has been sent to the supplied email address.', life: 3000 });
      }
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'It looks like you have entered an invalid email or that the email server is down. Please re-enter your email and try again.', life: 10000 });

      this.forgotPasswordForm.controls['email'].setErrors({ 'incorrect': true });
      this.isSubmitting = false;
    })
  }

  @ViewChild('input') input: ElementRef;
  public onClear(): void {
    this.forgotPasswordForm.controls['email'].setValue('');
    this.forgotPasswordForm.get('email').markAsPristine();
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }

  public validateEmailLength(event: any) {
    this.email = this.forgotPasswordForm.get('email').value;
    if ((this.email.length > 64 && this.email.indexOf('@') < 0) || this.email.length > 320) {
      this.hasExceed = true;
      if (event.key != 'Backspace') {
        event.preventDefault();
      }
    } else {
      this.hasExceed = false;
    }
  }
}

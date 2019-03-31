import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserPasswordReset } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';
import { passwordValidationRegex } from "../../../../shared/utils";
import { passwordError, emailError, emailKey, passwordKey, rePasswordKey, rePasswordError } from "../../../../shared/constants/shared.constant";
import { ErrorService } from '../../../../services/error.service';
import { Error } from '../../../../models/error.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class ForgotPasswordResetComponent implements OnInit {
  public passwordResetForm: FormGroup;
  public isSubmitting: boolean = false;
  public passwordResetSuccess: boolean = false;
  public isInvalidPassword: boolean = false;

  constructor(private router: Router, 
              private messageService: MessageService, 
              private authService: AuthService, 
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private errorService: ErrorService
  ) {
    this.passwordResetForm = this.formBuilder.group({
      password: ["",
        [Validators.required, Validators.pattern(passwordValidationRegex)]
      ],
      repeatPassword: ["", [Validators.required, Validators.pattern(passwordValidationRegex)]],
    });

    this.errorService.errorsEmitter.subscribe((errors: Error[]) => {
      let _errors: any[] = [];
      errors.forEach(error => {
        _errors.push({ severity: 'error', summary: error.msg })
      });
      this.messageService.clear();
      this.messageService.addAll(_errors);
    })
  }

  ngOnInit(): void {}

  public showPassword(event: any): void {
    if(event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public validatePassword(): void {
    this.errorService.validatePassword(this.passwordResetForm, passwordKey, passwordError);
  }

  public validateRePassword(): void {
    this.errorService.validatePassword(this.passwordResetForm, rePasswordKey, rePasswordError);
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    const payload: UserPasswordReset = {
      newPassword: this.passwordResetForm.value.password,
      userId: this.route.snapshot.queryParamMap.get('userId'),
      code: this.route.snapshot.queryParamMap.get('code')
    }

    if(payload.newPassword && payload.userId && payload.code) {
      this.authService.forgotPasswordReset(payload).subscribe(response => {
        if(response.success) {
          this.passwordResetSuccess = true;
          this.isSubmitting = false;

          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Password Reset Successful', life: 3000 });
          setTimeout(() => {
            this.router.navigateByUrl('login');
          }, 5000);
        }
      },
      () => {
        this.messageService.add({severity:'error', summary: 'Password Reset Failed.', detail: 'You can only use reset password token once.'});
        this.isSubmitting = false;
        setTimeout(() => {
          this.passwordResetForm.reset();
        }, 1000);

        setTimeout(() => {
          this.messageService.clear();
        }, 6000);

      })
    }
  }
}

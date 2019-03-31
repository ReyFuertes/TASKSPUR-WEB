import { Component, OnInit, ViewChild, ElementRef, Renderer, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { Store } from "@ngrx/store";
import { AuthState } from "../../auth.reducer";
import { tap } from "rxjs/operators";
import { Register } from "../../auth.actions";
import { DropdownItems } from "../../../../models/dropdown.model";
import { MessageService } from "primeng/api";
import { emailValidationRegex, passwordValidationRegex } from "../../../../shared/utils";
import { ErrorService } from "../../../../services/error.service";
import { passwordError, emailError, emailKey, passwordKey, rePasswordKey, rePasswordError } from "../../../../shared/constants/shared.constant";
import { Error } from "../../../../models/error.model";
import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs'; 

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public countries: DropdownItems[] = [];
  public isSubmitting: boolean = false;
  public showTermsCondition: boolean = false;
  public showPrivacyPolicy: boolean = false;
  public hasError: boolean = false;
  public isEmailTaken: boolean = false;
  public errors: string[] = [];
  public isEmailValid: boolean = false;
  public errTimer: any;
  public errorTimerSec: number;
  private errorHintType: string = '';

  @Output()
  public errorEmitter = new EventEmitter<string[]>();


  constructor(
    private messageService: MessageService,
    private renderer: Renderer,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<AuthState>,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    //remove error hint in 2500ms 
    this.errTimer = Observable.interval(500).subscribe((val) => { 
      this.errorTimerSec++;
      if(this.errorHintType == 'email' && this.errorTimerSec == 5) {
        this.errorService.removeError(emailKey); 
      } else if(this.errorHintType == 'password' && this.errorTimerSec == 8) {
        this.errorService.removeError(passwordKey); 
      } else if(this.errorHintType == 'repassword' && this.errorTimerSec == 5) {
        this.errorService.removeError(rePasswordKey); 
      } else if(this.errorHintType == 'success' && this.errorTimerSec == 12) {
        this.messageService.clear();
      } 
    });
    //,this.validateEmailNotTaken.bind(this)
    this.registerForm = this.formBuilder.group({
      email: ["",
        [Validators.required, Validators.pattern(emailValidationRegex)]
      ],
      password: ["",
        [Validators.required, Validators.pattern(passwordValidationRegex)]
      ],
      repeatPassword: ["", [Validators.required, Validators.pattern(passwordValidationRegex)]],
      termsPolicy: [null, Validators.compose([Validators.required])]
    });

  }

  public showPassword(event: any): void {
    if (event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public onAgreeToTermsPolicy(): void {
    const val = this.registerForm.get('termsPolicy').value;
    this.registerForm.get('termsPolicy').setValue(val ? val : null);
  }

  public register(): void {
    const payload = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      birthDate: this.registerForm.value.birthDate,
      timeZone: this.registerForm.value.timeZone,
    };
    this.isSubmitting = true;

    this.auth.register(payload)
      .pipe(tap(() => {
        this.isSubmitting = false;
        this.hasError = false;
        
        this.errorTimerSec = 0;
        this.errorHintType = 'success';
        this.messageService.add({ severity: 'success', detail: 'Sign up Successfully. A verification link has been sent to your email account.'});
        this.registerForm.reset();

        //this.store.dispatch(new Register({ isRegistered: true }));
        //this.router.navigateByUrl("/login");
      })
      )
      .subscribe(() => { },
        () => {
          this.isSubmitting = false;
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Failed to register', life: 1000 });
        });
  }

  @ViewChild('email') input: ElementRef;
  public onClear(): void {
    this.isEmailTaken = false;
    this.registerForm.controls['email'].setValue('');
    this.registerForm.get('email').markAsPristine();
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    this.errorService.removeError(emailKey);
  }

  public validatePassword(): void {    
    this.errorService.validatePassword(this.registerForm, passwordKey, passwordError);
    this.errorTimerSec = 0;
    this.errorHintType = 'password';
  }

  public validateRePassword(): void {
    this.errorService.validatePassword(this.registerForm, rePasswordKey, rePasswordError);
    this.errorTimerSec = 0;
    this.errorHintType = 'repassword';
  }

}

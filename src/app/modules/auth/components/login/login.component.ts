import { Component, OnInit, ElementRef, ViewChild, Renderer, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Login } from '../../auth.actions';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../../../services/error.service';
import { Error } from '../../../../models/error.model';
import { emailRegex } from '../../../../shared/utils';
import { AuthGenericPageComponent } from '../generic-page/generic-page.component';
import { AuthState } from '../../auth.reducer';
import { scaleAnimation } from '../../../../shared/animations/scale.animation';
import { swapAnimation } from '../../../../shared/animations/swap.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [scaleAnimation, swapAnimation]
})
export class LoginComponent extends AuthGenericPageComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitting: boolean = false;
  public hasError: boolean = false;
  public errorMsg: string = '';
  public showLogin: boolean = true;
  public animationState: string = 'small';
  public swap: boolean;
  public showLoader: boolean = false;

  public state: string = 'init';
  public rightBox: string = 'init';
  public leftBox: string = 'init';

  @ViewChild('username') input: ElementRef;

  constructor(
    _store: Store<AuthState>,
    _router: Router,
    private messageService: MessageService,
    private renderer: Renderer,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>,
    private errorService: ErrorService) {
    super(_store, _router);

    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ["", Validators.compose([Validators.required])]
    });

    this.errorService.errorsEmitter.subscribe((errors: Error[]) => {
      let _errors: any[] = [];
      errors.forEach(error => {
        _errors.push({ severity: 'error', summary: error.msg })
      });
      this.messageService.clear();
      this.messageService.addAll(_errors);
    })

    setTimeout(() => {
      this.animationState = (this.animationState === 'small' ? 'large' : 'small');
    }, 100);
  }

  ngOnInit(): void {

  }

  public onToggle(): void {
    this.swap = !this.swap;
    if (this.swap) {
      this.leftBox = 'slideRight';
      this.rightBox = 'slideLeft';
    } else {
      this.leftBox = 'init';
      this.rightBox = 'init';
    }
  }

  public login(): void {
    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.isSubmitting = true;

    this.auth.login(credentials).pipe(
      tap(user => {
        this.isSubmitting = false;
        this.store.dispatch(new Login({ user }));

        this.router.navigateByUrl('/dashboard');
      })
    ).subscribe(() => { },
      () => {
        this.isSubmitting = false;
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Failed to login', life: 1500 });
      });
  }

  public showPassword(event: any): void {
    if (event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public onClear(ctrl?: any): void {
    this.loginForm.controls['username'].setValue('');
    this.loginForm.get('username').markAsPristine();
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }
}

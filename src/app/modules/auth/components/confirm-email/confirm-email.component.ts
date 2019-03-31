import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../auth.service';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  userId: string;
  code: string;
  public message: string;
  public isConfirm: boolean;

  constructor(private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
  
    this.route.queryParamMap.subscribe(queryParams => {
      this.userId = queryParams.get("UserId");
      this.code = queryParams.get("code")
    })

    this.auth.confirmEmail(this.userId, this.code).subscribe(response => {
      this.isConfirm = true;
      if (response) {
        this.message = 'Thank you for confirming your email.';
      }
    }, (err) => {
      this.message = 'Your account has been already confirmed.';
      this.isConfirm = true;
    })

  }

}

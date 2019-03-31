import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: any[] = [];
  public sub: any;
  public currDateTime: string = moment().format('dddd MMMM DD YYYY, h:mm:ss a');
  constructor(private router: Router) { }

  ngOnInit(): void {
    moment.locale();
    this.sub = Observable.interval(1000)
      .subscribe((val) => { this.currDateTime = moment().format('dddd MMMM DD YYYY, h:mm:ss a') });
  }

  goToBreadcrumb(path: string) {
    this.router.navigate([path]);
  }
}

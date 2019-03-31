import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainService } from "../../main.service";
import { Store } from "@ngrx/store";
import { MainState } from "../../main.reducer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public profileForm: FormGroup;
  public imageDisplayUrl: string = 'assets/images/pp-sample.png'; //set default image
  public cardToPlayCount: number = 0;
  public tempCardsToday: any[] = [
    {
      id: 1,
      name: 'Card 1',
      details: 'Some Card 1 Details'
    },
    {
      id: 2,
      name: 'Card 2',
      details: 'Some Card 2 Details'
    },
    {
      id: 3,
      name: 'Card 3',
      details: 'Some Card 3 Details'
    }
  ];

  public breadcrumbs = [
    {
      text: 'Dashboard Overview',
      path: ''
    }
  ];



  constructor(private fb: FormBuilder,
    private mainService: MainService,
    private store: Store<MainState>) {
    this.profileForm = this.fb.group({ "image-upload": [null, Validators.compose([Validators.required])] });
  }

  ngOnInit() {
    this.checkCardToPlay();
  }

  public checkCardToPlay(): void {
  }
}

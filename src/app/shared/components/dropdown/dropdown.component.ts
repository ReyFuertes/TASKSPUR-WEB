import { Component, OnInit, Input, AfterViewInit, ViewChild } from "@angular/core";
import { DropdownItems } from "../../../models/dropdown.model";
import { FormGroup } from "@angular/forms";
import * as $ from 'jquery';
import { ModalService } from "../../../services/modal.service";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @Input()
  public groupName: any;
  @Input()
  public tabIndex: number;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: any;
  @Input()
  public label: string = "Your Label Here";
  @Input()
  public placeholder: string = "Your Placeholder Here";
  @Input()
  public items: DropdownItems;
  @Input()
  public filter: boolean = false;
  @Input()
  public isRequired: boolean = false;
  @Input()
  public autoDisplayFirst: boolean = false;

  @ViewChild('dropdown') public dropdown: any;

  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  private async patchValue(value?: string) {
    // const newValue = value ? value : this.parentForm.get(this.controlName).value
    // if (newValue) {
    //   this.parentForm.get(this.controlName).patchValue(value);
    // }
 
    // if (!this.groupName) {
    //   const newValue = value ? value : this.parentForm.get(this.controlName).value
    //   if (newValue) {
    //     this.parentForm.get(this.controlName).patchValue(value);
    //   }
    // } else {
    //   const newValue = value ? value : this.parentForm.get(this.groupName).get(this.controlName).value;
    //   if (newValue)
    //     this.parentForm.get(this.groupName).get(this.controlName).patchValue(value);
    // }
  }

  public onChange(event: any): void {
    if (!this.groupName) {
      this.parentForm.get(this.controlName).patchValue(event.value);
    } else {
      this.parentForm.get(this.groupName).get(this.controlName).patchValue(event.value);
    }
  }
}

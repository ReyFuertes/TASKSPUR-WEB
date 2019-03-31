import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ModalService } from "../../../services/modal.service";

@Component({
  selector: "app-base-modal",
  templateUrl: "./base-modal.component.html",
  styleUrls: ["./base-modal.component.scss"]
})
export class BaseModalComponent implements OnInit {
  @Input()
  public formParent: FormGroup;
  @Input()
  public showModal: boolean = false;
  @Input()
  public headerText: string = "Header Text Here";
  @Input()
  public width: string = "100%";
  @Input()
  public height: string = "100%";
  @Input()
  public positionTop: number = 20;
  @Input()
  public contentStyle: any = { padding: '0', height: '100%', 'max-width': '800px' };
  @Input()
  public btnNewText: string = 'Create';
  @Input()
  public btnCloseText: string = 'Close';
  @Input()
  public styleClass: string;

  @ViewChild('dialog') dialog: any;

  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {
   }

  @HostListener('document:click', ['$event'])
  public onClick(event: any) {
    if(event.target.classList.contains('pi-times')) {
      if (this.dialog) {
        this.modalService.propagate();
      }
    }
  }

  @HostListener("document:keydown.escape", ["$event"])
  public onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    if (this.dialog) {
      this.modalService.propagate();
    }
  }
}

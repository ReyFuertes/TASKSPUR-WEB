import { Component, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-radio-of-difficulty',
  templateUrl: './radio-of-difficulty.component.html',
  styleUrls: ['./radio-of-difficulty.component.scss']
})
export class RadioOfDifficultyComponent implements OnInit, AfterViewInit {
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: any;

  @Output()
  public pointValueEmitter = new EventEmitter<number>();

  public radios: any[] = [
    { label: 'Easy', value: 1, class: 'radio-info' },
    { label: 'Normal', value: 2, class: 'radio-primary' },
    { label: 'Complex', value: 3, class: 'radio-warning' },
    { label: 'Tricky', value: 4, class: 'radio-secondary' },
    { label: 'Challenging', value: 5, class: 'radio-danger' }
  ]

  constructor(private modalService: ModalService, private cdRef: ChangeDetectorRef, private elem: ElementRef) {
    this.modalService.subscribe(this, this.onClose);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onSelectRadio(event: any): void {
    const uiRadio = Array.from(document.querySelectorAll('.ui-radiobutton'));
    uiRadio.forEach(element => {
      element.classList.remove('radio-border');
      element.children[1].classList.remove('ui-state-active');
    });

    //when clicking the label
    if (event.target.classList.contains('ui-radiobutton-label')) {
      event.target.parentElement.children[0].classList.add('radio-border');
      event.target.parentElement.children[0].children[1].classList.add('ui-state-active');
    }

    //when clicking the circle radio
    if (event.target.classList.contains('ui-radiobutton-box')) {
      console.log(event.target.parentElement);
      event.target.parentElement.classList.add('radio-border');
      event.target.parentElement.children[1].classList.add('ui-state-active');
    }
  }

  public onClose(): void {
    this.parentForm.get(this.controlName).patchValue(2);
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-bs-modal',
  templateUrl: './bs-modal.component.html',
  styleUrls: ['./bs-modal.component.scss']
})
export class BsModalComponent implements OnInit {
  @ViewChild('modal') modal: any;

  @Input()
  public modalId: string;

  @Input()
  public modalTitle: string = 'Add title here';

  @Input()
  public maxWidth: string = '850px';

  constructor(public modalService: ModalService) { 
    this.modalService.subscribe(this, this.close);
  }

  public close(): void {
    const c = this.modal.nativeElement.classList;
    if(c.contains('show')) {
      c.remove('show');
      document.querySelector('.modal-backdrop').remove()
    }
  }

  ngOnInit(): void { }
}

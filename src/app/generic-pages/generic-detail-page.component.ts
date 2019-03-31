import { EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../services/modal.service';

export abstract class GenericDetailPage {
  public form: FormGroup;

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  constructor(public modalService: ModalService, private messageService: MessageService) {

   }

  public handleError(name: string, text: string): void {
    this.messageService.add({ key: 't', severity: 'error', detail: `Failed to ${text} ${name}.` });
    this.modalService.propagate();
  }

  public onClose(): void {
    this.modalService.propagate();
  }

  public refreshReload(name: string, text: string): void {
    this.messageService.add({ key: 't', severity: 'success', detail: `${name} is successfully ${text}` });

    this.form.reset();
    this.reloadEmitter.emit(true);
    this.modalService.propagate();
  }
}

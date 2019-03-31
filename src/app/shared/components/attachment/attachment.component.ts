import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit, OnDestroy {
  @Input()
  public Files: File[] = [];

  @Output()
  public attachmentsEmitter = new EventEmitter<File[]>();

  public files: File[] = [];
  public fileExt: string;
  public defaultBgUrl: string = 'https://via.placeholder.com/150';

  constructor(public modalService: ModalService) { 
    this.modalService.subscribe(this, this.resetAttachments);
  }

  public onRemove(file: File): void {
    _.remove(this.files, (item) => { return item === file });
  }

  private resetAttachments(): void {
    this.files = [];
  }

  public browseAttachment(e: any): void {
    let attachment = e.target.files[0];

    attachment['ext'] = `.${attachment.type.split("/")[1]}`;

    const isImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (isImageTypes.includes(attachment.type)) {
      const reader: FileReader = new FileReader();
      reader.onloadend = (e: any) => {
        attachment['preview'] = e.target.result;
      };
      reader.readAsDataURL(attachment);
    }

    this.files.push(attachment);
    if (this.files.length > 0) {
      this.attachmentsEmitter.emit(this.files);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

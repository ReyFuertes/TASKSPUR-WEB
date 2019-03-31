import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss']
})
export class CardNewComponent implements OnInit {
  public aeMode = AEMode.Add;

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onReload(event: boolean): void {
    this.reloadEmitter.emit(event);
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';

@Component({
  selector: 'app-board-new',
  templateUrl: './board-new.component.html',
  styleUrls: ['./board-new.component.scss']
})
export class BoardNewComponent implements OnInit {
  public aeMode = AEMode.Add;

  @Input()
  public fromCard: boolean = false;

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onReload(event: boolean): void {
    this.reloadEmitter.emit(event);
  }

}

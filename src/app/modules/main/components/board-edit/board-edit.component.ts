import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';
import { Board } from '../../../../models/board.model';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent implements OnInit {
  public aeMode = AEMode.Edit;

  @Input()
  public board: Board;

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onReload(event: boolean): void {
    this.reloadEmitter.emit(event);
  }
}

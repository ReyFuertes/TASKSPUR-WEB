import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { AEMode } from '../../../../models/generic.model';

@Component({
  selector: 'app-card-clone',
  templateUrl: './card-clone.component.html',
  styleUrls: ['./card-clone.component.scss']
})
export class CardCloneComponent implements OnInit {
  public aeMode = AEMode.Clone;

  private _card: Card;
  get card() {
    return this._card;
  }
  @Input()
  set card(card: Card) {
    this._card = card;
  }

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onReload(event: boolean): void {
    this.reloadEmitter.emit(event);
  }
}

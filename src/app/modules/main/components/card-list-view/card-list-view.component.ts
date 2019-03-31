import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Card, CardPoint, CardStatus } from '../../../../models/card.model';
import { OverlayPanel, MessageService, ConfirmationService } from 'primeng/primeng';
import { MainService } from '../../main.service';
import { ModalService } from '../../../../services/modal.service';

//TODO: refactor to use different html file but the same ts file
@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss']
})
export class CardListViewComponent implements OnInit {
  @Input()
  public cards: Card[];

  public cardPoints: any[] = [];
  public selectedCard: any;
  public showCloneCardDialog: boolean = false;
  public cardStatus = CardStatus;

  @Output()
  public cardIdEmitter = new EventEmitter<number>();

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  @ViewChild('op') op: OverlayPanel;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, public modalService: ModalService, private mainService: MainService) { }

  ngOnInit(): void {
    this.getCardPoints().map(el => this.cardPoints.push({ id: CardPoint[el], value: el }));
  }

  public selectCardOption(event, card: any) {
    this.selectedCard = card;
    this.op.toggle(event);
  }

  public isActiveStatus(currStatus: number, cardStatus: number, ): boolean {
    return currStatus === cardStatus;
  }

  public onUpdateStatus(id: number, status: number): void {
    this.mainService.updateCardStatus(id, status).subscribe(() => {
      this.op.hide();
      this.reloadEmitter.emit(true);
      this.modalService.propagate();
    })
  }

  public onEdit(event: any) {
    this.cardIdEmitter.emit(event);
  }

  public onClone(): void {
    this.showCloneCardDialog = !this.showCloneCardDialog;
  }

  public onDelete(card: Card, op: OverlayPanel): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure that you want to delete this card?',
      header: 'Confirmation',
      accept: () => {
        this.mainService.deleteCard(card.id).subscribe(res => {
          op.hide();
          this.modalService.propagate();
          this.messageService.add({ key: 't', severity: 'success', detail: `${card.name} is successfully deleted.` });
        })
      },
      reject: () => {
        return false;
      }
    });
  }

  public onArchive(card: Card): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure that you want to Archive this card?',
      header: 'Confirmation',
      accept: () => {
        this.mainService.archiveCard(card.id).subscribe(() => {
          this.op.hide();
          this.reloadEmitter.emit(true);
          this.modalService.propagate();
          this.messageService.add({ key: 't', severity: 'info', detail: `${card.name} is successfully archived.` });
        })
      },
      reject: () => {
        return false;
      }
    });
  }

  public getCardPoint(point: number): string {
    const cardPoint = (point === 0 ? 1 : point);

    return this.cardPoints.filter(point => point.id === cardPoint)[0].value;
  }

  public getCardPoints(): Array<string> {
    const keys = Object.keys(CardPoint);
    return keys.slice(keys.length / 2);
  }
}

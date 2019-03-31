import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Card, CardPoint, CardStatus } from '../../../../models/card.model';
import { OverlayPanel, MessageService, ConfirmationService } from 'primeng/primeng';
import { MainService } from '../../main.service';
import { ModalService } from '../../../../services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public cards: Card[];

  public form: FormGroup;
  public cardPoints: any[] = [];
  public selectedCard: Card;
  public showCloneCardDialog: boolean = false;
  public showRescheduleDialog: boolean = false;
  public cardStatus = CardStatus;
  public rescheduleContentStyle: any = { 'width': '400px', 'max-height': '250px' };

  @Output()
  public cardIdEmitter = new EventEmitter<number>();

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  @ViewChild('op') op: OverlayPanel;

  constructor(private formBuilder: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, public modalService: ModalService, private mainService: MainService) {
    this.form = this.formBuilder.group({
      reschedule: [null, Validators.compose([Validators.required])]
    });

    this.modalService.subscribe(this, this.onCloseDialog);
  }

  ngOnInit(): void {
    this.getCardPoints().map(el => this.cardPoints.push({ id: CardPoint[el], value: el }));
  }

  public selectCardOption(event, card: any) {
    this.selectedCard = card;
    this.op.toggle(event);
  }

  public onCloseDialog(): void {
    this.showCloneCardDialog = false;
  }

  public onReload(event: any): void {
    this.reloadEmitter.emit(event);
  }

  public onDelete(card: Card): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure that you want to delete this card?',
      header: 'Confirmation',
      accept: () => {
        this.mainService.deleteCard(card.id).subscribe(res => {
          this.onClose();
          this.messageService.add({ key: 't', severity: 'success', detail: `${card.name} is successfully deleted.` });
        })
      },
      reject: () => {
        return false;
      }
    });
  }

  public onReschedule(): void {
    if (this.selectedCard) {
      this.form.get('reschedule').patchValue(moment(this.selectedCard.expectedCompletion).format('MM/DD/YYYY'));
      this.op.hide();
    }
  }

  public updateSchedule(): void {
    if (this.selectedCard) {
      let scheduledCard: Card = Object.assign({}, this.selectedCard);
      scheduledCard['expectedCompletion'] = this.form.get('reschedule').value;

      this.mainService.updateCardSchedule(scheduledCard).subscribe(() => this.onClose())
    }
  }

  private onClose(): void {
    this.op.hide();
    this.form.reset();
    this.reloadEmitter.emit(true);
    this.modalService.propagate();
  }

  public isActiveStatus(currStatus: number, cardStatus: number, ): boolean {
    return currStatus === cardStatus;
  }

  public onUpdateStatus(id: number, status: number): void {
    this.mainService.updateCardStatus(id, status).subscribe(() => {
      this.onClose()
    })
  }

  public onArchive(card: Card): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure that you want to Archive this card?',
      header: 'Confirmation',
      accept: () => {
        this.mainService.archiveCard(card.id).subscribe(() => {
          this.onClose();
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

  public onEdit(event: any) {
    this.cardIdEmitter.emit(event);
  }

  public getCardPoints(): Array<string> {
    const keys = Object.keys(CardPoint);
    return keys.slice(keys.length / 2);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.op) {
      this.op.hide();
    }
  }
}



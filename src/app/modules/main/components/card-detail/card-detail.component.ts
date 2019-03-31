import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../main.service';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { boardListSelector } from '../../main.selector';
import { MessageService } from 'primeng/api';
import { AEMode } from '../../../../models/generic.model';
import { Card } from '../../../../models/card.model';
import * as moment from 'moment';
import { CommonService } from '../../../../services/common.service';
import { getCardStatus } from '../../../../shared/functions/card-status.func';
import { GenericDetailPage } from '../../../../generic-pages/generic-detail-page.component';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent extends GenericDetailPage implements OnInit, AfterViewInit {
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;
  @Input()
  public boards: any[] = [];
  @Input()
  set card(card: Card) {
    this.patchCardValue(card);
  }

  @Output()
  public formEmitter = new EventEmitter<any>();

  public formComment: FormGroup;
  public attachmentForm: FormGroup;
  public btnText: string = 'Create';
  public imageDisplayUrl: string = 'assets/images/pp-sample.png'
  public formattedBoards: any[] = []; 
  public status: any[] = []
  public attachments: File[] = [];
  public cardStatus: any[] = getCardStatus();

  constructor(
    modalService: ModalService,
    messageService: MessageService,
    private commonService: CommonService,
    private store: Store<MainState>,
    private mainService: MainService,
    private formBuilder: FormBuilder) {
    super(modalService, messageService);

    this.form = this.createCardForm();

    //in progress
    this.formComment = this.formBuilder.group({ comment: [""] });

    this.form.valueChanges.subscribe(() => this.formEmitter.emit(this.form));
  }

  ngOnInit(): void {
    this.store.pipe(select(boardListSelector)).subscribe(response => {
      if (response)
        response.forEach(board => this.formattedBoards.push({ label: board.name, value: board.id }));
    })
  }

  ngAfterViewInit() { }

  public async patchCardValue(card: Card) {
    if (card) {
      this.form.get('id').patchValue(card.id);
      this.form.get('name').patchValue(card.name);
      this.form.get('details').patchValue(card.details);
      this.form.get('expectedCompletion').patchValue(moment(card.expectedCompletion).format('MM/DD/YYYY'));
      this.form.get('important').patchValue(card.important);
      this.form.get('urgent').patchValue(card.urgent);
      this.form.get('status').patchValue(card.status);
      this.form.get('boardId').patchValue(card.boardId);
      this.form.get('point').patchValue(+card.point);

      if (this.aeMode === AEMode.Edit) {
        this.btnText = 'Update';
      } else if (this.aeMode === AEMode.Clone) {
        this.btnText = 'Clone';
      }
    }
  }

  public handlePointValue(event: number): void {
    this.form.get('point').patchValue(event);
  }

  public handleAttachments(event: File[]): void {
    if (event)
      this.attachments = event;
  }

  public createCardForm(): FormGroup {
    return this.form = this.formBuilder.group({
      id: [null],
      boardId: [null, Validators.compose([Validators.required])],
      name: ["", Validators.compose([Validators.required])],
      expectedCompletion: [moment().format('MM/DD/YYYY'), Validators.compose([Validators.required])],
      details: [""],
      status: [null],
      important: [false],
      urgent: [false],
      point: [2]
    });
  }

  public onClose(): void {
    super.onClose();

    //reset form to origin state
    this.form = this.createCardForm();
  }

  public onSubmit(): void {
    const payload = this.form.value;
    if (this.aeMode === AEMode.Add || this.aeMode === AEMode.Clone) {
      //quick fix patching
      payload.id = null;
      payload.important = payload.important === null ? false : payload.important;
      payload.urgent = payload.urgent === null ? false : payload.urgent;
      payload.point = payload.point === null ? 1 : payload.point;
      payload.status = payload.status === null ? 1 : payload.status;

      //in progress upload attachments
      this.mainService.createCard(payload).subscribe((response) => {
        if (this.attachments && this.attachments.length > 0) {
          this.attachments.forEach(attachment => {
            let formData = new FormData();
            formData.append("cardId", response.id);
            formData.append("file", attachment, attachment.name);

            this.commonService.uploadCardAttachment(formData).subscribe();
          });
        }

        this.refreshReload(payload.name, this.aeMode === AEMode.Add ? 'created' : 'Cloned');
      }, () => this.handleError(payload.name, 'created'));
    } else {
      this.mainService.updateCard(payload).subscribe(() => {
        this.refreshReload(payload.name, 'updated');
      }, () => this.handleError(payload.name, 'updated'))
    }
  }
}

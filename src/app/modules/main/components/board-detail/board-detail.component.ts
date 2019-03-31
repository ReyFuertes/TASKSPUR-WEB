import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MainService } from '../../main.service';
import { AEMode } from '../../../../models/generic.model';
import { Board } from '../../../../models/board.model';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { LoadBoardsAction } from '../../main.actions';
import { GenericDetailPage } from '../../../../generic-pages/generic-detail-page.component';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent extends GenericDetailPage implements OnInit {
  @Input()
  public aeMode: AEMode;
  @Input()
  public board: Board;
  @Input()
  public fromCard: boolean;

  @Output()
  public formEmitter = new EventEmitter<any>();

  public attachmentForm: FormGroup;
  public attachments: File[] = [];

  constructor(
    modalService: ModalService,
    messageService: MessageService,
    private store: Store<MainState>,
    private mainService: MainService,
    private formBuilder: FormBuilder) {
    super(modalService, messageService);

    this.form = this.createBoardForm();

    this.attachmentForm = this.formBuilder.group({
      attachments: new FormArray([this.formBuilder.group({
        fileDoc: [null]
      })])
    });

    this.form.valueChanges.subscribe(() => this.formEmitter.emit(this.form));
  }

  ngOnInit(): void {
    if (this.aeMode === AEMode.Edit) {
      if(this.board)
        this.form.patchValue(this.board);
    }
  }

  public handleAttachments(event: File[]): void {
    if (event)
      this.attachments = event;
  }

  public createBoardForm(): FormGroup {
    return this.form = this.formBuilder.group({
      id: [""],
      name: ["", Validators.compose([Validators.required])],
      details: [""],
      important: [false],
      urgent: [false]
    });;
  }

  public onClose(): void {
    super.onClose();

    //reset form to origin state
    this.form = this.createBoardForm();
  }

  public onSubmit(): void {
    const payload = this.form.value;
    
    if (this.aeMode === AEMode.Add) {
      //quick fix patching primeng bug
      payload.id = null;
      payload.important = payload.important === null ? false : payload.important;
      payload.urgent = payload.urgent === null ? false : payload.urgent;

      this.mainService.createBoard(payload)
        .subscribe(() => {
          this.refreshReload(payload.name, 'created');

          //get new boards and load it in ngrx
          if (this.fromCard) {
            this.mainService.getBoards().subscribe(boards => this.store.dispatch(new LoadBoardsAction({ boards })));
          }

        }, () => this.handleError(payload.name, 'created'));
    } else {
      this.mainService.updateBoard(payload).subscribe(() => {
        this.refreshReload(payload.name, 'updated');
      }, () => this.handleError(payload.name, 'updated'))
    }
  }
}

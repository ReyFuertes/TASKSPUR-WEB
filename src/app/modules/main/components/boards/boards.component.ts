import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Board } from '../../../../models/board.model';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';
import { AEMode } from '../../../../models/generic.model';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { boardListSelector } from '../../main.selector';
import { MainService } from '../../main.service';
import { LoadBoardsAction, LoadCardsAction } from '../../main.actions';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalService } from '../../../../services/modal.service';
import { BoardDetailComponent } from '../board-detail/board-detail.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, AfterViewInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: 'Boards',
      path: ''
    }
  ];
  public boards: Board[];
  public filterBoards: any = [];
  public selectedItemsLabel = "{0} Boards selected";
  public filterPlaceHolder = "Search Board";
  public defaultLabel = "Select Board";
  public aeModeNew = AEMode.Add;
  public animationState: string = 'small';
  public membersDisplay: boolean = false;
  public newBoardDisplay: boolean = false;
  public deleteConfirmText: string = 'Are you sure you want to delete this board?';
  public filtered: Board[] = [];
  public showAddBoard: boolean = false;
  public baseZIndex: number = 1000;
  public positionTop: number = 20;
  public boardContentStyle: any = { 'width': '800px' };

  @ViewChild(BoardDetailComponent) boardDetailComponent: BoardDetailComponent;

  constructor(private cdRef: ChangeDetectorRef, public modalService: ModalService, private mainService: MainService, private store: Store<MainState>, private messageService: MessageService) {
    this.modalService.subscribe(this, this.onCloseDialog);
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.load();

    this.cdRef.detectChanges();
  }

  public onCloseDialog(): void {
    this.showAddBoard = false;
  }

  public load(reload: boolean = false): void {
    if (reload) {
      this.mainService.getBoards().subscribe(response => this.store.dispatch(new LoadBoardsAction({ boards: response })));

      //also refresh card
      this.mainService.getCards().subscribe(cards => this.store.dispatch(new LoadCardsAction({ cards })));
    } else {
      this.store.pipe(select(boardListSelector), distinctUntilChanged()).subscribe(response => {
        if (response) {
          this.boards = response;

          this.filterBoards = [];
          this.boards.forEach(board => {
            this.filterBoards.push({ label: board.name, value: board.name });
          });
        }
      })
    }
  }

  public onBoardSave(): void {
    this.showAddBoard = false;
    this.boardDetailComponent.onSubmit();
  }

  public onFilterByBoards(event: any): void {
    if (this.boards) {
      this.filtered = _.filter(this.boards, (v) => _.includes(event.value, v.name)); //filter boards 
    }
  }

  public onDisplayMembers(): void {
    this.membersDisplay = !this.membersDisplay;
  }

  public onDisplayNewBoard(): void {
    this.newBoardDisplay = !this.newBoardDisplay;
  }

  public onReject(): void {
    this.messageService.clear();
  }

  public onConfirm(): void {
    this.messageService.clear();
  }
}

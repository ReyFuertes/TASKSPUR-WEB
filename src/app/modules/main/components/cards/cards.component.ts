import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { MainService } from '../../main.service';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { mainSelector, cardListSelector } from '../../main.selector';
import { Board } from '../../../../models/board.model';
import * as _ from 'lodash';
import { LoadCardsAction } from '../../main.actions';
import { AEMode } from '../../../../models/generic.model';
import { getCardStatus } from '../../../../shared/functions/card-status.func';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalService } from '../../../../services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { Observable } from 'rxjs';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: 'Cards',
      path: ''
    }
  ];
  public boardFilters: any = [];
  public boards: Board[];
  public cards: Card[];
  public screenHeight: number;
  public screenWidth: number;
  public collapsed: boolean = true;
  public selectedItemsLabel = "{0} Boards selected";
  public filterPlaceHolder = "Search Board";
  public defaultLabel = "Select Board";
  public newBoardDisplay: boolean = false;
  public newCardDisplay: boolean = false;
  public initialCards: Card[] = [];
  public aeMode: AEMode;
  public showEditCardDialog: boolean = false;
  public selectedCard: Card;
  public cardStatus = getCardStatus();
  public showAddBoard: boolean = false;
  public isListView: boolean = false;
  public isMobileScreen: boolean = false;
  public showAddCardDialog: boolean = false;
  public form: FormGroup;
  public baseZIndex: number = 1000;
  public positionTop: number = 20;
  public archievedCards: Card[];

  @ViewChild(CardDetailComponent) cardDetailComponent: CardDetailComponent;
  @ViewChild(BoardDetailComponent) boardDetailComponent: BoardDetailComponent;

  constructor(private localStorageService: LocalStorageService, public modalService: ModalService, private mainService: MainService, private store: Store<MainState>) {
    this.getScreenSize();

    this.modalService.subscribe(this, this.onCloseDialog);
  }

  public getStatusByCards(cards: Card[], status: number): Card[] {
    return cards.filter(s => s.status === status);
  }

  public onSearch(searchTerm: string): void {
    this.initialCards = _.filter(this.cards, (card) => {
      return card.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  public onFilterCardByBoards(event: any): void {
    this.initialCards = _.filter(this.cards, (v) => _.includes(event.value, v.boardId));
    this.initialCards = event.value.length === 0 ? this.cards : this.initialCards;
  }

  ngOnInit(): void {
    this.load();

    this.mainService.getArchivedCards().subscribe((response: Card[]) => this.archievedCards = response);
  }

  ngAfterViewInit(): void { }

  public load(reload: boolean = false): void {
    if (reload) {
      this.mainService.getCards().subscribe(cards => {
        this.store.dispatch(new LoadCardsAction({ cards }));
      });
    } else {
      this.store.pipe(select(mainSelector), distinctUntilChanged()).subscribe(response => {
        if (response)
          if (response.cards) {
            this.cards = response.cards;
            this.initialCards = response.cards;
          }

        if (response.boards) {
          this.boards = response.boards;

          this.boardFilters = [];
          this.boards.forEach(board => {
            this.boardFilters.push({ label: board.name, value: board.id });
          });
        }
      })
    }
  }

  public getStatusCards(status: number): Card[] {
    return this.initialCards.filter(s => s.status === status && s.isArchived === false);
  }

  public getCardView(): number {
    return this.localStorageService.getCardView();
  }

  public setCardView(value: boolean): void {
    localStorage.setItem('cardView', JSON.stringify(value));
  }

  public onEdit(event: any): void {
    if (Number(event)) {
      this.selectedCard = null;
      this.selectedCard = _.filter(this.cards, item => item.id === event)[0];

      //in progress
      // this.mainService.getCardAttachments(this.selectedCard.id).subscribe(response => {
      //   console.log(response);
      // })
      this.showEditCardDialog = true;
    }
  }

  public onCardSaveUpdate(): void {
    this.showAddCardDialog = false;
    this.showEditCardDialog = false;
    this.cardDetailComponent.onSubmit();
  }

  public onBoardSave(): void {
    this.showAddBoard = false;
    this.boardDetailComponent.onSubmit();
  }

  public onCloseCardDialog(): void {
    this.showEditCardDialog = false;
    this.cardDetailComponent.onClose();
  }

  public onCloseDialog(): void {
    this.showAddCardDialog = false;
    this.showEditCardDialog = false;
    this.showAddBoard = false;
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (window.innerWidth > 768) {
      this.collapsed = true;
      this.isMobileScreen = false;
    } else {
      this.isMobileScreen = true;
      this.collapsed = false;
    }
  }
}

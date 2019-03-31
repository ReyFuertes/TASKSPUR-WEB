import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js'
import { Board } from '../../../../models/board.model';
import { AEMode } from '../../../../models/generic.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MainService } from '../../main.service';
import { Store } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { ModalService } from '../../../../services/modal.service';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input()
  public board: Board;
  @Input()
  public aeMode = AEMode.Edit;

  @Output()
  public reloadEmitter = new EventEmitter<boolean>();

  public canvas: any;
  public ctx: any;
  public showEditBoard: boolean = false;
  public myChart: any = [];
  public baseZIndex: number = 1000;
  public positionTop: number = 20;
  public boardContentStyle: any = { 'width': '100%' };
  public selectedBoard: Board;

  @ViewChild('myChart') canvasRef: ElementRef;
  @ViewChild(BoardDetailComponent) boardDetailComponent: BoardDetailComponent;

  constructor(private modalService: ModalService, private messageService: MessageService, private store: Store<MainState>, private mainService: MainService, private confirmationService: ConfirmationService, private cdRef: ChangeDetectorRef) {
    this.modalService.subscribe(this, this.onCloseDialog);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadChart();

    this.cdRef.detectChanges();
  }

  public onCloseDialog(): void {
    this.showEditBoard = false;
  }

  public onReload(event: any): void {
    this.reloadEmitter.emit(event);
  }

  public onEdit(event: any): void {
    this.showEditBoard = !this.showEditBoard;
  }

  public onDelete(board: Board): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      accept: () => {
        this.mainService.deleteBoard(board.id).subscribe(res => {
          if (res.success == true)
            this.reloadEmitter.emit(true);
          this.modalService.propagate();
          this.messageService.add({ key: 't', severity: 'success', detail: `${board.name} is successfully deleted.` });
        });
      },
      reject: () => {
        console.log('reject');
        this.modalService.propagate();
      }
    });
  }

  public onBoardUpdate(): void {
    this.showEditBoard = false;
    this.boardDetailComponent.onSubmit();
  }

  private loadChart(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    let gradients = [];
    const gradient = this.ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, '#FF6060');
    gradient.addColorStop(1, '#FFA960');
    gradients.push(gradient);

    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };

    this.myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [80, 20],
          backgroundColor: gradients,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  public truncateToEllipse(words: string, len: number): string {
    console.log(words.length);
    return words.length > len ? `${words.substring(0, len).trim()}...` : words;
  }

  public getPadding(str: string): string {
    if (!/ /.test(str) && str.length > 50) { //if the text has no space
      return 'o-n-s';
    }
    if (str.length >= 20 && str.length <= 50) {
      return'm-l-p';
    }
    if (str.length <= 20) {
      return 'o-l-p';
    }
  }
}

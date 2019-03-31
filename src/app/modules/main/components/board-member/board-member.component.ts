import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../../../models/member.model';

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.scss']
})
export class BoardMemberComponent implements OnInit {
  @Input()
  public members: Member[];

  constructor() { }

  ngOnInit(): void { }
}

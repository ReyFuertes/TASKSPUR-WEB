import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-multiselect-filter',
  templateUrl: './dropdown-select-filter.component.html',
  styleUrls: ['./dropdown-select-filter.component.scss']
})
export class DropdownSelectFilterComponent implements OnInit {
  public selectedItems: any[] = [];
  public ddPanelVisible: boolean = false;

  @Input()
  public selectedItemsLabel = "{0} Filters selected";
  @Input()
  public filterPlaceHolder = "Search Filter";
  @Input()
  public defaultLabel = "Select Filter";
  @Input()
  public items: any[];

  @Output()
  public selectedItemEmitted = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void { }

  public onShow(): void {
    this.ddPanelVisible = true;
  }

  public onHide(): void {
    this.ddPanelVisible = false;
  }

  public onSelect(event: any): void {
    this.selectedItemEmitted.emit(event);
  }
}

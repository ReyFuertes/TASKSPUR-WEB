import { Directive, EventEmitter, HostListener, Output, Renderer, ElementRef } from "@angular/core";

@Directive({
  selector: "[appDnd]",
  host: {
    '(drop)': 'onDrop($event)'
  }
})

// '(dragover)': 'onDragOver()',
// '(dragleave)': 'onDragleave()',

export class DndDirective {
  @Output() private filesChangeEmiter : EventEmitter<any> = new EventEmitter();
  @Output() public dragOver = new EventEmitter<boolean>();
  @Output() public dragleave = new EventEmitter<boolean>();

  constructor() {}

  // public onDragOver(): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.dragOver.emit(true);
  // }

  // public onDragleave(): void {
  //   this.dragleave.emit(false);
  // }

  public onDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.dragOver.emit(false);

    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.filesChangeEmiter.emit(files[0]);
    }
  }
}


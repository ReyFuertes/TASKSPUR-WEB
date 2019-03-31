import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

import Quill from 'quill'

import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillComponent implements OnInit, AfterViewInit {
  public modules = {}

  @ViewChild('editor') editor: QuillEditorComponent

  @Input()
  public parentForm: FormGroup;
  
  @Input()
  public controlName: any;

  constructor() {
    this.modules = {
      syntax: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ]
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  addBindingCreated(quill) {
    // quill.keyboard.addBinding({
    //   key: 'b'
    // }, (range, context) => {
    //   // console.log('KEYBINDING B', range, context)
    // })

    // quill.keyboard.addBinding({
    //   key: 'B',
    //   shiftKey: true
    // }, (range, context) => {
    //   // console.log('KEYBINDING SHIFT + B', range, context)
    // })
  }
}

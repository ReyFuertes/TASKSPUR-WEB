import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { DialogModule } from "primeng/dialog";
import { BaseModalComponent } from "./components/modal/base-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopnavComponent } from "./components/topnav/topnav.component";
import { UnderconstructionComponent } from "./components/underconstruction/underconstruction.component";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { FileValueAccessor } from "./directives/file.directive";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DndDirective } from "./components/directive/drop-file.directive";
import { DragDropModule } from 'primeng/dragdrop';
import { ImageCropperModule } from "ng2-img-cropper";
import { FacebookSVGComponent } from "./svg/facebook/facebook.component";
import { GoogleSVGComponent } from "./svg/google/google.component";
import { DropdownNotificationComponent } from './components/dropdown-notification/dropdown-notification.component';
import { SvgIconComponent } from "./svg/svg-icon/svg-icon.component";
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from "./components/search/search.component";
import { DropdownSelectFilterComponent } from "./components/dropdown-select-filter/dropdown-select-filter.component";
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioOfDifficultyComponent } from "./components/radio-of-difficulty/radio-of-difficulty.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { QuillModule } from 'ngx-quill'
import { QuillComponent } from "./components/quill-editor/quill-editor.component";
import { InputFocusDirective } from "./directives/input-focus.directive";
import { BsModalComponent } from "./components/bs-modal/bs-modal.component";
import { AttachmentComponent } from "./components/attachment/attachment.component";
import {TooltipModule} from 'primeng/tooltip';
import { RouterModule } from "@angular/router";
import { TsCharRangeDirective } from "./directives/ts-input-char-range.directive";
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { LandingAnimationDirective } from "./directives/landing-animation.directive";

const primengModules = [MultiSelectModule, CalendarModule, CheckboxModule, DropdownModule, DialogModule, RadioButtonModule, TooltipModule]

@NgModule({
  declarations: [
    DatepickerComponent,
    DropdownComponent,
    BaseModalComponent,
    SidebarComponent,
    TopnavComponent,
    UnderconstructionComponent,
    ImageUploadComponent,
    FileValueAccessor,
    BreadcrumbsComponent,
    DropdownMenuComponent,
    DndDirective,
    DropdownNotificationComponent,
    FacebookSVGComponent,
    GoogleSVGComponent,
    SvgIconComponent,
    FooterComponent,
    SearchComponent,
    DropdownSelectFilterComponent,
    RadioOfDifficultyComponent,
    QuillComponent,
    BsModalComponent,
    AttachmentComponent,
    InputFocusDirective,
    TsCharRangeDirective,
    ReadMoreComponent,
    LandingAnimationDirective

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ImageCropperModule,
    ...primengModules,
    QuillModule,
    RouterModule
  ],
  exports: [
    DatepickerComponent,
    DropdownComponent,
    BaseModalComponent,
    SidebarComponent,
    TopnavComponent,
    UnderconstructionComponent,
    ImageUploadComponent,
    FileValueAccessor,
    BreadcrumbsComponent,
    DndDirective,
    FacebookSVGComponent,
    GoogleSVGComponent,
    SvgIconComponent,
    FooterComponent,
    SearchComponent,
    DropdownSelectFilterComponent,
    RadioOfDifficultyComponent,
    QuillComponent,
    BsModalComponent,
    AttachmentComponent,
    InputFocusDirective,
    TsCharRangeDirective,
    ReadMoreComponent,
    LandingAnimationDirective
  ],
  providers: []
})

export class SharedModule { }

import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ChangeDetectorRef} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImageCropperComponent, CropperSettings, Bounds} from "ng2-img-cropper";
import { trigger, style, animate, transition } from '@angular/animations';
import { fadeAnimation } from "../../animations/fadein.animation";
@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
  animations: [ fadeAnimation ],
})
export class ImageUploadComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;
  @Input()
  public imageDisplayUrl: string;

  public data: any;
  public imageFile: File;
  public showPlaceholder: boolean;
  public showCroppingDialog: boolean = false;
  public isDropping: boolean;
  public showLoadingImage: boolean = false;
  
  @ViewChild("profileImage") profileImage;
  @ViewChild("droppedImage") droppedImage;

  @Output()
  public onChange = new EventEmitter<any>();

  @ViewChild("cropper") 
  public cropper: ImageCropperComponent;

  public cropperSettings: CropperSettings;
  public croppedWidth: number;
  public croppedHeight: number;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 250;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 250;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 250;
    this.cropperSettings.canvasHeight = 200;

    this.data = {};
  }

  ngOnInit() {
    if (this.imageDisplayUrl) {
      this.showPlaceholder = false;
    }
    else 
      this.showPlaceholder = true;
  }

  public getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
 
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public onDragleave(event: boolean): void {
    this.isDropping = false;
  }

  public onDragOver(event: boolean): void {
    this.isDropping = true;
  }

  public onFilesChange(file: any) {
    this.imageFile = file;
    
    this.getBase64(file).then(data => {
      this.data.image = <string>data;

      const image: any = new Image();
      image.src = <string>data;
      this.cropper.setImage(image);
      this.isDropping = false;
      this.showCroppingDialog = true;
    });
  }

  private convertImageDatatoBlob(dataURI) {
    let byteString;
    let mimeString;
    let ia;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = encodeURI(dataURI.split(",")[1]);
    }
    mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  private convertToBlob(dataUrl: any): void {
    let blob = this.convertImageDatatoBlob(dataUrl);
    blob['name'] = this.imageFile.name;
  
    this.onChange.emit(blob);
  }

  //cropped the image and convert to blob for uploading
  public cropped(bounds: Bounds): void {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
    const croppedImage = this.cropper.image;
    
    this.convertToBlob(croppedImage.image);
  }

  //loads image to cropper
  public fileChangeListener(e: any): void  {
    this.imageFile = e.target.files[0];

    const image: any = new Image();
    const reader: FileReader = new FileReader();
    const that = this;
    reader.onloadend = function(e: any) {
      image.src = e.target.result;
      that.cropper.setImage(image);
    };
 
    this.showCroppingDialog = true;
    reader.readAsDataURL(this.imageFile);
  }
}

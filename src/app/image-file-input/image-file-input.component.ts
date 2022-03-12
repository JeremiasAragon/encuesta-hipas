import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent, ImageTransform} from "ngx-image-cropper";

@Component({
  selector: 'app-image-file-input',
  templateUrl: './image-file-input.component.html',
  styleUrls: ['./image-file-input.component.scss']
})
export class ImageFileInputComponent implements OnInit {
  @ViewChild('content') content:TemplateRef<any> | undefined;

  @Input() aspectRatioOne:number = 4;
  @Input() aspectRatioTwo:number = 4;
  @Input() containWithinAspectRatio:boolean = false;
  @Input() scale:number = 1;
  @Input() roundCropper:boolean = true;
  @Input() resizeToWidth:number = 128;
  @Input() cropperMinWidth:number = 128;
  @Input() croppedImage: any = '';
  @Input() background: string = 'white';
  @Input() classList: string[] = ['image-input'];

  imageChangedEvent: any = '';
  imageTransform: any;
  transform: ImageTransform = {};

  @Output() imageSelected: EventEmitter<Object> = new EventEmitter;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.imageTransform = this.formBuilder.group({
      scale: [1],
    });
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if ( fileList?.length ) {
      this.imageChangedEvent = event;
      this.modalService.open(this.content, { centered: true, windowClass:"modal-back" });
    }
  }

  changeBackground(background:string){
    this.background = background;
    this.transform = { scale: this.scale+.0001, ...this.transform };
    setTimeout(() => {
      this.transform = { scale: this.scale, ...this.transform };
    }, 1);
    this.changeDetectorRef.detectChanges();
  }

  imageCropped(event: ImageCroppedEvent) {
    setTimeout(() => {
      this.croppedImage = event.base64;
      this.imageSelected.emit(this.croppedImage);
    }, 100);
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  resetImage() {
    this.scale = 1;
    this.transform = {};
  }

  onInputChange(event: any){
    this.scale = event.value;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  imageLoaded() { }

  cropperReady() { }

  loadImageFailed() { }
}

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'o-ng-cropper',
  templateUrl: './o-ng-cropper.component.html',
  styleUrls: ['./o-ng-cropper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ONgCropperComponent implements OnInit {
  // Inputs
  @Input("image")
  public imageFile: any;
  @Input()
  public cropperWidth: number = 0;
  @Input()
  public cropperHeight: number = 0;
  @Input()
  public aspectRatio = 1 / 1;
  // Outputs
  @Output("croppedImage")
  public croppedImageEvent = new EventEmitter()
  // Publics
  public croppedImage: any = '';
  public canvasRotation = 0;
  public rotation = 0;
  public scale = 1;
  public showCropper = false;
  public transform: ImageTransform = {};
  public containWithinAspectRatio = false;
  @ViewChild('modal', { static: true }) modal: ElementRef;
  constructor() { }
  ngOnInit(): void { }

  imageCropped(event: ImageCroppedEvent) {
    let blob = base64ToFile(event.base64 as string);
    this.croppedImage = new File([blob], this.imageFile.name, { type: blob.type });
  }

  save() {
    this.croppedImageEvent.emit(this.croppedImage);
    this.showCropper = false;
  }

  imageLoaded(e: any) {
    this.showCropper = true;
    $(this.modal.nativeElement)
      .modal({ backdrop: 'static', keyboard: false })
      .modal('show');
  }

  loadImageFailed() {
    console.error('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
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

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }
}

import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[cardLoader]'
})
export class CardLoaderDirective {
    private isLoading: boolean = false;
    private buttonSpinner: string = '<span class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>';
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef
    ) { }
    start() {
        this.isLoading = true;
        this.disable();
        this._renderer.addClass(this._elementRef.nativeElement, 'card-loader');
        this._renderer.addClass(this._elementRef.nativeElement, 'overlay');
        this._renderer.addClass(this._elementRef.nativeElement, 'overlay-block');
    }

    stop() {
        this.isLoading = false;
        this.active();
        this._renderer.removeClass(this._elementRef.nativeElement, 'card-loader');
        this._renderer.removeClass(this._elementRef.nativeElement, 'overlay');
        this._renderer.removeClass(this._elementRef.nativeElement, 'overlay-block');
    }

    private disable() {
        var nodes = this._elementRef.nativeElement.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
            if (nodes[i].tagName == "BUTTON") {
                $(nodes[i]).append(this.buttonSpinner);
            }
        }
    }
    private active() {
        var nodes = this._elementRef.nativeElement.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = false;
            if (nodes[i].tagName == "BUTTON") {
                $(nodes[i]).children(".spinner-border").remove();
            }
        }
    }
}
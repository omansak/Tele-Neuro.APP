import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

// BUG Select does not
@Directive({
    selector: '[cardLoader]'
})
export class CardLoaderDirective {
    private alreadyDisabledElements: any[] = [];
    private isLoading: boolean = false;
    private buttonSpinner: string = '<span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>';
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
        this.alreadyDisabledElements = [];
        var nodes = this._elementRef.nativeElement.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].disabled) {
                this.alreadyDisabledElements.push(nodes[i]);
            }
            else {
                nodes[i].disabled = true;
            }
            if (nodes[i].tagName == "BUTTON") {
                $(nodes[i]).append(this.buttonSpinner);
            }
        }
    }
    private active() {
        var nodes = this._elementRef.nativeElement.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            if (!this.alreadyDisabledElements.includes(nodes[i])) {
                nodes[i].disabled = false;
            }
            if (nodes[i].tagName == "BUTTON") {
                $(nodes[i]).children(".spinner-border").remove();
            }
        }
        this.alreadyDisabledElements = [];
    }
}
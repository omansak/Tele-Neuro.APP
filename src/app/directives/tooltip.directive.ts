import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[data-bs-toggle="tooltip"]'
})
export class TooltipDirective implements OnInit {

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        $(this.el.nativeElement).tooltip({ html: true });
    }
}

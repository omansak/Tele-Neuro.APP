import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ngLet]',
})
export class NgLetDirective {
    @Input()
    set ngLet(context: unknown) {
        this.context.$implicit = this.context.ngLet = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: { $implicit: unknown; ngLet: unknown; } = { $implicit: null, ngLet: null };

    private hasView: boolean = false;

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
import { Directive, TemplateRef, ViewContainerRef, NgZone } from "@angular/core";

@Directive({
    selector: '[oneTimeBind]',
})
export class OneTimeBindDirective {
    constructor(template: TemplateRef<any>, container: ViewContainerRef, zone: NgZone) {
        zone.runOutsideAngular(() => {
            const view = container.createEmbeddedView(template);
            setTimeout(() => view.detach());
        })
    }
}
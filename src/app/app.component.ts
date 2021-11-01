import { Component } from '@angular/core';
@Component({
  selector: 'ng-container[osk-root]',
  templateUrl: './app.component.html'
})
export class AppComponent {
  changeBodyPublicLayoutClass() {
    $("body").removeClass("vertical-layout");
    $("body").addClass("public-layout");
  }

  changeBodyVerticalLayoutClass() {
    $("body").removeClass("public-layout");
    $("body").addClass("vertical-layout");
  }
}

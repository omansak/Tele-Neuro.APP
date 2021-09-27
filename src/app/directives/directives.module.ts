import { NgModule } from '@angular/core';
import { CardLoaderDirective } from './card-loader.directive';
import { NgLetDirective } from './ng-let.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [],
  declarations: [CardLoaderDirective, NgLetDirective, TooltipDirective],
  exports: [CardLoaderDirective, NgLetDirective, TooltipDirective]
})
export class DirectivesModule { }
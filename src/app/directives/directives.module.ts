import { NgModule } from '@angular/core';
import { CardLoaderDirective } from './card-loader.directive';
import { NgLetDirective } from './ng-let.directive';
import { OneTimeBindDirective } from './one-time-bind.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [],
  declarations: [CardLoaderDirective, NgLetDirective, OneTimeBindDirective, TooltipDirective,],
  exports: [CardLoaderDirective, NgLetDirective, OneTimeBindDirective, TooltipDirective]
})
export class DirectivesModule { }
import { NgModule } from '@angular/core';
import { SafeUrlPipe } from './safe-uri.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe],
  exports: [SafeUrlPipe]
})
export class PipesModule { }
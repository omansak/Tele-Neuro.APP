import { NgModule } from '@angular/core';
import { SafeUrlPipe } from './safe-uri.pipe';
import { TextUrlPipe } from './text-url.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe, TextUrlPipe],
  exports: [SafeUrlPipe, TextUrlPipe]
})
export class PipesModule { }
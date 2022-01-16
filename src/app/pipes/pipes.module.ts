import { NgModule } from '@angular/core';
import { FormatSecondsPipe } from './format-seconds.pipe';
import { HasRolePipe } from './has-role.pipe';
import { SafeUrlPipe } from './safe-uri.pipe';
import { TextUrlPipe } from './text-url.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe, TextUrlPipe, HasRolePipe, FormatSecondsPipe],
  exports: [SafeUrlPipe, TextUrlPipe, HasRolePipe, FormatSecondsPipe]
})
export class PipesModule { }
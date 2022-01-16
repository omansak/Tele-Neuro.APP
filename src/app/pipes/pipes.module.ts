import { NgModule } from '@angular/core';
import { HasRolePipe } from './has-role.pipe';
import { SafeUrlPipe } from './safe-uri.pipe';
import { TextUrlPipe } from './text-url.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe, TextUrlPipe, HasRolePipe],
  exports: [SafeUrlPipe, TextUrlPipe, HasRolePipe]
})
export class PipesModule { }
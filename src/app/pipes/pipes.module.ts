import { NgModule } from '@angular/core';
import { FormatSecondsPipe } from './format-seconds.pipe';
import { HasRolePipe } from './has-role.pipe';
import { PluckPipe } from './pluck.pipe';
import { SafeUrlPipe } from './safe-uri.pipe';
import { StringJoinPipe } from './string-join.pipe';
import { TextUrlPipe } from './text-url.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe, TextUrlPipe, HasRolePipe, FormatSecondsPipe, StringJoinPipe, PluckPipe],
  exports: [SafeUrlPipe, TextUrlPipe, HasRolePipe, FormatSecondsPipe, StringJoinPipe, PluckPipe]
})
export class PipesModule { }
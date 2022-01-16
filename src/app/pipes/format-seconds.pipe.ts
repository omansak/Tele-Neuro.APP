import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../helpers/helper';

@Pipe({ name: 'formatSeconds' })
export class FormatSecondsPipe implements PipeTransform {
    transform(value: number): string {
        return Helper.FormatSeconds(value);
    }
}
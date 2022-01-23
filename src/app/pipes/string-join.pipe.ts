import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../helpers/helper';

@Pipe({ name: 'stringJoin' })
export class StringJoinPipe implements PipeTransform {
    transform(value: string[], separator: string = ","): string {
        return Helper.Join(value, separator);
    }
}
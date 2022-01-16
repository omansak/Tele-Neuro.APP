import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textUrl' })
export class TextUrlPipe implements PipeTransform {
  transform(text: string): string {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  }
}
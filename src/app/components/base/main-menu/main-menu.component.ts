import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent implements OnInit {

  @Input()
  public navigation: any;

  constructor() { }

  ngOnInit(): void {
  }

}

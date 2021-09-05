import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HorizontalNavbarComponent } from './horizontal-navbar/horizontal-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule],
  exports: [],
  declarations: [BaseComponent, NavbarComponent, MainMenuComponent, FooterComponent, HorizontalNavbarComponent],
  providers: [],
})
export class BaseComponentModule { }

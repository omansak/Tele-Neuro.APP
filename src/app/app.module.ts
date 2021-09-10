import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponentModule } from './components/base/base.component.module';
import { CDN_JS_JQUERY, CDN_JS_POPPER, CDN_JS_BOOTSTRAP, CDN_CSS_ANIMATE, CDN_CSS_ICOFONT, CDN_CSS_SIMPLE_LINE_ICON } from './consts/cdns';
import { DEFAULT_TOASTR_CONFIG } from './consts/defaults';
import { ExceptionHandler } from './services/common/exception-handler';
import { LazyLoaderService } from './services/common/lazy-script-loader.service';
import { ToastService } from './services/common/toastr-service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    // App
    BaseComponentModule,
    ToastNoAnimationModule.forRoot(DEFAULT_TOASTR_CONFIG)
  ],
  providers: [LazyLoaderService, ExceptionHandler, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _lazyLoaderService: LazyLoaderService) {
    this.loadAssets();
  }

  loadAssets() {
    // Global JS's
    this._lazyLoaderService.loadScript(CDN_JS_JQUERY).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_POPPER).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_BOOTSTRAP).subscribe();
    // Global CSS's
    this._lazyLoaderService.loadStyle(CDN_CSS_ANIMATE).subscribe();
    this._lazyLoaderService.loadStyle(CDN_CSS_ICOFONT).subscribe();
    this._lazyLoaderService.loadStyle(CDN_CSS_SIMPLE_LINE_ICON).subscribe();
  }
}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponentModule } from './components/base/base.component.module';
import { CDN_JS_JQUERY, CDN_JS_POPPER, CDN_JS_BOOTSTRAP, CDN_CSS_ANIMATE, CDN_CSS_ICOFONT, CDN_CSS_SIMPLE_LINE_ICON, CDN_JS_VALIDATE, CDN_JS_HAMMER } from './consts/cdns';
import { DEFAULT_TOASTR_CONFIG } from './consts/defaults';
import { NAVIGATION_ROUTE } from './consts/navigation';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized-interceptor';
import { AuthenticationService } from './services/authentication/authentication-service';
import { ExceptionHandler } from './services/common/exception-handler';
import { LazyLoaderService } from './services/common/lazy-script-loader.service';
import { ToastService } from './services/common/toastr-service';
import { NotificationHubService } from './services/notification-hub/notification-hub-service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // App
    BaseComponentModule,
    ToastNoAnimationModule.forRoot(DEFAULT_TOASTR_CONFIG)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    LazyLoaderService, // Care to Singleton
    ExceptionHandler, // Care to Singleton
    ToastService, // Care to Singleton
    AuthenticationService, // Care to Singleton
    NotificationHubService // Care to Singleton
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private _lazyLoaderService: LazyLoaderService,
    _authenticationService: AuthenticationService,
    _notificationHubService: NotificationHubService,
    _toastService: ToastService,
    _activatedRoute: ActivatedRoute) {
    // Load lazy load scripts & styles
    this.loadAssets();
    // Start Refresh 'refresh token'
    _authenticationService.refreshToken().toPromise();
    // Start Notification Hub
    _notificationHubService.startConnection();
    // Handle new message
    _notificationHubService
      .newMessageObservable()
      .subscribe(i => {
        if ((<any>_activatedRoute)._routerState?.snapshot?.url != `/${NAVIGATION_ROUTE.ROUTE_CONVERSATION.Route}`){
          _toastService.info("Bir yeni mesajınız var");
        }
      });
  }

  loadAssets() {
    // Global JS's
    this._lazyLoaderService.loadScript(CDN_JS_JQUERY).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_POPPER).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_BOOTSTRAP).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_HAMMER).subscribe();
    this._lazyLoaderService.loadScript(CDN_JS_VALIDATE).subscribe(() => {
      validate.options = { fullMessages: false, format: "flat" };
    });
    // Global CSS's
    this._lazyLoaderService.loadStyle(CDN_CSS_ANIMATE).subscribe();
    this._lazyLoaderService.loadStyle(CDN_CSS_ICOFONT).subscribe();
    this._lazyLoaderService.loadStyle(CDN_CSS_SIMPLE_LINE_ICON).subscribe();
  }
}

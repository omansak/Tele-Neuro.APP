import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication-service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {

  @Input()
  public navigation: any;

  constructor(public _authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  userHasRole(roleKey: string) {
    console.log(roleKey);

    return this._authenticationService.userHasRole(roleKey);
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication-service';

@Component({
  selector: 'app-horizontal-navbar',
  templateUrl: './horizontal-navbar.component.html'
})
export class HorizontalNavbarComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authenticationService.logout().subscribe()
  }
}

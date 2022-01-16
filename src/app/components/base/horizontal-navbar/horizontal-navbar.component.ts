import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { AuthenticationService } from 'src/app/services/authentication/authentication-service';
import { ConversationService } from 'src/app/services/conversation/conversation-service';

@Component({
  selector: 'app-horizontal-navbar',
  templateUrl: './horizontal-navbar.component.html'
})
export class HorizontalNavbarComponent implements OnInit {

  public unReadConversationCount: number;
  constructor(private _authenticationService: AuthenticationService, private _router: Router, private _conversationService: ConversationService) { }

  ngOnInit(): void {
    this.initUserUnreadMessageCount();
  }

  logout() {
    this._authenticationService.logout().subscribe()
  }

  navigateConversation() {
    this._router.navigate([NAVIGATION_ROUTE.ROUTE_CONVERSATION.Route]);
  }

  private initUserUnreadMessageCount() {
    this._conversationService.userUnreadConversationCount().subscribe(i => {
      if (i) {
        this.unReadConversationCount = i;
      }
    })
  }
}

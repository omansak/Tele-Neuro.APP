import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NAVIGATION_ROUTE, ROUTE } from 'src/app/consts/navigation';
import { RouterModule } from '@angular/router';
import { ConversationPage } from './conversation.page';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { UserService } from 'src/app/services/user/user-service';
import { ConversationService } from 'src/app/services/conversation/conversation-service';
import { AuthenticationService } from 'src/app/services/authentication/authentication-service';
@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        // Route
        RouterModule.forChild([
            {
                path: ROUTE,
                component: ConversationPage,
                data: NAVIGATION_ROUTE.ROUTE_CONVERSATION
            }
        ]),
        // App
        SharedComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [],
    declarations: [ConversationPage],
    providers: [UserService, ConversationService, AuthenticationService],
})
export class ConversationPageModule { }

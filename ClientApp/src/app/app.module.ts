import { GameDeactivateGuard } from './_guards/game-deactivate.guard';
import { GameChatComponent } from './_components/game-chat/game-chat.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { GameGuard } from './_guards/game.guard';
import { GameComponent } from './_components/game/game.component';
import { HubService } from './_services/hub.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { WaitingRoomComponent } from './_components/waiting-room/waiting-room.component';
import { WaitingRoomGuard } from './_guards/waiting-room.guard';

@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent, WaitingRoomComponent, SidebarComponent, GameChatComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'waitingRoom', component: WaitingRoomComponent, canActivate: [WaitingRoomGuard] },
      { path: 'game', component: GameComponent, canActivate: [GameGuard], canDeactivate: [GameDeactivateGuard] },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [HubService, WaitingRoomGuard, GameGuard, GameDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

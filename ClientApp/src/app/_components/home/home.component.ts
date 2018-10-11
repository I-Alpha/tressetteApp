import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { WaitingRoom } from '../../_models/waitingRoom';
import { HubService } from '../../_services/hub.service';
import { ChatMessage } from '../../_models/chatMessage';
import { TypeOfMessage } from '../../_models/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  messages: ChatMessage[];
  currentUser: User;
  newMessage = '';

  constructor(private _hubService: HubService) {}

  ngOnInit(): void {
    this._hubService.AllChatMessages.subscribe(nn => {
      this.messages = nn;
    });
    this._hubService.CurrentUser.subscribe(user => {
      this.currentUser = user;
    });

    this._hubService.LeaveWaitingRoom();
  }

  createNewWaitingRoom(playUntilPoints: number, expectedNumberOfPlayers: number) {
    this._hubService.CreateWaitingRoom(playUntilPoints, expectedNumberOfPlayers);
  }

  sendMessageAllChat() {
    if (!this.newMessage) return;
    this._hubService.AddNewMessageToAllChat(this.newMessage);
    this.newMessage = '';
  }

  getChatMessageClass(message: ChatMessage) {
    if (message.typeOfMessage == TypeOfMessage.server) {
      return 'server-chat-message';
    }
  }

  rename() {
    let name = prompt('Input your name');
    if (!name) return;
    localStorage.setItem('name', name);
    window.location.reload();
  }
}

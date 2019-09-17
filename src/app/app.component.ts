import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nextchat';
  users = [];
  chatInput = new FormControl();
  messages = []

  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.joinChat()
    this.chatService.users.subscribe(users => {
      this.users = users
    })

    this.chatService.messages.subscribe(allMessages => {
      this.messages = allMessages
    })
  }

  onSubmit(){
    this.chatService.sendMessage(this.chatInput.value)
  }
}

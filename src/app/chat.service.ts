import * as socketio from 'socket.io-client'
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const url = 'https://lirenyeo-react-group-chat-socket-io-server-1.glitch.me/'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket
  users = new BehaviorSubject([])
  currentUser = new BehaviorSubject(null)
  messages = new BehaviorSubject([])

  constructor() { }

  private initSocket(){
    if(!this.socket){
      this.socket = socketio(url)
    }
  }

  public joinChat(){
    this.initSocket()

    this.socket.emit("NEW_USER")

    this.socket.on("GET_CURRENT_USER", (newUser) => {
      this.currentUser.next(newUser)
    })

    this.socket.on("UPDATE_USER_LIST", (listOfUsers) => {
      this.users.next(listOfUsers)
    })

    this.socket.on("RECEIVE_BROADCAST", (newMessage) => {
      let updatedMessages = this.messages.getValue()
      updatedMessages.push({
        username: newMessage.username,
        message: newMessage.message,
        timestamp: new Date(newMessage.timestamp).toString()
      })
      this.messages.next(updatedMessages)
    })
  }

  public sendMessage(message){
    this.socket.emit("BROADCAST_MESSAGE", {
      username: this.currentUser.getValue().username,
      message: message,
      timestamp: Date.now()
    })
  }

}

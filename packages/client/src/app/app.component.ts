import { Component, OnDestroy } from '@angular/core';

import { SocketIoService } from './socket-io.service';
import { Message } from './message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  nickname: string;
  message: string;

  messages: Message[] = [];

  private subscriptionMessages: Subscription;

  constructor(private socketService: SocketIoService){ }

  ngOnInit(){
    this.subscriptionMessages = this.socketService.messages()
      .subscribe((m: Message) => {
        console.log(m);
        this.messages.push(m);
      })
  }

  send(){
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });

    this.message = '';
  }

  ngOnDestroy(){
    this.subscriptionMessages.unsubscribe();
  }
}

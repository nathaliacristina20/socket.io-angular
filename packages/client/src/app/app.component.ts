import { Component } from '@angular/core';

import { SocketIoService } from './socket-io.service';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname: string;
  message: string;

  constructor(private socketService: SocketIoService){

  }

  ngOnInit(){
    this.socketService.messages()
      .subscribe((m: Message) => {
        console.log(m);
      })
  }

  send(){
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });

    this.message = '';
  }
}

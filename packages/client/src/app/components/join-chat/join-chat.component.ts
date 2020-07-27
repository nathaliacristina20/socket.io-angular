import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-join-chat',
    templateUrl: './join-chat.component.html',
    styleUrls: ['./join-chat.component.scss'],
})
export class JoinChatComponent implements OnInit {
    public nickname = '';

    constructor(private router: Router) {}

    ngOnInit() {}

    joinChat() {
        if (this.nickname === '') {
            return;
        }

        console.log(this.nickname);

        this.router.navigateByUrl('chat', {
            queryParams: {
                nickname: this.nickname,
            },
        });
      
    }
}

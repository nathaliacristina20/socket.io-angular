import {
    Component,
    ViewChild,
    ElementRef,
    QueryList,
    ViewChildren,
} from '@angular/core';

import { SocketIoService } from '../../shared/socket-io.service';
import { Message } from '../../shared/message';
import { Subscription } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
    nickname: string;
    message: string;
    messages: Message[] = [];

    private subscriptionMessages: Subscription;
    private subscriptionList: Subscription;

    @ViewChild(MatList, { read: ElementRef, static: true }) list: ElementRef;
    @ViewChildren(MatListItem) listItems: QueryList<MatListItem>;

    constructor(
        private socketService: SocketIoService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        
        this.route.queryParams.subscribe((params) => {
            this.nickname = params['nickname'];
            console.log(this.nickname);
        });

        this.subscriptionMessages = this.socketService
            .messages()
            .subscribe((m: Message) => {
                console.log(m);
                this.messages.push(m);
            });
    }

    ngAfterViewInit() {
        this.subscriptionList = this.listItems.changes.subscribe((e) => {
            this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
            // console.log(this.list.nativeElement.scrollHeight);
        });
    }

    send() {
        this.socketService.send({
            from: this.nickname,
            message: this.message,
        });

        this.message = '';
    }

    ngOnDestroy() {
        this.subscriptionMessages.unsubscribe();
        this.subscriptionList.unsubscribe();
    }
}

import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private route: ActivatedRoute, private router: Router,
    private alertify: AlertifyService,  private messageService: MessageService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
  loadMessages(messageContainer?: string) {
    if (messageContainer) {
      this.messageContainer = messageContainer;
    }
    this.messageService.getMessagesForUser(this.messageContainer, this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe(res => {
      this.messages = res.result;
      this.pagination = res.pagination;
    })
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  deleteMessage(m: Message) {
    this.alertify.confirm('Are you sure you want to delete this message? ', () => {
      // Do something;
    });
  }

}

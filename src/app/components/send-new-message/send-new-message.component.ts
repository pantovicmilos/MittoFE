import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SendSmsRequest } from 'src/app/models/dtos';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '../../models/dtos';

@Component({
  selector: 'app-send-new-message',
  templateUrl: './send-new-message.component.html',
  styleUrls: ['./send-new-message.component.css']
})
export class SendNewMessageComponent implements OnInit {

  viewModel: SendSmsRequest = new SendSmsRequest();

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  async sendSms() {
    const result = await this.apiService.sendNewMessage(this.viewModel);
    console.log('result', result);
    if (result.state === State.Success) {
      this.showSuccess();
    }
  }

  public showSuccess(): void {
    this.notificationService.show({
        content: 'Message delivered',
        hideAfter: 600,
        position: { horizontal: 'center', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'success', icon: true }
    });
}
}

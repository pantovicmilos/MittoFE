import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendNewMessageComponent } from './components/send-new-message/send-new-message.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SentMessagesComponent } from './components/sent-messages/sent-messages.component';


const routes: Routes = [
  { path: 'messages/new', component: SendNewMessageComponent},
  { path: 'messages/sent', component: SentMessagesComponent},
  { path: 'messages/statistics', component: StatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

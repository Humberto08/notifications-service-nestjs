import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from './dtos/create-notification-body';
import { SendNotification } from '@application/use-case/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-case/cancel-notification';
import { ReadNotification } from '@application/use-case/read-notification';
import { UnreadNotification } from '@application/use-case/unread-notification';
import { CountRecipientNotifications } from '@application/use-case/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-case/get-recipient-notifications';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
    
  ) {}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string
  ) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }


  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    });
    return {
      count
    }
  }



  @Get('from/:recipientId')
  async getCountFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }


  @Patch(':id/read')
  async read(
    @Param('id') id: string
  ) {
    await this.readNotification.execute({
      notificationId: id
    });
  }


  @Patch(':id/unread')
  async unread(
    @Param('id') id: string
  ) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }


  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }

}

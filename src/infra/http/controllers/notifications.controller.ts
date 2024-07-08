import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './dtos/create-notification-body';
import { SendNotification } from '@application/use-case/send-notification';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification
  ) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification
    }
  }

}

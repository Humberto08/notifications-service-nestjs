import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-case/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@application/use-case/cancel-notification';
import { CountRecipientNotifications } from '@application/use-case/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-case/get-recipient-notifications';
import { ReadNotification } from '@application/use-case/read-notification';
import { UnreadNotification } from '@application/use-case/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}

import { Content } from '@application/entities/content';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notificacions-repository';
import { Notification } from '@application/entities/notification';
import { NotificationNotFound } from './errors/notification-not-found';


describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content("Nova solicitação de amizade"),
      category: 'social',
    }); 

  await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      });
    }).rejects.toThrow(NotificationNotFound);
  });
})


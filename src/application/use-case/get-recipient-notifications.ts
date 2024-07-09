import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Notification } from "@application/entities/notification";

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
  static execute(arg0: { recipientId: string; }): { notifications: any; } | PromiseLike<{ notifications: any; }> {
      throw new Error('Method not implemented.');
  }

  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

  async execute(request: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> 
  {
    const { recipientId: recipientId } = request

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications }
}}

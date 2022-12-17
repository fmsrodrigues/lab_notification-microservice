import { Content } from '@application/entities/notifications/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('friend request'),
    recipientId: 'fake-recipient-id',
    ...override,
  });
}

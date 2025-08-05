// src/domain/enums/ENotificationType.ts

export enum ENotificationType {
  SMS = 0,
  Email = 1,
  WhatsApp = 2,
}

export function getNotificationDescription(type: ENotificationType): string {
  switch (type) {
    case ENotificationType.SMS:
      return 'Notification via SMS';
    case ENotificationType.Email:
      return 'Notification via email';
    case ENotificationType.WhatsApp:
      return 'Notification via WhatsApp';
    default:
      return 'Unknown';
  }
}

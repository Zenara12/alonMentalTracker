import { LocalNotifications } from '@capacitor/local-notifications'
import { LocalStorage } from 'quasar'

export default async () => {
  let notificationToggle = LocalStorage.getItem('notification')
  console.log(notificationToggle)
  if (notificationToggle == 1) {
    try {
      // Request permissions first
      const permStatus = await LocalNotifications.requestPermissions()
      if (permStatus.display !== 'granted') {
        console.error('Notification permissions denied')
        return
      }

      // Generate two unique IDs for our notifications
      const firstNotificationId = Date.now()
      const secondNotificationId = firstNotificationId + 1

      // Cancel any existing notifications first
      await LocalNotifications.cancel({
        notifications: [{ id: firstNotificationId }, { id: secondNotificationId }],
      })

      // Calculate timing for notifications
      const now = new Date()
      const firstNotificationTime = new Date(now.getTime() + 60000) // 1 minute from now
      const secondNotificationTime = new Date(now.getTime() + 120000) // 2 minutes from now

      // Schedule both notifications separately for precise control
      await LocalNotifications.schedule({
        notifications: [
          {
            id: firstNotificationId,
            title: 'Good Day ⏰🌞',
            body: 'Start your day with a smile!',
            schedule: {
              at: firstNotificationTime,
              allowWhileIdle: true,
            },
            smallIcon: 'ic_stat_icon',
            sound: 'default',
            channelId: 'minute-reminders',
            channelName: 'Minute Reminders',
            extra: {
              notificationNumber: 1,
              timestamp: Date.now(),
            },
            autoCancel: true,
          },
          {
            id: secondNotificationId,
            title: 'What are you feeling today ⏰',
            body: 'Alon reminds you to smile!',
            schedule: {
              at: secondNotificationTime,
              allowWhileIdle: true,
            },
            smallIcon: 'ic_stat_icon',
            sound: 'default',
            channelId: 'minute-reminders',
            channelName: 'Minute Reminders',
            extra: {
              notificationNumber: 2,
              timestamp: Date.now(),
            },
            autoCancel: true,
          },
        ],
      })

      // Add listeners for both notifications
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        const notificationData = notification.notification.extra
        console.log(`Notification ${notificationData.notificationNumber} clicked at:`, new Date())
        // Handle notification interaction here
      })

      console.log('Notifications scheduled:', {
        firstNotification: firstNotificationTime.toLocaleTimeString(),
        secondNotification: secondNotificationTime.toLocaleTimeString(),
      })
    } catch (error) {
      console.error('Failed to schedule notifications:', error)
    }
  }
}

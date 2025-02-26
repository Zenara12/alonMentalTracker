import { LocalNotifications } from '@capacitor/local-notifications'
import { LocalStorage, Notify } from 'quasar'

export default async () => {
  let notifToggle = LocalStorage.getItem('notification')
  //notif 1st initial
  let notifInitialize = LocalStorage.getItem('notifInitialize')
  if (!notifInitialize) {
    LocalStorage.setItem('notifInitialize', true)
    LocalStorage.setItem('notification', true)
    notifToggle = true
  }

  if (notifToggle) {
    try {
      // Request permissions first
      const permStatus = await LocalNotifications.requestPermissions()
      if (permStatus.display !== 'granted') {
        console.error('Notification permissions denied')
        Notify.create({
          color: 'red',
          textColor: 'primary',
          position: 'top',
          message: `Failed:Permission denied`,
          timeout: 10000,
        })
        return
      }

      const d = new Date()
      // Define fixed integer IDs for notifications
      const notificationIds = {
        first: parseInt(d.getTime() % 100000000),
        second: parseInt(1 + (d.getTime() % 100000000)),
        morning: parseInt(2 + (d.getTime() % 100000000)),
        afternoon: parseInt(3 + (d.getTime() % 100000000)),
      }

      // Cancel any existing notifications
      await LocalNotifications.cancel({
        notifications: Object.values(notificationIds).map((id) => ({ id })),
      })

      // Calculate timing for immediate notifications
      const now = new Date()
      const firstNotificationTime = new Date(now.getTime() + 6000) // 1 minute from now
      const secondNotificationTime = new Date(now.getTime() + 12000) // 2 minutes from now

      // Calculate 9 AM and 2 PM times for today or tomorrow
      const calculateNextTime = (hours, minutes = 0) => {
        const targetTime = new Date()
        targetTime.setHours(hours, minutes, 0, 0)

        // If the time has already passed today, schedule for tomorrow
        if (targetTime <= now) {
          targetTime.setDate(targetTime.getDate() + 1)
        }

        return targetTime
      }

      const morningTime = calculateNextTime(9) // 9:00 AM
      const afternoonTime = calculateNextTime(14) // 2:00 PM

      // Schedule all notifications
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notificationIds.first,
            title: 'First Reminder ⏰',
            body: 'This is your first minute reminder!',
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
              type: 'minute',
            },
            autoCancel: true,
          },
          {
            id: notificationIds.second,
            title: 'Second Reminder ⏰',
            body: 'This is your second minute reminder!',
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
              type: 'minute',
            },
            autoCancel: true,
          },
          {
            id: notificationIds.morning,
            title: 'Good Morning! ☀️',
            body: 'Time to start your day with energy and purpose!',
            schedule: {
              at: morningTime,
              repeats: true,
              every: 'day',
              allowWhileIdle: true,
            },
            smallIcon: 'ic_stat_icon',
            sound: 'default',
            channelId: 'daily-reminders',
            channelName: 'Daily Reminders',
            extra: {
              notificationType: 'morning',
            },
            autoCancel: true,
          },
          {
            id: notificationIds.afternoon,
            title: 'Afternoon Check-in 🌤️',
            body: 'Time for your afternoon activities!',
            schedule: {
              at: afternoonTime,
              repeats: true,
              every: 'day',
              allowWhileIdle: true,
            },
            smallIcon: 'ic_stat_icon',
            sound: 'default',
            channelId: 'daily-reminders',
            channelName: 'Daily Reminders',
            extra: {
              notificationType: 'afternoon',
            },
            autoCancel: true,
          },
        ],
      })

      // Add listener for all notifications
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        const notificationData = notification.notification.extra
        console.log(`Notification triggered:`, {
          type:
            notificationData.notificationType || `minute-${notificationData.notificationNumber}`,
          time: new Date().toLocaleTimeString(),
        })
        Notify.create({
          color: 'white',
          textColor: 'primary',
          position: 'top',
          message:
            (`Notification triggered:`,
            {
              type:
                notificationData.notificationType ||
                `minute-${notificationData.notificationNumber}`,
              time: new Date().toLocaleTimeString(),
            }),
          timeout: 8000,
        })
      })

      // Log scheduled times
      console.log('Notifications scheduled:', {
        firstMinute: firstNotificationTime.toLocaleTimeString(),
        secondMinute: secondNotificationTime.toLocaleTimeString(),
        morningDaily: morningTime.toLocaleTimeString(),
        afternoonDaily: afternoonTime.toLocaleTimeString(),
      })
    } catch (error) {
      console.error('Failed to schedule notifications:', error)
      Notify.create({
        color: 'red',
        textColor: 'primary',
        position: 'top',
        message: `Failed:${error}`,
        timeout: 10000,
      })
    }
  }
}

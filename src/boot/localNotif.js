import { LocalNotifications } from '@capacitor/local-notifications'

export default async () => {
  try {
    // Request permissions first
    const permStatus = await LocalNotifications.requestPermissions()
    if (permStatus.display !== 'granted') {
      console.error('Notification permissions denied')
      return
    }

    // Generate unique IDs for all notifications
    const baseId = Date.now()
    const notificationIds = {
      first: baseId,
      second: baseId + 1,
      morning: baseId + 2,
      afternoon: baseId + 3,
    }

    // Cancel any existing notifications
    await LocalNotifications.cancel({
      notifications: Object.values(notificationIds).map((id) => ({ id })),
    })

    // Calculate timing for immediate notifications
    const now = new Date()
    const firstNotificationTime = new Date(now.getTime() + 60000) // 1 minute from now
    const secondNotificationTime = new Date(now.getTime() + 120000) // 2 minutes from now

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
            timestamp: Date.now(),
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
            timestamp: Date.now(),
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
            timestamp: Date.now(),
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
            timestamp: Date.now(),
          },
          autoCancel: true,
        },
      ],
    })

    // Add listener for all notifications
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const notificationData = notification.notification.extra
      console.log(`Notification triggered:`, {
        type: notificationData.notificationType || `minute-${notificationData.notificationNumber}`,
        time: new Date().toLocaleTimeString(),
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
  }
}

import { LocalNotifications } from '@capacitor/local-notifications'

export default async () => {
  // Request permissions
  const permStatus = await LocalNotifications.requestPermissions()
  if (permStatus.display !== 'granted') {
    console.log('Notification permissions denied')
    return
  }

  console.log('Notification permissions granted')

  // Cancel old notifications to avoid duplicates
  await LocalNotifications.cancel({ notifications: [{ id: 1 }] })

  // Schedule a daily notification at 8:00 AM
  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: 'Good Morning! ☀️',
        body: 'Start your day with a smile!',
        schedule: {
          repeats: true,
          every: 'day',
          allowWhileIdle: true, // Ensures it works even if the app is not running
          on: { hour: 8, minute: 10 }, // Set time to 8:00 AM
        },
      },
    ],
  })

  console.log('Daily notification scheduled at 8:00 AM')
}

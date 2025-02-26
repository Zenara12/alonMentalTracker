import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

export function useBackButton() {
  const router = useRouter()
  const route = useRoute()

  const handleBackButton = async () => {
    // If on home screen, exit app
    if (route.path === '/' || route.path === '/landing' || route.path === '/registration') {
      await App.exitApp()
    } else {
      // Navigate to previous route
      router.go(-1)
    }
  }

  onMounted(() => {
    if (Capacitor.isNativePlatform()) {
      App.addListener('backButton', handleBackButton)
    }
  })

  onUnmounted(() => {
    if (Capacitor.isNativePlatform()) {
      App.removeAllListeners()
    }
  })
}

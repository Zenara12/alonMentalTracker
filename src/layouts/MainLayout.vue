<template>
  <q-layout view="hHh lpR lFf">
    <q-img src="/images/alonbg.png" class="fit absolute" />
    <q-header style="background-color: transparent">
      <q-toolbar>
        <q-toolbar-title @click="home">
          <q-img
            v-if="!launch"
            src="/images/alon-logo128x128.png"
            loading="lazy"
            spinner-color="white"
            height="50px"
            style="max-width: 150px"
          />
        </q-toolbar-title>
        <q-btn flat dense round icon="menu" v-show="showMenu">
          <q-menu
            flat
            anchor="bottom left"
            self="top left"
            :offset="[0, 10]"
            transition-show="slide-down"
            transition-duration="600"
            auto-close
          >
            <q-list color="primary">
              <q-item
                clickable
                v-close-popup
                color="primary"
                v-for="(item, index) in menuList"
                :key="index"
                :to="item.navigate"
              >
                <q-item-section
                  avatar
                  v-if="item.icon === 'settings'"
                  @click="settingsDisplay = true"
                >
                  <q-icon color="primary" :name="item.icon" />
                </q-item-section>
                <q-item-section avatar v-else>
                  <q-icon color="primary" :name="item.icon" />
                </q-item-section>
                <q-item-section
                  class="text-primary"
                  v-if="item.icon === 'settings'"
                  ripple
                  @click="settingsDisplay = true"
                  >{{ item.title }}</q-item-section
                >
                <q-item-section class="text-primary" v-else>{{ item.title }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="settingsDisplay">
      <q-card style="width: 800px; max-width: 110vw">
        <q-card-section>
          <SettingsComponent v-model="audioToggle" />
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { useBackButton } from 'src/backButtonHandler'
import { useQuasar } from 'quasar'
import SettingsComponent from 'src/components/SettingsComponent.vue'
//import localNotif from 'src/boot/localNotif.js'
import { LocalNotifications } from '@capacitor/local-notifications'

const $q = useQuasar()

const router = useRouter()
const route = useRoute()
const showMenu = ref(true)

const audioBg = new Audio('/audios/alon-bg-music.mp3')
audioBg.loop = true
const userInteracted = ref(false)

const audioToggle = ref($q.localStorage.getItem('sound') || true)

const settingsDisplay = ref(false)
const launch = ref(true)

const playAudio = () => {
  if (userInteracted.value && audioBg.paused) {
    audioBg.play().catch((err) => console.error('Audio play error:', err))
  }
}

const pauseAudio = () => {
  if (!audioBg.paused) {
    audioBg.pause()
  }
}

const enableAudio = () => {
  userInteracted.value = true
  playAudio() // Attempt to play audio after interaction
}

const selectedFont = ref('Roboto')
const selectedSize = ref({
  label: 'Small',
  value: '1rem',
})

const savedFont = ref($q.localStorage.getItem('selectedFont') || false)
const savedSize = ref($q.localStorage.getItem('selectedSize') || false)
const darkMode = ref($q.dark.isActive)

const updateFontFamily = (font) => {
  document.body.style.fontFamily = font
  $q.localStorage.setItem('selectedFont', font)
}

const updateFontSize = (size) => {
  document.body.style.fontSize = size.value
  $q.localStorage.setItem('selectedSize', size)
}

const initFontPreferences = () => {
  if (!savedFont.value) {
    updateFontFamily(selectedFont.value)
  }

  if (!savedSize.value) {
    updateFontSize(selectedSize.value)
  }
}
const toggleDarkMode = () => {
  $q.dark.set(darkMode.value) // Enable/disable dark mode
  $q.localStorage.setItem('darkMode', darkMode.value) // Save preference
}

const sendNotification = async () => {
  let notifToggle = $q.localStorage.getItem('notification') || true

  if (notifToggle) {
    try {
      // Request permissions first
      const permStatus = await LocalNotifications.requestPermissions()
      if (permStatus.display === 'granted') {
        const d = new Date()
        // Define fixed integer IDs for notifications
        const notificationIds = {
          first: parseInt(d.getTime() % 100000000),

          morning: parseInt((d.getTime() % 100000000) + 2),
          afternoon: parseInt((d.getTime() % 100000000) + 3),
        }
        const firstNotificationTime = new Date(d.getTime() + 5000) // 1 minute from now

        const calculateNextTime = (hours, minutes = 0) => {
          const targetTime = new Date()
          targetTime.setHours(hours, minutes, 0, 0)

          // If the time has already passed today, schedule for tomorrow
          if (targetTime <= d) {
            targetTime.setDate(targetTime.getDate() + 1)
          }

          return targetTime
        }

        const morningTime = calculateNextTime(9) // 9:00 AM
        const afternoonTime = calculateNextTime(14) // 2:00 PM

        await LocalNotifications.schedule({
          notifications: [
            {
              id: notificationIds.first,
              title: 'Good Day! ☀️',
              body: 'Time to start your day with energy and purpose!',
              schedule: { at: firstNotificationTime, allowWhileIdle: true }, // 5 sec delay
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null,
              autoCancel: true,
              autoClose: true,
            },
            {
              id: notificationIds.morning,
              title: 'Good Day! ☀️',
              body: 'Time to start your day with energy and purpose!',
              schedule: { at: morningTime, allowWhileIdle: true }, // 5 sec delay
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null,
              autoCancel: true,
              autoClose: true,
            },
            {
              id: notificationIds.afternoon,
              title: 'Afternoon Check-in 🌤️',
              body: 'How are you today?',
              schedule: { at: afternoonTime, allowWhileIdle: true }, // 5 sec delay
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null,
              autoCancel: true,
              autoClose: true,
            },
          ],
        })
      } else {
        console.log('Notification permission denied')
      }
    } catch (error) {
      console.error('Failed to schedule notifications:', error)
      $q.notify({
        color: 'red',
        textColor: 'primary',
        position: 'top',
        message: `Failed:${error}`,
        timeout: 10000,
      })
    }
  }
}

onMounted(() => {
  sendNotification()
  useBackButton()
  //console.log(audioToggle.value)
  showMenu.value = route.path != '/' && route.path != '/registration' ? true : false
  initFontPreferences()
  document.addEventListener('click', enableAudio, { once: true }) // Only triggers once
  if (darkMode.value) {
    toggleDarkMode()
  }
  if (route.params.rname !== 'exercise' && route.path !== '/journal' && audioToggle.value) {
    playAudio()
  } else {
    pauseAudio()
  }
})

//check if index or not
watch(
  () => [{ rname: route.params.rname, path: route.path }, audioToggle.value],
  ([{ rname, path }, audioNew]) => {
    showMenu.value = path != '/' && path != '/registration' ? true : false
    //console.log('New:' + rname + ' ' + path + ' ' + audioNew)
    if (path !== '/') {
      launch.value = false
    }
    if (rname !== 'exercise' && path !== '/journal' && audioNew) {
      playAudio()
    } else {
      pauseAudio()
    }
  },
)

//function to route  home
const home = () => {
  router.push('/landing')
}

const menuList = [
  {
    title: 'Health Hotlines',
    icon: 'connect_without_contact',
    navigate: 'healthhotlines',
  },
  {
    title: 'Help Center',
    icon: 'help',
    navigate: 'helpcenter',
  },
  {
    title: 'Settings',
    icon: 'settings',
    navigate: '',
  },
  {
    title: 'About',
    icon: 'info',
    navigate: 'about',
  },
]
</script>

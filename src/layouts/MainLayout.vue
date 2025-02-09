<template>
  <q-layout view="hHh lpR lFf">
    <q-img src="/images/alonbg.png" class="fit absolute" />
    <q-header style="background-color: transparent">
      <q-toolbar>
        <q-toolbar-title @click="home">
          <q-img
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
                <q-item-section avatar>
                  <q-icon color="primary" :name="item.icon" />
                </q-item-section>
                <q-item-section class="text-primary">{{ item.title }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
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
import { LocalNotifications } from '@capacitor/local-notifications'

const sendNotif = async () => {
  const permStatus = await LocalNotifications.requestPermissions()
  if (permStatus.display === 'granted') {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 2,
          title: 'Good Morning! ☀️',
          body: 'Start your day with a smile!',
          schedule: {
            repeats: true,
            every: 'day',
            allowWhileIdle: true, // Ensures it works even if the app is not running
            on: { hour: 8, minute: 20 }, // Set time to 8:00 AM
          },
        },
      ],
    })
  } else {
    console.log('Notification permission denied')
  }
}
sendNotif()

const $q = useQuasar()

const router = useRouter()
const route = useRoute()
const showMenu = ref(true)

const audioBg = new Audio('/audios/alon-bg-music.mp3')
audioBg.loop = true
const userInteracted = ref(false)

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

const savedFont = ref($q.localStorage.getItem('selectedFont'))
const savedSize = ref($q.localStorage.getItem('selectedSize'))
const darkMode = ref($q.localStorage.getItem('darkMode'))

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
  $q.localStorage.setItem('darkMode', darkMode.value.toString()) // Save preference
}

onMounted(() => {
  useBackButton()
  showMenu.value = route.path != '/' && route.path != '/registration' ? true : false
  initFontPreferences()
  document.addEventListener('click', enableAudio, { once: true }) // Only triggers once
  if (darkMode.value) {
    toggleDarkMode()
  }
  if (route.params.rname !== 'exercise' && route.path !== '/journal') {
    playAudio()
  } else {
    pauseAudio()
  }
})

//check if index or not
watch(
  () => ({ rname: route.params.rname, path: route.path }),
  ({ rname, path }) => {
    showMenu.value = path != '/' && path != '/registration' ? true : false

    if (rname !== 'exercise' && path !== '/journal') {
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
    navigate: 'settings',
  },
  {
    title: 'About',
    icon: 'info',
    navigate: 'about',
  },
]
</script>

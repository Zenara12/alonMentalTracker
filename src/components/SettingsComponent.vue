<template>
  <div class="text-h4 text-primary q-mb-lg q-mt-xl">SETTINGS</div>

  <q-list>
    <q-item clickable v-ripple to="/profile">
      <q-item-section>
        <q-item-label>Profile</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Notifications</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle v-model="notifications" @update:model-value="toggleNotification" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Sound</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle v-model="audioToggle" @update:model-value="(value) => toggleSound(value)" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Dark Mode</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle v-model="darkMode" @update:model-value="toggleDarkMode" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Font</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-select
          v-model="font"
          :options="fontOptions"
          dense
          @update:model-value="updateFontFamily"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Size</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-select
          v-model="fontSize"
          :options="fontSizeOptions"
          option-value="value"
          option-label="label"
          label="Font Size"
          outlined
          map-options
          @update:model-value="updateFontSize"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const savedFont = ref($q.localStorage.getItem('selectedFont'))
const savedSize = ref($q.localStorage.getItem('selectedSize'))

const audioToggle = defineModel()
console.log(audioToggle.value)
const notifications = ref($q.localStorage.getItem('notification') || false)
const darkMode = ref($q.localStorage.getItem('darkMode') || false)
const font = ref('Roboto')

const fontSize = ref({
  label: 'Small',
  value: '1rem',
})
const fontOptions = ref(['Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'])
const fontSizeOptions = ref([
  {
    label: 'Small',
    value: '1rem',
  },
  {
    label: 'Medium',
    value: '1.5rem',
  },
  {
    label: 'Large',
    value: '2rem',
  },
])

const updateFontFamily = (font) => {
  document.body.style.fontFamily = font
  $q.localStorage.setItem('selectedFont', font)
}

const updateFontSize = (size) => {
  document.body.style.fontSize = size.value
  $q.localStorage.setItem('selectedSize', size)
}

const initFont = () => {
  if (savedFont.value) {
    font.value = savedFont.value
  }

  if (savedSize.value) {
    fontSize.value = savedSize.value
  }
}

const toggleDarkMode = () => {
  $q.dark.set(darkMode.value) // Enable/disable dark mode
  $q.localStorage.setItem('darkMode', darkMode.value) // Save preference
}

const toggleNotification = () => {
  $q.localStorage.setItem('notification', notifications.value)
}

const toggleSound = (value) => {
  audioToggle.value = value
  console.log(audioToggle.value)
  $q.localStorage.setItem('sound', value)
}
initFont()
</script>

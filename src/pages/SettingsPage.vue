<template>
  <q-page class="q-pa-md text-cyan">
    <div class="text-h4 text-white q-mb-lg">SETTINGS</div>

    <q-card>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Notifications</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="notifications" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="darkMode" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Font</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select v-model="font" :options="fontOptions" dense />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Size</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select v-model="fontSize" :options="fontSizeOptions" dense />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref(false)
const darkMode = ref(false)
const font = ref('Default')
const fontSize = ref('Medium')
const fontOptions = ref(['Default', 'Sans-serif', 'Serif', 'Monospace'])
const fontSizeOptions = ref(['Small', 'Medium', 'Large'])
</script>

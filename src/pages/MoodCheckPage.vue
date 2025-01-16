<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">MOOD CHECK</div>
    <!---Emotions sections-->
    <q-card class="q-pa-md bg-light-blue-2">
      <div class="text-subtitle1 q-mb-md">Emotions</div>
      <div class="row q-col-gutter-md">
        <div v-for="emotion in emotions" :key="emotion.name" class="col-3 text-center">
          <q-btn round flat size="lg" :color="emotion.color">
            <q-avatar size="64px">
              <!-- <img :src="emotion.icon" :alt="emotion.name" /> -->
            </q-avatar>
          </q-btn>
          <div class="q-mt-sm">{{ emotion.name }}</div>
        </div>
        <div>
          <q-btn round flat size="lg" color="primary" icon="add" />
        </div>
      </div>
    </q-card>

    <q-card class="q-mt-md bg-yellow-1">
      <q-card-section>
        <div class="row items-center justify-between">
          <div>Happy Button</div>
          <div class="text-h6">{{ happyValue }}/100</div>
        </div>
        <q-slider v-model="happyValue" :min="0" :max="100" />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md bg-red-1">
      <q-card-section>
        <div class="row items-center justify-between">
          <div>Angry Button</div>
          <div class="text-h6">{{ angryValue }} /100</div>
        </div>
        <q-slider v-model="angryValue" :min="0" :max="100" color="red" />
      </q-card-section>
    </q-card>
    <!---Activities sections-->
    <q-card class="bg-light-blue-2 q-mt-md">
      <div class="text-subtitle1 q-pa-md">Activities</div>
      <div class="row q-col-gutter-md">
        <div v-for="activity in activities" :key="activity.name" class="col-3 text-center">
          <q-btn round flat size="lg" :color="activity.color" :icon="activity.icon"> </q-btn>
          <div class="q-mt-sm">{{ activity.name }}</div>
        </div>
        <div>
          <q-btn round flat size="lg" color="primary" icon="add" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const happyValue = ref(0)
const angryValue = ref(0)
const emotions = [
  { name: 'Cheerful', icon: 'happy.svg', color: 'blue' },
  { name: 'Neutral', icon: 'neutral.svg', color: 'grey' },
  { name: 'Sad', icon: 'sad.svg', color: 'blue-grey' },
  { name: 'Angry', icon: 'angry.svg', color: 'red' },
  { name: 'Sick', icon: 'sick.svg', color: 'purple' },
  { name: 'Anxious', icon: 'anxious.svg', color: 'orange' },
  { name: 'Jealous', icon: 'jealous.svg', color: 'green' },
]
const activities = [
  { name: 'Run', icon: 'directions_run', color: 'blue' },
  { name: 'Read', icon: 'import_contacts', color: 'grey' },
  { name: 'Art', icon: 'palette', color: 'blue-grey' },
  { name: 'Excercise', icon: 'fitness_center', color: 'red' },
  { name: 'Bike', icon: 'directions_bike', color: 'purple' },
  { name: 'Sports', icon: 'sports', color: 'orange' },
  { name: 'Sleep', icon: 'hotel', color: 'green' },
]
</script>

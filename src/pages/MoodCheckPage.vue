<template>
  <q-page class="text-primary q-pa-md">
    <div class="text-h4 text-white text-weight-bolder q-mb-lg">MOOD CHECK</div>
    <!---Emotions sections-->
    <q-card class="q-pa-md">
      <div class="transparent-card-40 text-subtitle1 text-weight-bolder q-py-sm q-px-sm">
        Emotions
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="emotion in emotions" :key="emotion.name" class="col-3 text-center">
          <q-btn round flat size="lg" :color="emotion.color">
            <q-avatar size="30px">
              <img :src="`/images/${emotion.icon}`" />
            </q-avatar>
          </q-btn>
          <div class="q-mt-sm">{{ emotion.name }}</div>
        </div>
        <div class="q-mt-sm">
          <q-btn round flat size="lg" color="primary">
            <q-avatar size="30px">
              <img :src="`/images/cross.png`" />
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-weight-bolder">Happy Button</div>
          <div class="text-h6">{{ happyValue }}/100</div>
        </div>
        <q-slider v-model="happyValue" :min="0" :max="100" />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-weight-bolder">Angry Button</div>
          <div class="text-h6">{{ angryValue }} /100</div>
        </div>
        <q-slider v-model="angryValue" :min="0" :max="100" color="red" />
      </q-card-section>
    </q-card>
    <!---Activities sections-->
    <q-card class="q-pa-md q-mt-md">
      <div class="text-weight-bolder q-mb-md">Activities</div>
      <div class="row q-col-gutter-md">
        <div v-for="activity in activities" :key="activity.name" class="col-3 text-center">
          <q-btn round flat size="lg" :color="activity.color">
            <q-avatar size="30px">
              <img :src="`/images/${activity.icon}`" />
            </q-avatar>
          </q-btn>
          <div class="q-mb-md">{{ activity.name }}</div>
        </div>
        <div class="q-mt-sm">
          <q-btn round flat size="lg" color="primary">
            <q-avatar size="30px">
              <img :src="`/images/cross.png`" />
            </q-avatar>
          </q-btn>
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
  { name: 'Cheerful', icon: 'cheerful.png', color: 'blue' },
  { name: 'Neutral', icon: 'nuetral.png', color: 'grey' },
  { name: 'Sad', icon: 'sad.png', color: 'blue-grey' },
  { name: 'Angry', icon: 'angry.png', color: 'red' },
  { name: 'Sick', icon: 'sick.png', color: 'purple' },
  { name: 'Anxious', icon: 'anxious.png', color: 'orange' },
  { name: 'Jealous', icon: 'jealous.png', color: 'green' },
]
const activities = [
  { name: 'Run', icon: 'running.png', color: 'blue' },
  { name: 'Read', icon: 'book.png', color: 'grey' },
  { name: 'Art', icon: 'art.png', color: 'blue-grey' },
  { name: 'Excercise', icon: 'fitness.png', color: 'red' },
  { name: 'Bike', icon: 'bicycle.png', color: 'purple' },
  { name: 'Sports', icon: 'sports.png', color: 'orange' },
  { name: 'Sleep', icon: 'sleep.png', color: 'green' },
]
</script>

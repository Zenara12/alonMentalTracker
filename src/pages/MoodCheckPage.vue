<template>
  <q-page class="text-primary q-pa-md">
    <div class="text-h4 text-white text-weight-bolder q-mb-lg q-mt-lg">MOOD CHECK</div>
    <!---Emotions sections-->
    <q-card class="q-pa-md">
      <div class="transparent-card-40 text-subtitle1 text-weight-bolder q-py-sm q-px-sm">
        Emotions
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="(emotion, index) in emotions" :key="index" class="col-3 text-center">
          <q-btn @click="changeEmotion(index)" round flat size="lg" :color="emotion.color">
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

    <q-card v-if="currentEmotion !== null" class="q-mt-md">
      <q-card-section :class="`text-${emotions[currentEmotion].color}`">
        <div class="row items-center justify-between">
          <div class="text-weight-bolder">{{ emotions[currentEmotion].name }}</div>
          <div class="text-h6">{{ emotions[currentEmotion].range }}/100</div>
        </div>
        <q-slider
          v-model="emotions[currentEmotion].range"
          :min="0"
          :max="100"
          :color="emotions[currentEmotion].color"
        />
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-mt-md">
      <div class="transparent-card-40 text-subtitle1 text-weight-bolder q-py-sm q-px-sm">
        Activities
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="(activity, index) in activities" :key="index" class="col-3 text-center">
          <q-btn @click="changeActivity(index)" round flat size="lg" :color="activity.color">
            <q-avatar size="30px">
              <img :src="`/images/${activity.icon}`" />
            </q-avatar>
          </q-btn>
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
    <q-card v-if="currentActivity !== null" class="q-mt-md">
      <q-card-section :class="`text-${activities[currentActivity].color}`">
        <div class="row items-center justify-between">
          <div class="text-weight-bolder">{{ activities[currentActivity].name }}</div>
          <div class="text-h6">{{ activities[currentActivity].range }}/100</div>
        </div>
        <q-slider
          v-model="activities[currentActivity].range"
          :min="0"
          :max="100"
          :color="activities[currentActivity].color"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentEmotion = ref(null)
const changeEmotion = (value) => {
  currentEmotion.value = value
  console.log(currentEmotion.value)
}
const currentActivity = ref(null)
const changeActivity = (value) => {
  currentActivity.value = value
  console.log(currentActivity.value)
}

const emotions = reactive([
  { name: 'Cheerful', icon: 'cheerful.png', color: 'blue', range: 0 },
  { name: 'Neutral', icon: 'nuetral.png', color: 'grey', range: 0 },
  { name: 'Sad', icon: 'sad.png', color: 'blue-grey', range: 0 },
  { name: 'Angry', icon: 'angry.png', color: 'red', range: 0 },
  { name: 'Sick', icon: 'sick.png', color: 'purple', range: 0 },
  { name: 'Anxious', icon: 'anxious.png', color: 'orange', range: 0 },
  { name: 'Jealous', icon: 'jealous.png', color: 'green', range: 0 },
])
const activities = reactive([
  { name: 'Run', icon: 'running.png', color: 'blue', range: 0 },
  { name: 'Read', icon: 'book.png', color: 'grey', range: 0 },
  { name: 'Art', icon: 'art.png', color: 'blue-grey', range: 0 },
  { name: 'Excercise', icon: 'fitness.png', color: 'red', range: 0 },
  { name: 'Bike', icon: 'bicycle.png', color: 'purple', range: 0 },
  { name: 'Sports', icon: 'sports.png', color: 'orange', range: 0 },
  { name: 'Sleep', icon: 'sleep.png', color: 'green', range: 0 },
])
</script>

<template>
  <q-page class="text-primary q-pa-md">
    <div class="text-h4 text-white text-weight-bolder q-mt-lg">MOOD CHECK</div>
    <!---Emotions sections-->
    <q-card class="q-pa-md bg-transparent" flat>
      <div class="text-subtitle1 text-weight-bolder q-py-sm q-px-sm bg-info text-white">
        Emotions
      </div>
      <div class="row q-col-gutter-md q-mt-xs">
        <div v-for="(emotion, index) in emotions" :key="index" class="col-3 text-center">
          <q-btn @click="changeEmotion(index)" round size="md">
            <q-avatar :size="buttonAvatarSize">
              <img :src="`/images/${emotion.icon}`" />
            </q-avatar>
          </q-btn>
          <div class="q-mt-sm text-weight-bolder text-subtitle1">{{ emotion.name }}</div>
        </div>
        <div class="col-3 q-mb-sm">
          <q-btn round size="md">
            <q-avatar :size="buttonAvatarSize">
              <img :src="`/images/add.png`" />
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </q-card>

    <q-card flat outlined v-show="showEmotion" class="q-mt-md transparent-card-40">
      <q-card-actions class="text-primary`" align="center">
        <q-btn @click="emotionReset" icon="sync" push color="primary"></q-btn>
        <q-space />
        <div class="column items-center justify-center content-center">
          <div class="text-weight-bold text-h6">{{ emotions[currentEmotion].range }}/100</div>
          <div class="text-weight-bolder text-h5">{{ emotions[currentEmotion].name }} Button</div>
        </div>
        <q-space />
        <q-btn
          class="q-mr-sm"
          @click="emotionsMinusRange"
          icon="remove"
          v-touch-repeat:600:300:50.mouse="emotionsMinusRange"
          push
          color="primary"
        >
        </q-btn>
        <q-btn
          class=""
          @click="emotionsAddRange"
          v-touch-repeat:600:300:50.mouse="emotionsAddRange"
          icon="add"
          push
          color="primary"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
    <!---Activities sections-->
    <q-card class="q-pa-md q-mt-md bg-transparent" flat>
      <div
        class="bg-info text-white text-subtitle1 text-weight-bolder q-py-sm q-px-sm rounded-borders"
      >
        Activities
      </div>
      <div class="row q-col-gutter-md q-mt-xs">
        <div v-for="(activity, index) in activities" :key="index" class="col-3 text-center">
          <q-btn @click="changeActivity(index)" round flat size="lg" :color="activity.color">
            <q-avatar :size="buttonAvatarSize">
              <img :src="`/images/${activity.icon}`" />
            </q-avatar>
          </q-btn>
        </div>
        <div class="q-mb-sm">
          <q-btn round flat size="lg" color="primary">
            <q-avatar :size="buttonAvatarSize">
              <img :src="`/images/add.png`" />
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </q-card>
    <q-card flat outlined v-show="showActivity" class="q-mt-md transparent-card-40">
      <q-card-actions align="center">
        <q-btn class="" @click="activityReset" icon="sync" push color="primary"></q-btn>
        <q-space />
        <div class="column items-center justify-center content-center">
          <div class="text-h6">{{ activities[currentActivity].range }}/100</div>
          <div class="text-weight-bolder text-h6">
            {{ activities[currentActivity].name }} Button
          </div>
        </div>
        <q-space />
        <q-btn
          class="q-mr-sm"
          @click="activityMinusRange"
          icon="remove"
          v-touch-repeat:600:300:50.mouse="activityMinusRange"
          push
          color="primary"
        >
        </q-btn>
        <q-btn
          class=""
          @click="activityAddRange"
          v-touch-repeat:600:300:50.mouse="activityAddRange"
          icon="add"
          push
          color="primary"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'

const buttonAvatarSize = '50px'
const $q = useQuasar()

//Emotion scripts
const showEmotion = ref(false)
const currentEmotion = ref(0)
const changeEmotion = (value) => {
  currentEmotion.value = value
  showEmotion.value = true
}
const emotionsAddRange = () => {
  if (emotions[currentEmotion.value].range !== 100) {
    emotions[currentEmotion.value].range++
  }
}
const emotionsMinusRange = () => {
  if (emotions[currentEmotion.value].range !== 0) {
    emotions[currentEmotion.value].range--
  }
}
const emotionReset = () => {
  emotions[currentEmotion.value].range = 0
}

//Activities scripts
const showActivity = ref(false)
const currentActivity = ref(0)
const changeActivity = (value) => {
  currentActivity.value = value
  showActivity.value = true
}

const activityAddRange = () => {
  if (activities[currentActivity.value].range !== 100) {
    activities[currentActivity.value].range++
  }
}
const activityMinusRange = () => {
  if (activities[currentActivity.value].range !== 0) {
    activities[currentActivity.value].range--
  }
}
const activityReset = () => {
  activities[currentActivity.value].range = 0
}

//initialize
const listEmotions = $q.localStorage.getItem('emotions')
const listActivities = $q.localStorage.getItem('activities')
// const initialEmotions = [
//   { name: 'Cheerful', icon: 'cheerful.png', color: 'warning', range: 0 },
//   { name: 'Neutral', icon: 'nuetral.png', color: 'grey', range: 0 },
//   { name: 'Sad', icon: 'sad.png', color: 'blue-grey', range: 0 },
//   { name: 'Angry', icon: 'angry.png', color: 'red', range: 0 },
//   { name: 'Sick', icon: 'sick.png', color: 'purple', range: 0 },
//   { name: 'Anxious', icon: 'anxious.png', color: 'orange', range: 0 },
//   { name: 'Jealous', icon: 'jealous.png', color: 'green', range: 0 },
// ]

const emotions = reactive([
  { name: 'Cheerful', icon: 'cheerful.png', color: 'warning', range: 0 },
  { name: 'Neutral', icon: 'nuetral.png', color: 'grey', range: 0 },
  { name: 'Sad', icon: 'sad.png', color: 'blue-grey', range: 0 },
  { name: 'Angry', icon: 'angry.png', color: 'red', range: 0 },
  { name: 'Sick', icon: 'sick.png', color: 'purple', range: 0 },
  { name: 'Anxious', icon: 'anxious.png', color: 'orange', range: 0 },
  { name: 'Jealous', icon: 'jealous.png', color: 'green', range: 0 },
])

const activities = reactive([
  { name: 'Run', icon: 'running.png', color: 'warning', range: 0 },
  { name: 'Read', icon: 'book.png', color: 'grey', range: 0 },
  { name: 'Art', icon: 'art.png', color: 'blue-grey', range: 0 },
  { name: 'Excercise', icon: 'fitness.png', color: 'red', range: 0 },
  { name: 'Bike', icon: 'bicycle.png', color: 'purple', range: 0 },
  { name: 'Sports', icon: 'sports.png', color: 'orange', range: 0 },
  { name: 'Sleep', icon: 'sleep.png', color: 'green', range: 0 },
])

if (listEmotions) Object.assign(emotions, listEmotions)
if (listActivities) Object.assign(activities, listActivities)

onBeforeUnmount(() => {
  $q.localStorage.setItem('emotions', emotions)
  $q.localStorage.setItem('activities', activities)
})
</script>

<style scoped>
.warning-transparent {
  background: rgba(255, 251, 0, 0.301);
}
.grey-transparent {
  background-color: rgba(71, 71, 71, 0.3);
}
.blue-grey-transparent {
  background-color: rgba(38, 33, 100, 0.3);
}
.red-transparent {
  background-color: rgba(255, 0, 0, 0.3);
}
.purple-transparent {
  background-color: rgba(204, 0, 255, 0.3);
}
.orange-transparent {
  background-color: rgba(255, 174, 0, 0.3);
}
.green-transparent {
  background-color: rgba(0, 255, 0, 0.3);
}
</style>

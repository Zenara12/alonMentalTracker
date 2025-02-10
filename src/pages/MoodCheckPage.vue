<template>
  <q-page class="text-primary q-pa-md" style="position: relative; overflow: hidden">
    <div
      class="text-h4 text-white text-weight-bolder q-mt-lg"
      style="z-index: 2; display: block; position: relative"
    >
      MOOD CHECK
    </div>
    <WaveFill class="wave-background" :wave-fill="waveFillCount" :wave-color="waveColor" />
    <!---Emotions sections-->
    <div style="z-index: 2; display: block; position: relative">
      <q-card class="q-pa-md bg-transparent" flat>
        <div class="text-subtitle1 text-weight-bolder q-py-sm q-px-sm bg-info text-white">
          Emotions
        </div>
        <div class="row q-col-gutter-md q-mt-xs">
          <div v-for="(n, index) in 7" :key="index" class="col-3 text-center">
            <q-btn @click="changeEmotion(index)" round size="md">
              <q-avatar :size="buttonAvatarSize">
                <img :src="`/images/${emotions[n - 1].icon}`" />
              </q-avatar>
            </q-btn>
            <div class="q-mt-sm text-weight-bolder text-subtitle1">
              {{ emotions[n - 1].name }}
            </div>
          </div>
          <div class="col-3 q-mb-sm">
            <q-btn round size="md" @click="extraEmotions = true">
              <q-avatar :size="buttonAvatarSize">
                <img :src="`/images/add.png`" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </q-card>

      <q-card flat outlined v-show="showEmotion" class="q-mt-md transparent-card-40">
        <q-card-actions align="center">
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

      <q-dialog v-model="extraEmotions" backdrop-filter="blur(4px)">
        <q-card class="bg-primary text-white">
          <q-card-section class="row items-center q-pb-none text-h6"> Emotions </q-card-section>

          <q-card-section>
            <div v-for="(n, index) in 5" :key="index" class="col-3 text-center">
              <q-btn @click="sortEmotions(n + 6)" round size="md">
                <q-avatar :size="buttonAvatarSize">
                  <img :src="`/images/${emotions[n + 6].icon}`" />
                </q-avatar>
              </q-btn>
              <div class="q-mt-sm text-weight-bolder text-subtitle1">
                {{ emotions[n + 6].name }}
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!---Activities sections-->
      <q-card class="q-pa-md q-mt-md bg-transparent" flat>
        <div
          class="bg-info text-white text-subtitle1 text-weight-bolder q-py-sm q-px-sm rounded-borders"
        >
          Activities
        </div>
        <div class="row q-col-gutter-md q-mt-xs">
          <div v-for="(n, index) in 7" :key="index" class="col-3 text-center">
            <q-btn
              @click="changeActivity(n - 1)"
              round
              flat
              size="lg"
              :color="activities[n - 1].color"
            >
              <q-avatar :size="buttonAvatarSize">
                <img :src="`/images/${activities[n - 1].icon}`" />
              </q-avatar>
            </q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn round flat size="lg" color="primary" @click="extraActivities = true">
              <q-avatar :size="buttonAvatarSize">
                <img :src="`/images/add.png`" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </q-card>
      <q-card flat outlined v-show="showActivity" class="q-mt-md transparent-card-40">
        <q-card-actions align="center">
          <q-btn @click="activityReset" icon="sync" push color="primary"></q-btn>
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

      <q-dialog v-model="extraActivities" backdrop-filter="blur(4px)">
        <q-card class="bg-primary text-white">
          <q-card-section class="row items-center q-pb-none text-h6"> Emotions </q-card-section>

          <q-card-section>
            <div v-for="(n, index) in 5" :key="index" class="col-3 text-center">
              <q-btn @click="sortActivities(n + 6)" round size="md">
                <q-avatar :size="buttonAvatarSize">
                  <img :src="`/images/${activities[n + 6].icon}`" />
                </q-avatar>
              </q-btn>
              <div class="q-mt-sm text-weight-bolder text-subtitle1">
                {{ activities[n + 6].name }}
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import WaveFill from 'src/components/WaveFill.vue'

const buttonAvatarSize = '50px'
const $q = useQuasar()
const waveFillCount = ref(1000)
const waveColor = ref('blue')

//Emotion scripts
const showEmotion = ref(false)
const extraEmotions = ref(false)
const currentEmotion = ref(0)
const changeEmotion = (value) => {
  currentEmotion.value = value
  showEmotion.value = true
  waveColor.value = emotions[currentEmotion.value].color
  waveCount(emotions[currentEmotion.value].range)
  //console.log(waveFillCount.value)
}
const emotionsAddRange = () => {
  if (emotions[currentEmotion.value].range !== 100) {
    emotions[currentEmotion.value].range++
    waveCount(emotions[currentEmotion.value].range)
  } else {
    $q.notify({
      color: 'white',
      textColor: 'primary',
      position: 'top',
      message: `${emotions[currentEmotion.value].name} Emotion has reach Maximum`,
      timeout: 3000,
    })
  }
}
const emotionsMinusRange = () => {
  if (emotions[currentEmotion.value].range !== 0) {
    emotions[currentEmotion.value].range--
    waveCount(emotions[currentEmotion.value].range)
  }
}
const emotionReset = () => {
  emotions[currentEmotion.value].range = 0
  waveCount(emotions[currentEmotion.value].range)
}

const sortEmotions = (index) => {
  let currentIndexEmotion = emotions[index]
  emotions.splice(index, 1)
  emotions.unshift(currentIndexEmotion)
  extraEmotions.value = false
}

const waveCount = (value) => {
  waveFillCount.value = 1000 - parseInt(value) * 10
}

//Activities scripts
const showActivity = ref(false)
const currentActivity = ref(0)
const extraActivities = ref(false)
const changeActivity = (value) => {
  currentActivity.value = value
  showActivity.value = true
  waveColor.value = 'blue'
  waveCount(activities[currentActivity.value].range)
}

const activityAddRange = () => {
  if (activities[currentActivity.value].range !== 100) {
    activities[currentActivity.value].range++
    waveCount(activities[currentActivity.value].range)
  } else {
    $q.notify({
      color: 'white',
      textColor: 'primary',
      position: 'center',
      message: `${activities[currentActivity.value].name} Activity has reach Maximum`,
      timeout: 3000,
    })
  }
}
const activityMinusRange = () => {
  if (activities[currentActivity.value].range !== 0) {
    activities[currentActivity.value].range--
    waveCount(activities[currentActivity.value].range)
  }
}
const activityReset = () => {
  activities[currentActivity.value].range = 0
  waveCount(activities[currentActivity.value].range)
}

const sortActivities = (index) => {
  let currentIndexAct = activities[index]
  activities.splice(index, 1)
  activities.unshift(currentIndexAct)
  extraActivities.value = false
}

//initialize
const listEmotions = $q.localStorage.getItem('emotions')
const listActivities = $q.localStorage.getItem('activities')
const firstLastEmotions = $q.localStorage.getItem('initialEmo')
const firstLastActivities = $q.localStorage.getItem('initialAct2')

const emotions = reactive([
  { name: 'Cheerful', icon: 'cheerful.png', color: 'green', range: 0 },
  { name: 'Neutral', icon: 'nuetral.png', color: 'orange', range: 0 },
  { name: 'Sad', icon: 'sad.png', color: 'blue-grey', range: 0 },
  { name: 'Angry', icon: 'angry.png', color: 'red', range: 0 },
  { name: 'Sick', icon: 'sick.png', color: 'purple', range: 0 },
  { name: 'Anxious', icon: 'anxious.png', color: 'orange', range: 0 },
  { name: 'Jealous', icon: 'jealous.png', color: 'green', range: 0 },
  { name: 'Bubbly', icon: 'bubbly.png', color: 'yellow', range: 0 },
  { name: 'Stress', icon: 'stress.png', color: 'light-blue', range: 0 },
  { name: 'Confuse', icon: 'confuse.png', color: 'purple', range: 0 },
  { name: 'Dumb', icon: 'dumb.png', color: 'orange', range: 0 },
  { name: 'Fresh', icon: 'fresh.png', color: 'green', range: 0 },
])

const activities = reactive([
  { name: 'Run', icon: 'running.png', color: 'warning', range: 0 },
  { name: 'Read', icon: 'book.png', color: 'grey', range: 0 },
  { name: 'Art', icon: 'art.png', color: 'blue-grey', range: 0 },
  { name: 'Excercise', icon: 'fitness.png', color: 'red', range: 0 },
  { name: 'Bike', icon: 'bicycle.png', color: 'purple', range: 0 },
  { name: 'Sports', icon: 'sports.png', color: 'orange', range: 0 },
  { name: 'Sleep', icon: 'sleep.png', color: 'green', range: 0 },
  { name: 'Hiking', icon: 'hiking.png', color: 'warning', range: 0 },
  { name: 'Camping', icon: 'camping.png', color: 'grey', range: 0 },
  { name: 'Shopping', icon: 'shopping.png', color: 'purple', range: 0 },
  { name: 'Eating', icon: 'food.png', color: 'orange', range: 0 },
  { name: 'GamingG', icon: 'gaming.png', color: 'green', range: 0 },
])

if (firstLastEmotions) {
  if (listEmotions) Object.assign(emotions, listEmotions)
} else {
  $q.localStorage.setItem('initialEmo', true)
}

if (firstLastActivities) {
  if (listActivities) Object.assign(activities, listActivities)
} else {
  $q.localStorage.setItem('initialAct2', true)
}

onBeforeUnmount(() => {
  $q.localStorage.setItem('emotions', emotions)
  $q.localStorage.setItem('activities', activities)
})
</script>

<style scoped>
.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
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

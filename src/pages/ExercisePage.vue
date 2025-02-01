<template>
  <q-page class="relative-position">
    <q-img src="/videos/breathing-exercises-bg.gif" class="fit absolute"></q-img>
    <div class="absolute-full column items-center justify-center q-pa-md">
      <q-img src="/images/bubble.png" spinner-color="primary" width="300px" height="auto">
        <div class="fixed-center text-h3 text-center bg-transparent text-white">
          <div v-if="timeLeft !== 0">
            <div class="text-h3 text-shadow">{{ currentPhase.name }}</div>
            <p>{{ countdown }}s</p>
          </div>
          <div v-else class="text-h4 text-shadow">Done Exercise</div>
          <div class="text-subtitle1">{{ minutes(timeLeft) }}:{{ seconds(timeLeft) }}</div>
        </div>
      </q-img>
      <q-btn
        v-if="timeLeft == 0"
        round
        color="primary"
        icon="arrow_back"
        size="md"
        to="/breathing"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const audioName = ref(route.params.title)
const audioSrc = new Audio(`/audios/${audioName.value}.mp3`)

const playAudio = () => {
  audioSrc.play()
}
playAudio()
const timeLeft = ref(route.params.duration)
const minutes = (timeLeft) => Math.floor(timeLeft / 60)
const seconds = (timeLeft) => (timeLeft % 60).toString().padStart(2, '0')

const technique = new Map([
  [
    '1-Minute',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 4 },
      { name: 'Hold', duration: 4 },
    ],
  ],
  [
    'Focus',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 2 },
      { name: 'Exhale', duration: 4 },
      { name: 'Hold', duration: 2 },
    ],
  ],
  [
    'Sleep',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Exhale', duration: 8 },
    ],
  ],
  [
    'Deep-Relaxation',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Exhale', duration: 8 },
    ],
  ],
  [
    'Anxiety',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Exhale', duration: 8 },
    ],
  ],
  [
    'Stress-Relief',
    [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 6 },
      { name: 'Hold', duration: 2 },
    ],
  ],
])

const currentPhase = ref(technique.get(audioName.value)[0])
const countdown = ref(currentPhase.value.duration)
let phaseIndex = 0

const startBreathingCycle = () => {
  countdown.value -= 1

  if (countdown.value <= 0) {
    // Move to the next phase
    phaseIndex = (phaseIndex + 1) % technique.get(audioName.value).length
    currentPhase.value = technique.get(audioName.value)[phaseIndex]
    countdown.value = currentPhase.value.duration
  }
}

const startTimer = () => {
  if (timeLeft.value > 0) {
    setTimeout(() => {
      timeLeft.value--
      startTimer()
      startBreathingCycle()
    }, 1000)
  }
}

startTimer()

onBeforeUnmount(() => {
  audioSrc.pause()
  audioSrc.currentTime = 0
})

onBeforeRouteLeave(() => {
  audioSrc.pause()
  audioSrc.currentTime = 0
})
</script>

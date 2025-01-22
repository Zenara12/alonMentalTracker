<template>
  <q-page class="relative-position">
    <div class="absolute-full column items-center justify-center q-pa-md">
      <q-img src="/images/bubble.png" spinner-color="primary" width="300px" height="auto">
        <div class="fixed-center text-h3 text-center bg-transparent text-primary">
          <div class="text-h3 text-cyan-7">{{ route.params.title }}</div>
          <div class="text-h4 text-cyan-7">{{ minutes(timeLeft) }}:{{ seconds(timeLeft) }}</div>
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

//console.log(route.params)
const timeLeft = ref(route.params.duration)
const minutes = (timeLeft) => Math.floor(timeLeft / 60)
const seconds = (timeLeft) => (timeLeft % 60).toString().padStart(2, '0')

const startTimer = () => {
  if (timeLeft.value > 0) {
    setTimeout(() => {
      timeLeft.value--
      startTimer()
    }, 1000)
  }
}

startTimer()
</script>

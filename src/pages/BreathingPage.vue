<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">INHALE, EXHALE!</div>
    <div class="text-subtitle1 q-mb-md">BREATHING EXERCISES</div>

    <div class="row q-col-gutter-md">
      <div v-for="exercise in exercises" :key="exercise.name" class="col-6">
        <q-card class="text-center q-pa-md bg-light-blue-2">
          <div class="text-subtitle1">{{ exercise.name }}</div>
          <q-btn
            round
            color="primary"
            icon="play_arrow"
            class="q-mt-sm"
            size="lg"
            @click="startExercise(exercise)"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const exercises = ref([
  { name: '1-Minute', duration: 60 },
  { name: 'Deep Relaxation', duration: 300 },
  { name: 'Focus', duration: 180 },
  { name: 'Anxiety', duration: 240 },
  { name: 'Sleep', duration: 600 },
  { name: 'Stress Relief', duration: 300 },
])

const startExercise = (exercise) => {
  // Implement breathing exercise logic
  console.log(`Starting ${exercise.name} exercise`)
}
</script>

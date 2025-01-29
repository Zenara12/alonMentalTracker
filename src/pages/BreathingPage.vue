<template>
  <q-page class="q-pa-md">
    <!--Breathing Main Display-->
    <div class="text-h4 text-weight-bolder text-white q-mt-xl">INHALE, EXHALE!</div>
    <div class="text-subtitle1 text-weight-bold text-white q-mb-md">BREATHING EXERCISES</div>
    <div class="row q-col-gutter-md">
      <div v-for="exercise in exercises" :key="exercise.name" class="col-6">
        <q-card
          class="text-center q-pa-xs bg-wh transparent-card-40"
          style="border-radius: 2rem"
          bordered
        >
          <div class="text-h6 text-primary q-mt-lg">{{ exercise.name }}</div>
          <q-card-actions align="right">
            <q-btn
              round
              color="primary"
              icon="play_arrow"
              class=""
              size="md"
              @click="startExercise(exercise)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!--Excerise Display-->
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const exercises = ref([
  { name: '1-Minute', duration: 60 },
  { name: 'Deep-Relaxation', duration: 600 },
  { name: 'Focus', duration: 120 },
  { name: 'Anxiety', duration: 120 },
  { name: 'Sleep', duration: 1200 },
  { name: 'Stress-Relief', duration: 300 },
])

const startExercise = (exercise) => {
  // Implement breathing exercise logic
  //console.log(`Starting ${exercise.name} exercise`)
  router.push({
    name: 'exercise',
    params: { title: exercise.name, duration: exercise.duration },
  })
}
</script>

<template>
  <q-page class="relative-position">
    <!-- Content -->
    <div class="absolute-full column items-center justify-center q-pa-md">
      <!-- Welcome Text -->

      <q-img src="/images/bubble.png" spinner-color="primary" width="300px" height="auto">
        <div class="fixed-center text-h3 text-center bg-transparent text-primary">
          <div class="text-h3 text-cyan-7">Hello,</div>
          <div class="text-h4 text-cyan-7">Maya!</div>
        </div>
      </q-img>

      <!-- Mood Board -->
      <q-img
        src="/images/wooden-cork.png"
        class="bottom-center"
        style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%)"
        width="300px"
        height="auto"
      >
      </q-img>
      <q-card
        flat
        class="bg-transparent"
        style="
          position: absolute;
          bottom: 7rem;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: auto;
        "
      >
        <div class="text-center text-white text-subtitle2">HOW ARE YOU FEELING TODAY?</div>
        <q-card-section>
          <div class="row justify-center">
            <q-btn
              v-for="(mood, index) in moods"
              :key="index"
              round
              unelevated
              class="q-mr-sm"
              to="/landing"
            >
              <q-avatar size="30px">
                <img :src="`/images/${mood.url}`" />
              </q-avatar>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
//import { ref } from 'vue'

const moods = [
  { url: 'happy-colored.png' },
  { url: 'sad-colored.png' },
  { url: 'angry-colored.png' },
  { url: 'sick-colored.png' },
  { url: 'embarassed-colored.png' },
]
</script>

<template>
  <q-page class="relative-position">
    <q-img :src="bgImage" class="fit absolute"></q-img>
    <!-- Scattered buttons -->
    <div class="full-height full-width">
      <!-- Top section - Inhale, Exhale -->
      <div v-ripple round class="absolute-position bubble-btn" style="top: 15%; right: 20%">
        <q-img :src="bubbleUrl" style="cursor: pointer" @click="navigateTo('/breathing')">
          <div class="fixed-center bg-transparent text-primary text-h6 text-weight-bold">
            INHALE, EXHALE!
          </div>
        </q-img>
      </div>

      <!-- Middle section - Mood Check -->
      <div v-ripple round class="absolute-position bubble-btn" style="top: 25%; left: 20%">
        <q-img :src="bubbleUrl" style="cursor: pointer" @click="navigateTo('/moodcheck')">
          <div class="fixed-center bg-transparent text-primary text-h6 text-weight-bold">
            MOOD CHECK!
          </div>
        </q-img>
      </div>

      <!-- Bottom section - Spiritual Care -->
      <div v-ripple round class="absolute-position bubble-btn" style="top: 40%; right: 20%">
        <q-img :src="bubbleUrl" style="cursor: pointer" @click="navigateTo('/motivation')">
          <div class="fixed-center bg-transparent text-primary text-h6 text-weight-bold text-wrap">
            MOTIVATION
          </div>
        </q-img>
      </div>

      <!-- Bottom section - Journal -->
      <div v-ripple round class="absolute-position bubble-btn" style="top: 50%; left: 20%">
        <q-img :src="bubbleUrl" style="cursor: pointer" @click="navigateTo('/journal')">
          <div class="fixed-center bg-transparent text-primary text-h6 text-weight-bold">
            JOURNAL
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { reactive, ref } from 'vue'

const router = useRouter()
const $q = useQuasar()

const profile = reactive($q.localStorage.getItem('profile'))

const bgImage = ref(`/videos/${profile.feeling}.gif`)
//console.log(bgImage.value)
const bubbleUrl = '/images/bubble.png'
const navigateTo = (route = 'breathing') => {
  router.push(route)
}
</script>

<style scoped>
.bubble-btn {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  font-size: 1.2rem;
}

/* Make buttons more circular and add some hover effect */
.bubble-btn {
  transition: transform 0.3s ease;
}

.bubble-btn:hover {
  transform: scale(1.05);
}
.text-wrap {
  word-wrap: break-word;
}

/* Use absolute positioning for precise control */
.absolute-position {
  position: absolute;
  z-index: 1;
}
</style>

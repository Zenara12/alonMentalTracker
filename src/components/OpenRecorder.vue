<template>
  <div class="q-pa-md text-center">
    <div v-if="!audioURL">
      <div v-if="isRecording" class="q-mb-md">
        <p class="q-mt-sm">Recording... {{ recordingTime }}s</p>
        <div class="visualizer">
          <div
            v-for="(bar, index) in bars"
            :key="index"
            class="bar"
            :style="{ height: Math.min(bar, 100) + '%' }"
          ></div>
        </div>
      </div>
      <q-card-section>
        <q-btn
          @click="startRecording"
          label="Start Recording"
          color="green"
          :disable="isRecording"
        />
        <q-btn
          @click="stopRecording"
          label="Stop Recording"
          color="red"
          :disable="!isRecording"
          class="q-ml-md"
        />
      </q-card-section>
      <q-card-section>
        <q-btn icon="arrow_back_ios" @click="closeRecorder" color="red" />
      </q-card-section>
    </div>
    <div v-if="audioURL">
      <q-card-section>
        <audio :src="audioURL" controls class="q-mt-md"></audio>
      </q-card-section>
      <q-card-actions align="evenly" class="q-pa-md">
        <q-btn icon="arrow_back_ios" @click="captureBack" color="orange" />
        <q-btn @click="uploadAudio" label="Upload Record" color="green" />
      </q-card-actions>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const mediaRecorder = ref(null)
const audioChunks = ref([])
const audioURL = ref(null)
const recordedAudioFile = ref(null)
const isRecording = ref(false)
const recordingTime = ref(0)
const bars = ref(new Array(20).fill(10))
const stream = ref(null)
let timer = null
let audioContext = null
let analyser = null
let dataArray = null
let audioBlob = null

const emit = defineEmits(['recorderDisplay', 'recordedAudio'])

const startRecording = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.value = new MediaRecorder(stream.value)
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(stream.value)
    analyser = audioContext.createAnalyser()
    source.connect(analyser)
    analyser.fftSize = 32
    dataArray = new Uint8Array(analyser.frequencyBinCount)

    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }

    const date = new Date()

    mediaRecorder.value.onstop = async () => {
      audioBlob = new Blob(audioChunks.value, { type: 'audio/mp3' })
      recordedAudioFile.value = new File([audioBlob], `audio_${date.getTime()}.mp3`, {
        type: 'audio/mp3',
      })
      audioURL.value = URL.createObjectURL(recordedAudioFile.value)
      audioChunks.value = []
      clearInterval(timer)
      recordingTime.value = 0
      stopVisualizer()
    }

    mediaRecorder.value.start()
    isRecording.value = true
    recordingTime.value = 0
    timer = setInterval(() => {
      recordingTime.value++
    }, 1000)
    startVisualizer()
  } catch (error) {
    console.error('Error accessing microphone:', error)
  }
}

const stopRecording = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
    stream.value = null

    if (mediaRecorder.value) {
      mediaRecorder.value.stop()
      isRecording.value = false
      clearInterval(timer)
    }
  }
}

const captureBack = async () => {
  audioURL.value = null
}
const closeRecorder = () => {
  stopRecording()
  emit('recorderDisplay', false)
}

const uploadAudio = () => {
  if (!recordedAudioFile.value) return

  emit('recordedAudio', recordedAudioFile.value)
}

const startVisualizer = () => {
  const updateBars = () => {
    if (analyser) {
      analyser.getByteFrequencyData(dataArray)
      bars.value = dataArray.map((v) => Math.min((v / 255) * 100, 100))
      requestAnimationFrame(updateBars)
    }
  }
  updateBars()
}

const stopVisualizer = () => {
  analyser = null
  dataArray = null
  bars.value = new Array(20).fill(10)
}

onUnmounted(() => {
  stopRecording()
  clearInterval(timer)
})
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.visualizer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  overflow: hidden;
}
.bar {
  width: 5px;
  background-color: red;
  margin: 0 2px;
  transition: height 0.1s ease-in-out;
  max-height: 100%;
}
</style>

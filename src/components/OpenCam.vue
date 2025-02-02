<template>
  <div v-if="!capturedPhotoUrl && !recordedVideoUrl">
    <q-card-section>
      <video ref="videoRef" class="video-preview" autoplay playsinline></video>
      <canvas ref="canvasRef" class="hidden-canvas"></canvas>
    </q-card-section>

    <q-card-actions align="evenly" class="q-pa-md">
      <q-btn icon="close" @click="emit('camDisplay', false)" color="red" />

      <q-btn v-if="isStreamActive" @click="capturePhoto" color="green" icon="camera" />
      <q-btn
        v-if="false"
        @click="startRecording"
        color="blue"
        icon="videocam"
        label="Record Video"
      />
      <q-btn v-if="isRecording" @click="stopRecording" color="red" icon="stop_circle" />
      <q-btn v-if="isStreamActive" @click="switchCamera" color="secondary" icon="flip_camera_ios" />
    </q-card-actions>
  </div>

  <div v-if="capturedPhotoUrl">
    <q-card-section>
      <img :src="capturedPhotoUrl" class="captured-image" />
    </q-card-section>
    <q-card-actions align="evenly" class="q-pa-md">
      <q-btn icon="arrow_back_ios" @click="captureBack" color="orange" />
      <q-btn @click="uploadPhoto" color="teal" icon="upload" label="Upload Photo" />
    </q-card-actions>
  </div>
  <q-card-section v-if="recordedVideoUrl">
    <video :src="recordedVideoUrl" class="captured-video" controls></video>
    <q-btn @click="downloadVideo" color="teal" icon="download" label="Download Video" />
  </q-card-section>
</template>

<script setup>
import { ref, onUnmounted, onMounted, defineEmits } from 'vue'

// Refs
const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)
const isStreamActive = ref(false)
const isRecording = ref(false)
const currentFacingMode = ref('environment')

const capturedPhotoUrl = ref(null)
const capturedPhotoFile = ref(null)

const recordedVideoUrl = ref(null)
const recordedVideoFile = ref(null)

let mediaRecorder = null
let recordedChunks = []

const emit = defineEmits(['capturedImage', 'camDisplay'])

// Camera constraints (Includes Audio)
const getConstraints = (facingMode = 'environment') => ({
  video: { facingMode },
  audio: true,
})

//captureback
const captureBack = async () => {
  capturedPhotoUrl.value = null
  await startCamera()
}

// Start camera
const startCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia(
      getConstraints(currentFacingMode.value),
    )
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
      isStreamActive.value = true
    }
  } catch (error) {
    console.error('Camera error:', error)
  }
}

// Stop camera
const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
    stream.value = null
    isStreamActive.value = false
    if (videoRef.value) {
      videoRef.value.srcObject = null
    }
  }
}

// Switch camera
const switchCamera = async () => {
  currentFacingMode.value = currentFacingMode.value === 'environment' ? 'user' : 'environment'
  if (isStreamActive.value) {
    stopCamera()
    await startCamera()
  }
}

// Capture Photo & Convert to File
const capturePhoto = () => {
  if (!videoRef.value || !canvasRef.value) return

  const canvas = canvasRef.value
  canvas.width = videoRef.value.videoWidth
  canvas.height = videoRef.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)

  const date = new Date()

  canvas.toBlob((blob) => {
    if (blob) {
      capturedPhotoFile.value = new File([blob], `img_photo${date.getTime()}`, {
        type: 'image/png',
      })
      capturedPhotoUrl.value = URL.createObjectURL(capturedPhotoFile.value)

      //console.log(capturedPhotoFile.value)
    }
  }, 'image/png')
  stopCamera()
}

// Download Photo
const uploadPhoto = () => {
  if (!capturedPhotoFile.value) return

  emit('capturedImage', capturedPhotoFile.value)
}

// Start Video Recording
const startRecording = () => {
  if (!stream.value) return

  recordedChunks = []
  mediaRecorder = new MediaRecorder(stream.value, { mimeType: 'video/webm; codecs=vp9,opus' })

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data)
    }
  }

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    recordedVideoFile.value = new File([blob], 'recorded_video.webm', { type: 'video/webm' })
    recordedVideoUrl.value = URL.createObjectURL(recordedVideoFile.value)
  }

  mediaRecorder.start()
  isRecording.value = true
}

// Stop Video Recording
const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

// Download Video
const downloadVideo = () => {
  if (!recordedVideoFile.value) return

  const a = document.createElement('a')
  a.href = URL.createObjectURL(recordedVideoFile.value)
  a.download = recordedVideoFile.value.name
  a.click()
}

onMounted(() => {
  startCamera()
})

// Cleanup on component unmount
onUnmounted(() => {
  stopCamera()
})
</script>

<style scoped>
.camera-container {
  width: 100%;
}

.camera-card {
  width: 100%;
}

.video-preview {
  width: 92dvw;
  height: 82dvh;
  object-fit: cover;
  border-radius: 8px;
}

.hidden-canvas {
  display: none;
}

.captured-image,
.captured-video {
  width: 92dvw;
  height: 82dvh;
  object-fit: cover;
  border-radius: 8px;
}
</style>

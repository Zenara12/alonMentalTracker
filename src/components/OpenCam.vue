<template>
  <div v-if="!capturedPhotoUrl && !recordedVideoUrl">
    <q-card-section>
      <video
        ref="videoRef"
        class="video-preview"
        :class="{ mirror: currentFacingMode === 'user' }"
        autoplay
        playsinline
      ></video>
      <canvas ref="canvasRef" class="hidden-canvas"></canvas>
    </q-card-section>

    <q-card-actions align="evenly" class="q-pa-md">
      <q-btn icon="close" @click="closeCamera" color="red" />

      <q-btn v-if="isPhoto" @click="capturePhoto" color="green" icon="camera" />
      <q-btn v-if="isVideo" @click="startRecording" color="blue" icon="videocam" />
      <q-btn v-if="isRecording" @click="stopRecording" color="red" icon="stop_circle" />
      <q-btn v-if="isStreamActive" @click="switchCamera" color="warning" icon="flip_camera_ios" />
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
  <div v-if="recordedVideoUrl">
    <q-card-section>
      <video :src="recordedVideoUrl" class="captured-video" controls></video>
    </q-card-section>
    <q-card-actions align="evenly" class="q-pa-md">
      <q-btn icon="arrow_back_ios" @click="captureBack" color="orange" />
      <q-btn @click="downloadVideo" color="teal" icon="download" label="Upload Video" />
    </q-card-actions>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted, onBeforeUnmount } from 'vue'

// Refs
const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)
const isStreamActive = ref(false)
const isPhoto = ref(false)
const isVideo = ref(false)
const isRecording = ref(false)
const currentFacingMode = ref('environment')

const capturedPhotoUrl = ref(null)
const capturedPhotoFile = ref(null)

const recordedVideoUrl = ref(null)
const recordedVideoFile = ref(null)

let mediaRecorder = null
let recordedChunks = []
let mirroredStream = null

const emit = defineEmits(['capturedImage', 'camDisplay', 'capturedVideo'])
const { camCategory } = defineProps(['camCategory'])

const closeCamera = () => {
  stopCamera()
  emit('camDisplay', false)
}

// Camera constraints (Includes Audio)
const getConstraints = (facingMode = 'environment') => ({
  video: { facingMode },
  audio: camCategory === 'video' ? true : false,
})

//captureback
const captureBack = async () => {
  capturedPhotoUrl.value = null
  recordedVideoUrl.value = null
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
      if (camCategory === 'photo') isPhoto.value = true
      else if (camCategory === 'video') isVideo.value = true
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

    if (camCategory === 'photo') {
      isPhoto.value = false
    } else if (camCategory === 'video') {
      isVideo.value = false
    }

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
  if (currentFacingMode.value === 'user') {
    // **Flip image horizontally for front camera**
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
  }
  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)

  const date = new Date()

  canvas.toBlob((blob) => {
    if (blob) {
      capturedPhotoFile.value = new File([blob], `img_photo${date.getTime()}`, {
        type: 'image/png',
      })
      capturedPhotoUrl.value = URL.createObjectURL(capturedPhotoFile.value)

      //console.log(capturedPhotoUrl.value)
    }
  }, 'image/png')
  stopCamera()
}

// Download Photo
const uploadPhoto = () => {
  if (!capturedPhotoFile.value) return

  emit('capturedImage', capturedPhotoFile.value)
}

//mirror
const createMirroredStream = async (originalStream) => {
  const canvas = document.createElement('canvas')
  const video = document.createElement('video')
  const ctx = canvas.getContext('2d')

  video.srcObject = originalStream
  await new Promise((resolve) => (video.onloadedmetadata = resolve))
  video.play()

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const stream = canvas.captureStream()
  const videoTrack = stream.getVideoTracks()[0]

  const frameRate = videoTrack.getSettings().frameRate

  setInterval(() => {
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()
  }, 1000 / frameRate)

  const audioTracks = originalStream.getAudioTracks()
  if (audioTracks.length > 0) {
    stream.addTrack(audioTracks[0])
  }

  return stream
}

// Start Video Recording
const startRecording = async () => {
  if (!stream.value) return

  recordedChunks = []
  if (currentFacingMode.value === 'user') {
    mirroredStream = await createMirroredStream(stream.value)
    mediaRecorder = new MediaRecorder(mirroredStream, { mimeType: 'video/webm; codecs=vp9,opus' })
  } else {
    mediaRecorder = new MediaRecorder(stream.value, { mimeType: 'video/webm; codecs=vp9,opus' })
  }

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data)
    }
  }

  const date = new Date()

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    recordedVideoFile.value = new File([blob], `video_${date.getTime()}.webm`, {
      type: 'video/webm',
    })
    recordedVideoUrl.value = URL.createObjectURL(recordedVideoFile.value)
  }

  mediaRecorder.start()
  isRecording.value = true
  isVideo.value = false
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

  emit('capturedVideo', recordedVideoFile.value)
}

onMounted(() => {
  startCamera()
})

// Cleanup on component unmount
onUnmounted(() => {
  stopCamera()
})
onBeforeUnmount(() => {
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

.mirror {
  transform: scaleX(-1);
}
</style>

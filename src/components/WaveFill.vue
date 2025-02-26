<template>
  <div class="wave-container">
    <canvas ref="waveCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const waveCanvas = ref(null)
const { waveFill, waveColor } = defineProps(['waveFill', 'waveColor'])

onMounted(() => {
  const canvas = waveCanvas.value
  const ctx = canvas.getContext('2d')
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)
  let increment = 0

  const drawWave = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = waveColor
    ctx.beginPath()
    ctx.moveTo(0, waveFill)

    for (let i = 0; i < width; i++) {
      ctx.lineTo(i, waveFill + Math.sin(i * 0.02 + increment) * 20)
    }

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    increment += 0.05
    requestAnimationFrame(drawWave)
  }

  drawWave()

  watch(
    () => waveFill,
    () => {
      increment = 0
    },
  )

  watch(
    () => waveColor,
    () => {
      console.log(waveColor)
    },
  )

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    width = canvas.width
  })
})
</script>

<style>
.wave-container {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: center;
}
canvas {
  display: block;
  z-index: 2;
  pointer-events: none;
}
</style>

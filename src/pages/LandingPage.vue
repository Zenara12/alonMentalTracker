<template>
  <q-page class="relative-position" style="height: 100vh">
    <!-- Scattered buttons -->
    <div class="full-height full-width">
      <!-- Top section - Inhale, Exhale -->
      <div class="absolute-position" style="top: 20%; left: 10%">
        <q-btn color="info" label="Inhale, Exhale!" class="bubble-btn glossy" to="/breathing" />
      </div>

      <!-- Middle section - Mood Check -->
      <div class="absolute-position" style="top: 30%; right: 10%">
        <q-btn color="secondary" label="Mood Check!" class="bubble-btn glossy" to="/moodcheck" />
      </div>

      <!-- Bottom section - Spiritual Care -->
      <div class="absolute-position" style="top: 40%; left: 15%">
        <q-btn
          color="primary"
          label="Spiritual Care"
          class="bubble-btn glossy"
          to="/spiritualcare"
        />
      </div>

      <!-- Bottom section - Journal -->
      <div class="absolute-position" style="top: 50%; right: 15%">
        <q-btn color="primary" label="Journal" class="bubble-btn glossy" to="/journal" />
      </div>
    </div>
  </q-page>
</template>

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

/* Ensure the page takes full height */
.q-page {
  min-height: 100vh;
  background: transparent;
}

/* Use absolute positioning for precise control */
.absolute-position {
  position: absolute;
  z-index: 1;
}
</style>

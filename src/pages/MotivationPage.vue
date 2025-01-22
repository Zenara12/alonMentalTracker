<template>
  <q-page class="text-cyan q-pt-lg">
    <section class="q-pa-md">
      <div class="text-h4 text-weight-bolder text-white q-mb-lg">MOTIVATION</div>

      <div class="text-h6 text-weight-bolder text-white q-mb-md">BIBLE VERSES</div>

      <q-card
        v-for="(verse, index) in bibleVerses"
        :key="index"
        class="q-pa-md q-mb-md transparent-card-40"
      >
        <q-card-section>
          <div class="text-center text-weight-bold">{{ verse.text }}</div>
          <div class="text-right">{{ verse.reference }}</div>
        </q-card-section>
      </q-card>

      <div class="text-h6 text-weight-bolder q-mb-md q-mt-lg">AFFIRMATIONS</div>

      <q-card
        v-for="(affirmation, index) in affirmations"
        :key="index"
        class="transparent-card-40 q-pa-md q-mb-md"
      >
        <q-card-section class="text-center text-weight-bold">
          {{ affirmation }}
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
const bibleVerses = [
  {
    text: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
  },
  {
    text: 'With God all things are possible.',
    reference: 'Matthew 19:26',
  },
]

const affirmations = [
  'I am beautiful.',
  'I am loved.',
  'I am enough and worthy.',
  'Embrace your flaws and let your beauty shine.',
]
</script>

<style scoped>
.cursive-font {
  font-family: cursive;
}

.text-cyan-2 {
  background-color: #a5f3fc !important;
}
.text-cyan-3 {
  background-color: #67e8f9 !important;
}
.text-cyan-8 {
  color: #155e75 !important;
}
.text-cyan-9 {
  color: #164e63 !important;
}
</style>

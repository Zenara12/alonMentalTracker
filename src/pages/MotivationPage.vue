<template>
  <q-page class="">
    <section class="q-pa-md">
      <div class="text-h4 q-mb-lg">MOTIVATION</div>

      <div class="text-h6 q-mb-md">BIBLE VERSES</div>

      <q-card
        v-for="(verse, index) in bibleVerses"
        :key="index"
        flat
        class="bg-cyan-2 q-pa-md q-mb-md"
      >
        <q-card-section>
          <div class="text-center text-cyan-9">{{ verse.text }}</div>
          <div class="text-right text-cyan-7">{{ verse.reference }}</div>
        </q-card-section>
      </q-card>

      <div class="text-h6 q-mb-md q-mt-lg">AFFIRMATIONS</div>

      <q-card
        v-for="(affirmation, index) in affirmations"
        :key="index"
        flat
        class="bg-cyan-2 q-pa-md q-mb-md"
      >
        <q-card-section class="text-center text-cyan-9">
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

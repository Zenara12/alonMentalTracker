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
        <q-card-actions align="right">
          <q-btn
            flat
            icon="favorite"
            :color="verse.toggle ? 'info' : 'grey'"
            @click="toggleHeart(index, 'bible')"
            round
            size="md"
          />
        </q-card-actions>
      </q-card>

      <div class="text-h6 text-weight-bolder q-mb-md q-mt-lg">AFFIRMATIONS</div>

      <q-card
        v-for="(affirmation, index) in affirmations"
        :key="index"
        class="transparent-card-40 q-pa-md q-mb-md"
      >
        <q-card-section class="text-center text-weight-bold">
          {{ affirmation.text }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            icon="favorite"
            :color="affirmation.toggle ? 'info' : 'grey'"
            @click="toggleHeart(index, 'affirmation')"
            round
            size="md"
          />
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'

const toggleHeart = (index, section) => {
  if (section === 'bible') {
    bibleVerses[index].toggle = !bibleVerses[index].toggle
  } else if (section === 'affirmation') {
    affirmations[index].toggle = !affirmations[index].toggle
  }
}

const bibleVerses = reactive([
  {
    text: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
    toggle: true,
  },
  {
    text: 'With God all things are possible.',
    reference: 'Matthew 19:26',
    toggle: false,
  },
])

const affirmations = reactive([
  {
    text: 'I am beautiful.',
    toggle: false,
  },
  {
    text: 'I am loved.',
    toggle: true,
  },
  {
    text: 'I am enough and worthy.',
    toggle: true,
  },
  {
    text: 'Embrace your flaws and let your beauty shine.',
    toggle: false,
  },
])
</script>

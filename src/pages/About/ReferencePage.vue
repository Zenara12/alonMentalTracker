<template>
  <q-page class="bg-amber-50">
    <div class="row q-my-md">
      <BackButton />
      <div class="text-white text-h5">References</div>
    </div>

    <div class="q-pa-md">
      <q-card flat bordered class="bg-white">
        <q-card-section>
          <q-list>
            <q-item v-for="(ref, index) in references" :key="index">
              <q-item-section>
                <q-item-label class="text-body1 text-primary">{{ ref.citation }}</q-item-label>
                <q-item-label caption class="text-primary" v-if="ref.link">
                  <a :href="ref.link" target="_blank" class="text-primary">{{ ref.link }}</a>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import BackButton from 'src/components/BackButton.vue'

const references = [
  {
    citation: 'Anonymous. (n.d.). A quote from Secrets of Divine Love.',
    link: 'https://www.goodreads.com/quotes/10990767-what-is-meant-for-you-will-reach-you-even-if',
  },
  {
    citation: 'Anonymous. (n.d.). Famous Quotes on Self-Care and Well-Being.',
    link: 'https://wellbeing.gmu.edu/famous-quotes-on-self-care-and-well-being/',
  },
  {
    citation:
      'Broadwater, A. (2024). 115 Encouraging Bible Verses to Motivate You Throughout the Day.',
    link: 'https://parade.com/living/encouraging-bible-verses',
  },
  {
    citation: 'Fargo, S. (2023). 60+ Self Care Quotes: Inspiration for a Balanced Life.',
    link: 'https://mindfulnessexercises.com/self-care-quotes/',
  },
  {
    citation: 'Mackey, M. (2024). 105 Quotes About Self-Care.',
    link: 'https://parade.com/1070248/maureenmackey/self-care-quotes/',
  },
  {
    citation: 'New American Bible Revised Version. (2011).',
    link: 'https://www.usccb.org/',
  },
  {
    citation: 'Mcdonald, J. N. (2024). 50 Self-Care Quotes To Inspire A New Mindset.',
    link: 'https://www.southernliving.com/culture/self-care-quotes',
  },
  {
    citation: 'Ponio, J. (2023). 100+ Short Bible Verses You Can Easily Remember.',
    link: 'https://laycistercians.com/short-bible-verses/',
  },
  {
    citation: 'Navin, T. (2023). Success Story and Quotes.',
    link: 'https://vocal.media/motivation/success-story-and-quotes',
  },
  {
    citation: 'English Standard Version Bible. (2001).',
    link: 'https://www.biblegateway.com/',
  },
]
</script>

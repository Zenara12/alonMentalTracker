<template>
  <q-page class="text-cyan q-pt-lg">
    <section class="q-pa-md">
      <div class="text-h4 text-weight-bolder text-white q-mb-lg">MOTIVATION</div>

      <div class="text-h6 text-weight-bolder text-white q-mb-md">BIBLE VERSES</div>
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        padding
        arrows
        infinite
        height="200px"
        class="transparent-card-40 rounded-borders"
      >
        <q-carousel-slide
          v-for="(verse, index) in shuffleVerse"
          :key="index"
          class="q-pa-md transparent-card-40"
          :name="index"
        >
          <div class="text-weight-bold text-justify">{{ verse.text }}</div>
          <div class="text-right">~{{ verse.reference }}</div>
          <div class="absolute-bottom-right q-mr-xl q-mb-md">
            <q-btn
              flat
              icon="favorite"
              :color="verse.toggle ? 'accent' : 'grey'"
              @click="toggleHeart(index, 'bible')"
              round
              size="md"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="text-h6 text-weight-bolder q-mb-md q-mt-lg">AFFIRMATIONS</div>
      <q-carousel
        v-model="slide2"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        padding
        arrows
        infinite
        height="200px"
        class="transparent-card-40 rounded-borders"
      >
        <q-carousel-slide
          v-for="(affirmation, index) in shuffleAffirmation"
          :key="index"
          class="q-pa-md transparent-card-40"
          :name="index"
        >
          <div class="text-weight-bold text-justify">{{ affirmation.text }}</div>
          <div class="text-right">~{{ affirmation.reference }}</div>
          <div class="absolute-bottom-right q-mr-xl q-mb-md">
            <q-btn
              flat
              icon="favorite"
              :color="affirmation.toggle ? 'accent' : 'grey'"
              @click="toggleHeart(index, 'affirmation')"
              round
              size="md"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </section>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'

const slide = ref(0)
const slide2 = ref(0)

const toggleHeart = (index, section) => {
  if (section === 'bible') {
    shuffleVerse.value[index].toggle = !shuffleVerse.value[index].toggle
    console.log()
  } else if (section === 'affirmation') {
    shuffleAffirmation.value[index].toggle = !shuffleAffirmation.value[index].toggle
  }
}
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

const bibleVerses = ref([
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
  {
    text: 'There is surely a future hope for you, and your hope will not be cut off.',
    toggle: true,
    reference: 'Proverbs 23:18',
  },
  {
    text: 'But blessed is the one who trusts in the Lord, whose confidence is in him.',
    toggle: false,
    reference: 'Jeremiah 17:7',
  },
  {
    text: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.',
    toggle: true,
    reference: 'Deuteronomy 31:6',
  },
  {
    text: 'Humble yourselves, therefore, under the mighty hand of God so that at the proper time He may exalt you, casting all your anxieties on Him, because He cares for you.',
    toggle: false,
    reference: '1 Peter 5:6-7',
  },
  {
    text: 'I can do all things through him who strengthens me.',
    toggle: true,
    reference: 'Philippians 4:13',
  },
  {
    text: 'God is within her, she will not fall; God will help her at break of day.',
    toggle: false,
    reference: 'Psalm 46:5',
  },
  {
    text: 'For the Spirit God gave us does not make us timid, but gives us power, love, and self-discipline.',
    toggle: true,
    reference: '2 Timothy 1:7',
  },
  {
    text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
    toggle: false,
    reference: 'James 1:5',
  },
  {
    text: 'You do not realize now what I am doing, but later you will understand.',
    toggle: true,
    reference: 'John 13:7',
  },
  {
    text: 'The light shines in the darkness, and the darkness has not overcome it.',
    toggle: false,
    reference: 'John 1:5',
  },
  {
    text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
    toggle: true,
    reference: 'Jeremiah 29:11',
  },
  {
    text: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.',
    toggle: false,
    reference: 'Isaiah 40:31',
  },
  {
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    toggle: true,
    reference: 'Romans 8:28',
  },
  { text: 'The Lord is my shepherd; I shall not want.', toggle: false, reference: 'Psalm 23:1' },
  {
    text: "He replied, 'Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, ‘Move from here to there,’ and it will move. Nothing will be impossible for you.'",
    toggle: true,
    reference: 'Matthew 17:20',
  },
  {
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    toggle: false,
    reference: 'Proverbs 3:5-6',
  },
  { text: 'For we walk by faith, not by sight.', toggle: true, reference: '2 Corinthians 5:7' },
  {
    text: 'Be joyful in hope, patient in affliction, faithful in prayer.',
    toggle: false,
    reference: 'Romans 12:12',
  },
  {
    text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    toggle: true,
    reference: 'Joshua 1:9',
  },
  {
    text: 'Come to me, all you who labor and are burdened, and I will give you rest.',
    toggle: false,
    reference: 'Matthew 11:28',
  },
])
const shuffleVerse = computed(() => shuffleArray([...bibleVerses.value]))

const affirmations = ref([
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
  {
    text: 'The only way to do great work is to love what you do.',
    reference: 'Steve Jobs',
    toggle: true,
  },
  {
    text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    reference: 'Winston Churchill',
    toggle: false,
  },
  {
    text: "Believe you can and you're halfway there.",
    reference: 'Theodore Roosevelt',
    toggle: true,
  },
  {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    reference: 'Eleanor Roosevelt',
    toggle: false,
  },
  {
    text: 'You are never too old to set another goal or to dream a new dream.',
    reference: 'C.S. Lewis',
    toggle: true,
  },
  {
    text: 'It does not matter how slowly you go, as long as you do not stop.',
    reference: 'Confucius',
    toggle: false,
  },
  {
    text: 'Don’t watch the clock; do what it does. Keep going.',
    reference: 'Sam Levenson',
    toggle: true,
  },
  {
    text: 'The only limit to our realization of tomorrow is our doubts of today.',
    reference: 'Franklin D. Roosevelt',
    toggle: false,
  },
  {
    text: 'Do not wait to strike till the iron is hot, but make it hot by striking.',
    reference: 'William Butler Yeats',
    toggle: true,
  },
  {
    text: 'Success is the sum of small efforts, repeated day in and day out.',
    reference: 'Robert Collier',
    toggle: false,
  },
  {
    text: 'What is meant for you, will reach you even if it is beneath two mountains. And what is not meant for you will not reach you even if it’s between your two lips.',
    reference: 'Imam Al-Ghazali',
    toggle: true,
  },
  {
    text: 'People who love themselves come across as very loving, generous, and kind; they express their self-confidence through humility, forgiveness, and inclusiveness.',
    reference: 'Sanaya Roman',
    toggle: false,
  },
  {
    text: 'You are magnificent beyond measure, perfect in your imperfections, and wonderfully made.',
    reference: 'Abiola Abrams',
    toggle: true,
  },
  {
    text: 'Self-love has very little to do with how you feel about your outer self. It’s about accepting all of yourself.',
    reference: 'Tyra Banks',
    toggle: false,
  },
  {
    text: 'The most powerful relationship you will ever have is the relationship with yourself.',
    reference: 'Diane Von Furstenberg',
    toggle: true,
  },
  {
    text: 'Caring for your body, mind, and spirit is your greatest and grandest responsibility. It’s about listening to the needs of your soul and then honoring them.',
    reference: 'Kristi Ling',
    toggle: false,
  },
  {
    text: 'Nourishing yourself in a way that helps you blossom in the direction you want to go is attainable, and you are worth the effort.',
    reference: 'Deborah Day',
    toggle: true,
  },
  {
    text: 'When you recover or discover something that nourishes your soul and brings joy, care enough about yourself to make room for it in your life.',
    reference: 'Jean Shinoda Bolen',
    toggle: false,
  },
  { text: 'Be you, love you. All ways, always.', reference: 'Alexandra Elle', toggle: true },
  {
    text: 'Do something nice for yourself today. Find some quiet, sit in stillness, breathe. Put your problems on pause. You deserve a break.',
    reference: 'Akiroq Brost',
    toggle: false,
  },
  {
    text: 'Self-care is your fuel ... Whatever the road ahead or the path you’ve taken, self-care is what keeps your motor running and your wheels turning.',
    reference: 'Melissa Steginus',
    toggle: true,
  },
  {
    text: 'As important as it is to have a plan for doing work, it is perhaps more important to have a plan for rest, relaxation, self-care, and sleep.',
    reference: 'Akiroq Brost',
    toggle: false,
  },
])

const shuffleAffirmation = computed(() => shuffleArray([...affirmations.value]))
</script>

<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">JOURNAL</div>

    <!-- Journal Cards Grid -->
    <div class="row q-col-gutter-md q-mt-md" v-if="showJournals">
      <div v-for="n in 6" :key="n" class="col-12 col-sm-6" style="width: 50%">
        <q-card class="bg-cyan-2" rounded bordered>
          <q-card-section>
            <div class="text-h6">[TITLE]</div>
            <div class="text-subtitle2">note</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-else>
      <div class="row justify-end q-mb-md">
        <q-btn round flat icon="cancel" color="primary" @click="showJournals = !showJournals" />
      </div>
      <q-card class="q-pa-md bg-light-blue-2">
        <div class="text-h6">Dear diary,</div>
        <q-input v-model="title" label="Title" outlined class="q-mb-md" />
        <q-input v-model="note" type="textarea" label="Note" outlined autogrow />
        <div class="row q-mt-md">
          <q-btn flat round color="primary" icon="edit" />
          <q-btn flat round color="primary" icon="image" />
          <q-btn flat round color="primary" icon="mic" />
          <q-btn flat round color="primary" icon="videocam" />
        </div>
      </q-card>

      <q-card class="q-mt-md q-pa-md bg-light-blue-2">
        <div class="text-subtitle1">3 Things I'm grateful for today</div>
        <q-input
          v-for="n in 3"
          :key="n"
          v-model="gratefulItems[n - 1]"
          :label="`${n}.`"
          outlined
          class="q-mt-sm"
        />
      </q-card>

      <q-card class="q-mt-md q-pa-md bg-light-blue-2">
        <div class="text-subtitle1">Rate your day</div>
        <div class="row justify-center q-mt-sm">
          <q-rating
            v-model="dayRating"
            size="2em"
            color="primary"
            icon="star_border"
            icon-selected="star"
            :max="5"
          />
        </div>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="showJournals">
      <q-btn fab icon="add" color="primary" @click="showJournals = !showJournals" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const note = ref('')
const gratefulItems = ref(['', '', ''])
const dayRating = ref(0)
const showJournals = ref(true)
</script>

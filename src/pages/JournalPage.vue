<template>
  <q-page class="text-white q-pa-md">
    <div class="text-h4 q-mb-lg">JOURNAL</div>

    <!-- Journal Cards Grid -->
    <div class="row q-col-gutter-md q-mt-md" v-if="showJournals">
      <div class="text-h5" v-if="journals.length == 0">.....No Journals Yet</div>
      <div
        v-for="(journal, index) in journals"
        :key="index"
        class="col-12 col-sm-6"
        style="width: 50%"
        @click="showForm(index)"
      >
        <q-card class="transparent-card-60" rounded bordered>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{ journal.title }}</q-item-label>
              <q-item-label caption
                ><q-icon name="star" size="xs" color="yellow" /> {{ journal.dayRating }} -
                {{ formattedDate(journal.dateCreated) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section>
            <div class="text-h6 text-weight-bolder"></div>
            <div class="text-subtitle1">{{ journal.note }}</div>
            <div class="text-subtitle2" v-for="(item, index) in journal.gratefulItems" :key="index">
              {{ item }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="deleteJournal(index)" icon="delete" flat color="primary"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-form v-else>
      <q-card class="q-pa-md transparent-card-60">
        <q-input v-model="journalForm.title" label="Title" outlined class="q-mb-md text-white" />
        <q-input v-model="journalForm.note" type="textarea" label="Note" outlined autogrow />
        <div class="row q-mt-md">
          <q-btn unelevated>
            <q-avatar size="30px">
              <img src="/images/picture.png" />
            </q-avatar>
          </q-btn>
          <q-btn unelevated>
            <q-avatar size="30px">
              <img src="/images/mic.png" />
            </q-avatar>
          </q-btn>
          <q-btn unelevated>
            <q-avatar size="30px">
              <img src="/images/video.png" />
            </q-avatar>
          </q-btn>
        </div>
      </q-card>

      <q-card class="q-mt-md q-pa-md transparent-card-60">
        <div class="text-h6 text-weight-bolder">3 Things I'm grateful for today</div>
        <q-input
          v-for="n in 3"
          :key="n"
          v-model="journalForm.gratefulItems[n - 1]"
          :label="`${n}.`"
          outlined
          class="q-mt-sm"
        />
      </q-card>

      <q-card class="q-mt-md q-pa-md transparent-card-60">
        <div class="text-h6 text-weight-bold">Rate your day</div>
        <div class="row justify-center q-mt-sm">
          <q-rating
            v-model="journalForm.dayRating"
            size="2em"
            color="primary"
            icon="star_border"
            icon-selected="star"
            :max="5"
          />
        </div>
      </q-card>

      <div class="row justify-start q-my-md">
        <q-btn
          class="col-2"
          round
          flat
          size="lg"
          icon="arrow_back"
          color="negative"
          @click="clearForm"
        />
        <q-btn
          size="lg"
          label="SAVE"
          type="button"
          @click="saveJournal"
          color="primary"
          class="col-8"
        />
      </div>
    </q-form>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="showJournals">
      <q-btn fab icon="add" color="primary" @click="showForm('insert')" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const journalDatas = $q.localStorage.getItem('journals')
//const currentDate = new Date()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const crudData = ref('')

const journals = reactive([])

const journalForm = ref({
  title: '',
  note: '',
  gratefulItems: ['', '', ''],
  dayRating: 0,
})

const insertJournal = (journalEntry) => {
  journals.push(journalEntry)
}
const updateJournal = (index, journalEntry) => {
  journals.splice(index, 1, journalEntry)
}

const deleteJournal = (index) => {
  journals.splice(index, 1)
}
const editJournal = (index) => {
  journalForm.value.title = journals[index].title
  journalForm.value.note = journals[index].note
  journalForm.value.gratefulItems = journals[index].gratefulItems
  journalForm.value.dayRating = journals[index].dayRating
  showJournals.value = false
}

const saveJournal = () => {
  const journalEntry = {
    title: journalForm.value.title,
    note: journalForm.value.title,
    gratefulItems: journalForm.value.gratefulItems,
    dayRating: journalForm.value.dayRating,
    dateCreated: new Date(),
  }
  if (crudData.value === 'insert') {
    insertJournal(journalEntry)
  } else {
    updateJournal(crudData.value, journalEntry)
  }

  clearForm()
}

const showForm = (value) => {
  showJournals.value = false
  if (value !== 'insert') {
    editJournal(value)
  }
  crudData.value = value
}

const clearForm = () => {
  journalForm.value.title = ''
  journalForm.value.note = ''
  journalForm.value.gratefulItems = ['', '', '']
  journalForm.value.dayRating = 0
  showJournals.value = true
}

const formattedDate = (date) => {
  const newDate = new Date(date)
  const formatDate = `${months[newDate.getMonth()]}/${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
  return formatDate
}

if (journalDatas) Object.assign(journals, journalDatas)
const showJournals = ref(true)
//console.log(journalDatas)
//console.log(journals)
watch(journals, (value) => {
  $q.localStorage.set('journals', value)
})
</script>

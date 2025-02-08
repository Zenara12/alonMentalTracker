<template>
  <q-page class="text-white q-pa-md">
    <div class="text-h4 text-weight-bolder q-my-lg">JOURNAL</div>

    <!-- Journal Cards Grid -->
    <div class="row q-col-gutter-md q-mt-md" v-if="showJournals">
      <div class="text-h5" v-if="journals.length == 0">.....No Journals Yet</div>
      <div
        v-for="(journal, index) in journals"
        :key="index"
        class="col-12 col-sm-6"
        style="width: 50%"
      >
        <q-card class="transparent-card-60" rounded bordered>
          <q-item @click="noteDisplay(index)">
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{ journal.title }}</q-item-label>
              <q-item-label caption
                ><q-icon name="star" size="xs" color="yellow" /> {{ journal.dayRating }} -
                {{ formattedDate(journal.dateCreated) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card-section @click="noteDisplay(index)">
            <div class="text-subtitle1">{{ journal.note }}</div>
            <q-list dense>
              <q-item
                class="text-subtitle2"
                v-for="(item, index) in journal.gratefulItems"
                :key="index"
              >
                {{ item }}
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="deleteJournal(index)" icon="delete" flat color="primary"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-form v-else class="text-primary">
      <q-card class="q-pa-md transparent-card-40">
        <q-input v-model="journalForm.title" label="Title" outlined class="q-mb-md text-white" />
        <q-input v-model="journalForm.note" type="textarea" label="Note" outlined autogrow />
        <div class="row q-mt-md">
          <!--File Input-->

          <!--File Button-->
          <q-btn rounded unelevated dense @click="openCam('photo')">
            <q-avatar :size="fileIconSize">
              <img src="/images/photo.png" />
            </q-avatar>
          </q-btn>
          <q-btn rounded unelevated dense @click="recorderDisplay = true" class="q-mx-md">
            <q-avatar :size="fileIconSize">
              <img src="/images/mic.png" />
            </q-avatar>
          </q-btn>
          <q-btn rounded unelevated dense @click="openCam('video')">
            <q-avatar :size="fileIconSize">
              <img src="/images/video.png" />
            </q-avatar>
          </q-btn>
        </div>
        <q-list separator bordered>
          <q-item class="q-my-xs" v-for="(file, index) in previewFiles" :key="index">
            <q-item-section>
              <q-img
                v-if="file.type == 'image'"
                :src="file.url"
                fit="scale-down"
                loading="lazy"
                spinner-color="white"
                :ratio="1"
              />
              <q-video
                v-else-if="file.type == 'video'"
                loading="lazy"
                :src="file.url"
                :ratio="16 / 9"
              />
              <div v-else-if="file.type == 'audio'">
                <audio controls>
                  <source :src="file.url" type="audio/mp3" />
                  Your device does not support the audio tag.
                </audio>
              </div>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                flat
                color="red"
                icon="delete"
                @click="deleteCurrentFile(index, 'compiled')"
              ></q-btn>
            </q-item-section>
          </q-item>
          <div v-if="crudData !== 'insert'">
            <q-item class="q-my-xs" v-for="(file, index) in journalFiles.value" :key="index">
              <q-item-section>
                <q-img
                  v-if="file.type == 'image'"
                  :src="file.url"
                  fit="scale-down"
                  loading="lazy"
                  spinner-color="white"
                  :ratio="1"
                />
                <q-video
                  v-else-if="file.type == 'video'"
                  loading="lazy"
                  :src="file.url"
                  :ratio="16 / 9"
                />
                <div v-else-if="file.type == 'audio'">
                  <audio controls>
                    <source :src="file.url" type="audio/mp3" />
                    Your device does not support the audio tag.
                  </audio>
                </div>
              </q-item-section>
              <q-item-section avatar>
                <q-btn
                  flat
                  color="red"
                  icon="delete"
                  @click="deleteCurrentFile(index, 'journal')"
                ></q-btn>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card>

      <q-card class="q-mt-md q-pa-md transparent-card-40">
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

      <q-card class="q-mt-md q-pa-md transparent-card-40">
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

    <q-dialog v-model="displayNote" full-width style="height: auto; text-wrap: balance">
      <q-card class="bg-primary text-white" style="max-width: 300px">
        <q-card-section align="center">
          <div class="text-h6">
            <div class="absolute-top-left text-subtitle1 q-ml-sm q-mt-md q-pa-none">
              <q-icon name="star" color="yellow" />
              {{ journals[currentEditIndex].dayRating }}
            </div>
            <div class="absolute-top-right q-mt-md q-mr-sm text-subtitle2">
              {{ formattedDate(journals[currentEditIndex].dateCreated) }}
            </div>

            {{ journals[currentEditIndex].title }}
          </div>
        </q-card-section>

        <q-card-section>
          {{ journals[currentEditIndex].note }}
        </q-card-section>
        <q-card-section class="col q-pt-none">
          <q-list>
            <q-item v-for="(item, index) in journals[currentEditIndex].gratefulItems" :key="index">
              <q-item-section class="text-subtitle3">
                {{ item }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="(item, index) in journalFiles.value" :key="index">
              <q-item-section>
                <q-img
                  v-if="item.type === 'image'"
                  :src="item.url"
                  fit="scale-down"
                  loading="lazy"
                  spinner-color="white"
                  :ratio="1"
                />
                <q-video
                  v-else-if="item.type === 'video'"
                  loading="lazy"
                  :src="item.url"
                  :ratio="16 / 9"
                />
                <div v-else-if="item.type === 'audio'">
                  <audio controls>
                    <source :src="item.url" type="audio/mp3" />
                    Your device does not support the audio tag.
                  </audio>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat icon="edit" @click="showForm(currentEditIndex)" v-close-popup></q-btn>
          <q-btn flat icon="close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card v-if="camDisplay" class="fullscreen bg-primary q-pa-none">
      <OpenCam
        @captured-image="capturedImage"
        @captured-video="capturedVideo"
        @cam-display="closeCam"
        :cam-category="camCategory"
      />
    </q-card>
    <q-card
      v-if="recorderDisplay"
      class="fullscreen bg-primary q-pa-none column items-center justify-center"
    >
      <OpenRecorder @recorder-display="closeRecorder" @recorded-audio="recordedAudio" />
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="showJournals">
      <q-btn fab icon="add" color="primary" @click="showForm('insert')" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, reactive, watch, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { saveFile, getFiles } from 'src/boot/fileSystem/journal.js'
import OpenCam from 'src/components/OpenCam.vue'
import OpenRecorder from 'src/components/OpenRecorder.vue'

const $q = useQuasar()
const journalDatas = $q.localStorage.getItem('journals')
//const currentDate = new Date()
const displayNote = ref(false)
const currentEditIndex = ref(0)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const crudData = ref('')
const fileIconSize = '2rem'
const journals = reactive([])
const journalFiles = reactive([])

const journalForm = ref({
  title: '',
  note: '',
  gratefulItems: ['', '', ''],
  dayRating: 0,
})

const fileImage = ref(null)
const fileAudio = ref(null)
const fileVideo = ref(null)
const compiledFiles = ref([])
const previewFiles = reactive([])

const camDisplay = ref(false)
const recorderDisplay = ref(false)
const camCategory = ref('photo')

const openCam = (category) => {
  camDisplay.value = true
  camCategory.value = category
}
const closeCam = (value) => {
  camDisplay.value = value
}

const closeRecorder = (value) => {
  recorderDisplay.value = value
}

// const triggerFileInput = (input) => {
//   if (input === 'image') fileImage.value.$el.click()
//   if (input === 'audio') fileAudio.value.$el.click()
//   if (input === 'video') fileVideo.value.$el.click()
// }

// const fileSelected = (newFile) => {
//   compiledFiles.value.push(newFile)
//   //console.log(compiledFiles.value)
// }

const capturedImage = async (imageCaptured) => {
  closeCam(false)
  compiledFiles.value.push(imageCaptured)
  const file = await readFile(imageCaptured)
  previewFiles.push({ url: file, type: 'image' })
  //console.log(compiledFiles.value)
  //console.log(previewFiles)
  // displayFiles()
  // displayFiles()
}

const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const capturedVideo = async (videoCaptured) => {
  closeCam(false)
  compiledFiles.value.push(videoCaptured)
  const file = await readFile(videoCaptured)
  previewFiles.push({ url: file, type: 'video' })
  //console.log(compiledFiles.value)
  //console.log(previewFiles)
  //console.log(imageCaptured)
}

const recordedAudio = async (audio) => {
  closeRecorder(false)
  compiledFiles.value.push(audio)
  const file = await readFile(audio)
  previewFiles.push({ url: file, type: 'audio' })
  //console.log(compiledFiles.value)
  //console.log(previewFiles)
}

const deleteCurrentFile = (index, pointer) => {
  if (pointer === 'compiled') {
    compiledFiles.value.splice(index, 1)
    previewFiles.splice(index, 1)
  } else if (pointer === 'journal') {
    //console.log(journalFiles)
    journalFiles.splice(index, 1)
    journalFiles.value.splice(index, 1)
  }
  // console.log(compiledFiles.value)
  //console.log(previewFiles)
}

const noteDisplay = async (index) => {
  displayNote.value = true
  currentEditIndex.value = index
  journalFiles.splice(0)
  Object.assign(journalFiles, journals[currentEditIndex.value].fileUploads)
  journalFiles.value = await Promise.all(
    journalFiles.map(async (value) => {
      return await getFiles(value)
    }),
  )
  //console.log(journalFiles.value)
}

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

const saveJournal = async () => {
  try {
    let finalFile = []
    let fileUpload = []
    if (compiledFiles.value !== undefined) {
      fileUpload = compiledFiles.value
      if (fileUpload.length > 0) {
        fileUpload = await Promise.all(
          fileUpload.map((value) => {
            return saveFile(value)
          }),
        )
      }
    }
    finalFile = [...fileUpload]
    //console.log(journalFiles)
    if (crudData.value !== 'insert' && journalFiles.value.length > 0) {
      let JournalS = journalFiles.value.map((value) => {
        return value.returnData
      })
      finalFile = [...fileUpload, ...JournalS]
    }

    const journalEntry = {
      title: journalForm.value.title,
      note: journalForm.value.note,
      gratefulItems: journalForm.value.gratefulItems,
      dayRating: journalForm.value.dayRating,
      dateCreated: new Date(),
      fileUploads: finalFile,
    }
    if (crudData.value === 'insert') {
      insertJournal(journalEntry)
    } else {
      updateJournal(crudData.value, journalEntry)
    }
    clearForm()
  } catch (error) {
    console.log('error:', error)
  }
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
  fileImage.value = null
  fileAudio.value = null
  fileVideo.value = null
  compiledFiles.value = []
  previewFiles.splice(0)
  showJournals.value = true
}

const formattedDate = (date) => {
  const newDate = new Date(date)
  const formatDate = `${months[newDate.getMonth()]}/${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
  return formatDate
}

if (journalDatas) Object.assign(journals, journalDatas)
const showJournals = ref(true)

// const displayFiles = async () => {
//   let updatedFiles = compiledFiles.value

//   await Promise.all(
//     updatedFiles.map(async (value) => {
//       value.url = await readFile(value)
//     }),
//   )
//   console.log(updatedFiles)

//   compiledFiles.value = updatedFiles
// }
// watchEffect(async () => {
//   //let updatedFiles = compiledFiles.value
//   await Promise.all(
//     compiledFiles.value.map(async (value) => {
//       value.url = await readFile(value)
//     }),
//   )
//   console.log(compiledFiles.value)

//   //compiledFiles.value = updatedFiles
// })

watch(journals, (value) => {
  $q.localStorage.set('journals', value)
})

onBeforeMount(() => {
  // Clean up blob URLs
  journalFiles.forEach((file) => {
    if (file.type === 'video' && file.url) {
      URL.revokeObjectURL(file.url)
    }
  })
})
</script>

<style scoped>
audio {
  width: 15rem;
}
</style>

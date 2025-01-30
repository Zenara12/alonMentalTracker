<template>
  <q-page class="q-pa-md text-cyan">
    <!-- Header -->
    <div>
      <div class="text-h5 text-white q-mt-sm">PROFILE</div>
    </div>

    <!-- Profile Card -->
    <div class="row justify-center q-mt-md">
      <div class="col-12 col-sm-8 col-md-6">
        <q-card class="transparent" flat>
          <!-- Profile Image -->
          <q-card-section class="text-center q-pt-xl">
            <q-avatar size="120px">
              <q-img
                :src="profilePic.url"
                ratio="1"
                loading="lazy"
                spinner-color="primary"
                placeholder-src="/images/picture.png"
              >
                <template v-slot:loading>
                  <div class="text-grey-8 text-center q-pa-md">Loading...</div>
                </template>
                <div class="absolute-bottom-right text-subtitle2 bg-transparent">
                  <q-btn
                    icon="edit"
                    color="primary"
                    outline
                    dense=""
                    round
                    @click="showPicUpload = true"
                  />
                </div>
              </q-img>
            </q-avatar>
            <div class="text-h6 text-weight-bold">
              <div class="text-h6 text-weight-bold cursor-pointer">
                {{ profile.name }}
                <q-popup-edit
                  v-model="profile.name"
                  :validate="(val) => val.length > 0"
                  v-slot="scope"
                >
                  <q-input
                    autofocus
                    dense
                    v-model="scope.value"
                    :model-value="scope.value"
                    hint="Your Name"
                    :rules="[(val) => scope.validate(val) || 'Please fill with your name']"
                  >
                    <template v-slot:after>
                      <q-btn
                        flat
                        dense
                        color="negative"
                        icon="cancel"
                        @click.stop.prevent="scope.cancel"
                      />

                      <q-btn
                        flat
                        dense
                        color="positive"
                        icon="check_circle"
                        @click.stop.prevent="scope.set"
                        :disable="
                          scope.validate(scope.value) === false ||
                          scope.initialValue === scope.value
                        "
                      />
                    </template>
                  </q-input>
                </q-popup-edit>
              </div>
            </div>
          </q-card-section>
          <q-dialog v-model="showPicUpload" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-file
                  v-model="picture"
                  label="Select a file/photo"
                  filled
                  outlined
                  accept="image/*,"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <div v-if="picture != null" class="q-mt-md text-green">
                  <q-icon name="check_circle" color="green" />
                  File Saved: {{ picture.value }}
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup @click="resetUploader" />
                <q-btn
                  flat
                  label="Save"
                  color="primary"
                  v-close-popup
                  :disable="!picture"
                  @click="uploadFile"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Profile Form -->
          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-40">
            <div class="text-h6 text-weight-bold">Age:{{ profile.age }}</div>
          </q-card-section>

          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-40">
            <div class="text-h6 text-weight-bold">Birthday:</div>
            <q-input filled v-model="profile.birthday" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="profile.birthday">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-40">
            <div class="text-h6 text-weight-bold cursor-pointer">
              Email:{{ profile.email }}
              <q-popup-edit
                v-model="profile.email"
                :validate="(val) => regex.test(val)"
                v-slot="scope"
              >
                <q-input
                  autofocus
                  dense
                  v-model="scope.value"
                  :model-value="scope.value"
                  hint="Your email"
                  :rules="[(val) => scope.validate(val) || 'Must be a valid email']"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      dense
                      color="negative"
                      icon="cancel"
                      @click.stop.prevent="scope.cancel"
                    />

                    <q-btn
                      flat
                      dense
                      color="positive"
                      icon="check_circle"
                      @click.stop.prevent="scope.set"
                      :disable="
                        scope.validate(scope.value) === false || scope.initialValue === scope.value
                      "
                    />
                  </template>
                </q-input>
              </q-popup-edit>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, watch, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { saveFile, getFiles } from 'src/boot/fileSystem/profilePic.js'

const $q = useQuasar()
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const currentDate = new Date()
const profileData = reactive($q.localStorage.getItem('profile'))
const profilePic = ref({ name: '', path: '', url: null })
const showPicUpload = ref(false)
const picture = ref(null)

const profile = reactive({
  name: profileData.name,
  age: profileData.age,
  birthday: profileData.birthday,
  email: profileData.email,
  feeling: profileData.feeling,
})

const resetUploader = () => {
  picture.value = null
  showPicUpload.value = false
}

const fetchSavedFiles = async () => {
  profilePic.value = await getFiles()
}

const uploadFile = async () => {
  if (!picture.value) {
    alert('No file selected!')
    return
  }

  try {
    await saveFile(picture.value)
    fetchSavedFiles()
  } catch (error) {
    alert('Failed to save file.' + error)
  }
}

onMounted(fetchSavedFiles)

watch(profile, (value) => {
  const birthDate = new Date(value.birthday)
  let userAge = currentDate.getFullYear() - birthDate.getFullYear()
  if (currentDate.getMonth() < birthDate.getMonth()) {
    userAge--
  } else if (currentDate.getMonth() == birthDate.getMonth()) {
    if (currentDate.getDate() <= birthDate.getDate()) {
      userAge--
    }
  }
  value.age = userAge
  $q.localStorage.set('profile', value)
})
</script>

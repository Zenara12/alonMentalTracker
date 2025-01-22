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
            <q-avatar size="120px" borderd>
              <q-img src="/images/picture.png" ratio="1" loading="lazy" spinner-color="primary">
                <template v-slot:loading>
                  <div class="text-grey-8 text-center q-pa-md">Loading...</div>
                </template>
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

          <!-- Profile Form -->
          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-60">
            <div class="text-h6 text-weight-bold">Age:{{ profile.age }}</div>
          </q-card-section>

          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-60">
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

          <q-card-section class="q-pa-sm q-ma-md rounded transparent-card-60">
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
import { reactive, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const currentDate = new Date()
const profileData = $q.localStorage.getItem('profile')

const profile = reactive({
  name: profileData.name,
  age: profileData.age,
  birthday: profileData.birthday,
  email: profileData.email,
})

//console.log(profileData)

watch(profile, (value) => {
  const birthDate = new Date(value.birthday)
  value.age = currentDate.getFullYear() - birthDate.getFullYear()
  if (currentDate.getMonth() < birthDate.getMonth()) {
    value.age--
  } else if (currentDate.getMonth() == birthDate.getMonth()) {
    if (currentDate.getDate() <= birthDate.getDate()) {
      value.age--
    }
  }
  $q.localStorage.set('profile', value)
})
</script>

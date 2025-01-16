<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div>
      <div class="text-h5 q-mt-sm">PROFILE</div>
    </div>

    <!-- Profile Card -->
    <div class="row justify-center q-mt-md">
      <div class="col-12 col-sm-8 col-md-6">
        <q-card class="bg-cyan-2" rounded bordered>
          <!-- Profile Image -->
          <q-card-section class="text-center q-pt-xl">
            <q-avatar size="120px">
              <q-img
                src="/api/placeholder/400/320"
                ratio="1"
                loading="lazy"
                spinner-color="primary"
              >
                <template v-slot:loading>
                  <div class="text-grey-8 text-center q-pa-md">Loading...</div>
                </template>
              </q-img>
            </q-avatar>
          </q-card-section>

          <!-- Profile Form -->
          <q-card-section class="q-px-lg">
            <q-form class="q-gutter-md">
              <q-input v-model="profile.name" label="NAME" filled bg-color="white" dense />
              <q-input v-model="profile.age" label="AGE" filled bg-color="white" dense />
              <q-input v-model="profile.birthday" label="BIRTHDAY" filled bg-color="white" dense />
              <q-input
                v-model="profile.email"
                label="EMAIL"
                type="email"
                filled
                bg-color="white"
                dense
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  name: '',
  age: '',
  birthday: '',
  email: '',
})
</script>

<template>
  <q-page class="column flex flex-center q-pa-sm">
    <q-icon name="account_circle" size="8rem" color="primary" class="flex-center q-pa-md" />
    <q-form @submit="onSubmit" @reset="onReset" class="q-pa-md">
      <q-input
        rounded
        outlined
        v-model="Username"
        label="Username"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please Enter Username']"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="Password"
        label="Password"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please Enter Password']"
      />

      <div class="flex flex-center">
        <q-btn
          label="Forgot Password?"
          type="button"
          flat
          class="text-sm"
          size="sm"
          color="primary"
        />
      </div>
      <div class="flex flex-center q-pa-md">
        <q-btn rounded label="Sign-in" type="submit" color="primary" size="lg" />
        <q-btn
          label="Sign-up"
          type="button"
          flat
          class="text-sm"
          size="lg"
          color="primary"
          to="/registration"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const Username = ref(null)
const Password = ref(null)

function onSubmit() {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
  })
  setTimeout(() => {
    router.push('/landing')
  }, 1500)
}

function onReset() {
  Username.value = null
  Password.value = null
}
</script>

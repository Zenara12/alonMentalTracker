<template>
  <q-page class="column flex flex-center q-pa-sm">
    <!-- <q-icon name="person" size="8rem" color="primary" class="flex-center q-pa-md" />
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-input
        rounded
        outlined
        v-model="fullName"
        label="FullName"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please Enter FullName']"
      />
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

      <div class="flex flex-center q-pa-md">
        <q-btn
          outline
          rounded
          label="Sign-up"
          type="submit"
          class="text-sm"
          size="lg"
          color="primary"
        />
      </div>
    </q-form> -->
    <div class="q-pa-md">
      <div class="text-h4 text-primary text-center" style="position: relative">
        <q-img src="/images/turtle.png" class="top-right-image" />
        <p>Hi I'm Alon, and you are?</p>
      </div>
      <q-input
        rounded
        standout
        type="text"
        bg-color="cyan-2"
        color="primary"
        label="Type Your Name Here"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please fill your name']"
      >
        <template v-slot:after>
          <q-btn round dense flat color="primary" icon="send" @click="registerUser" />
        </template>
      </q-input>

      <div class="text-h4 text-primary text-center" style="position: relative">
        <q-img src="/images/crab-up.png" class="bottom-left-image" />
      </div>
    </div>
    <q-img src="/images/blue-star.png" class="bottom-right-image" />
  </q-page>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// const fullName = ref(null)
// const Username = ref(null)
// const Password = ref(null)

// function onSubmit() {
//   // $q.notify({
//   //   color: 'green-4',
//   //   textColor: 'white',
//   //   icon: 'cloud_done',
//   //   message: 'Submitted',
//   // })
//   router.push('/')
// }

const registerUser = () => {
  router.push('/feeling')
}
</script>

<style scoped>
.top-right-image {
  position: absolute;
  top: -2rem;
  right: 0;
  width: 50px; /* Adjust the size of the image as needed */
  height: auto; /* Maintain aspect ratio */
}
.bottom-left-image {
  position: absolute;
  bottom: -2rem;
  left: 0;
  width: 50px; /* Adjust the size of the image as needed */
  height: auto; /* Maintain aspect ratio */
}

.bottom-right-image {
  position: absolute;
  bottom: 0rem;
  right: 0;
  width: 10rem; /* Adjust the size of the image as needed */
  height: auto; /* Maintain aspect ratio */
}
</style>

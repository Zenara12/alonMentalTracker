<template>
  <q-page padding class="flex content-center items-center justify-center">
    <!-- content -->
    <q-img
      class=""
      :src="alonLogo"
      spinner-color="white"
      style="height: 140px; max-width: 200px"
      :ratio="16 / 9"
    />
    <q-linear-progress dark query color="cyan" class="q-mt-sm" />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
const alonLogo = '/images/alonBlue.png'

const $q = useQuasar()
const router = useRouter()
//

onMounted(() => {
  const profile = $q.localStorage.getItem('profile')
  setTimeout(() => {
    if (profile) router.push('/feeling')
    else router.push('/register')
  }, 4000)
})
</script>

<template>
  <q-btn flat @click="backButton">
    <q-icon left size="2em" name="arrow_back" color="white" />
  </q-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backButton = () => {
  router.go(-1)
}
</script>

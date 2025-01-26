<template>
  <q-layout view="hHh lpR lFf">
    <q-img src="/images/alonbg.png" class="fit absolute" />
    <q-header style="background-color: transparent">
      <q-toolbar>
        <q-toolbar-title @click="home">
          <q-img
            src="/images/alon-logo128x128.png"
            loading="lazy"
            spinner-color="white"
            height="50px"
            style="max-width: 150px"
          />
        </q-toolbar-title>
        <q-btn flat dense round icon="menu" v-show="showMenu">
          <q-menu
            flat
            anchor="bottom left"
            self="top left"
            :offset="[0, 10]"
            transition-show="slide-down"
            transition-duration="600"
            auto-close
          >
            <q-list color="primary">
              <q-item
                clickable
                v-close-popup
                color="primary"
                v-for="(item, index) in menuList"
                :key="index"
                :to="item.navigate"
              >
                <q-item-section avatar>
                  <q-icon color="primary" :name="item.icon" />
                </q-item-section>
                <q-item-section class="text-primary">{{ item.title }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { useBackButton } from 'src/backButtonHandler'

const router = useRouter()
const route = useRoute()
const showMenu = ref(true)

useBackButton()

onMounted(() => {
  showMenu.value = route.path != '/' && route.path != '/registration' ? true : false
})

//check if index or not
watch(
  () => route.path,
  (newPath) => {
    showMenu.value = newPath != '/' && newPath != '/registration' ? true : false
    //console.log(`Navigated from ${oldPath} to ${newPath}`)
  },
)

//function to route  home
const home = () => {
  router.push('/landing')
}

const menuList = [
  {
    title: 'Health Hotlines',
    icon: 'connect_without_contact',
    navigate: 'healthhotlines',
  },
  {
    title: 'Help Center',
    icon: 'help',
    navigate: 'helpcenter',
  },
  {
    title: 'Settings',
    icon: 'settings',
    navigate: 'settings',
  },
  {
    title: 'About',
    icon: 'info',
    navigate: 'about',
  },
]
</script>

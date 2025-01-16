<template>
  <q-page class="">
    <section class="q-pa-md">
      <div class="text-h4 q-mb-lg">HEALTH HOTLINES</div>

      <q-card
        v-for="(hotline, index) in hotlines"
        :key="index"
        flat
        class="bg-cyan-2 q-pa-md q-mb-md text-center"
      >
        <q-card-section>
          <div class="text-cyan-9 text-bold text-h6">{{ hotline.name }}</div>
          <div
            v-for="(number, nIndex) in hotline.numbers"
            :key="nIndex"
            class="text-cyan-8 text-subtitle1"
          >
            {{ number }}
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
const hotlines = [
  {
    name: 'PH EMERGENCY HOTLINE',
    numbers: ['911'],
  },
  {
    name: 'PHILIPPINE RED CROSS',
    numbers: ['143'],
  },
  {
    name: 'ANTIPOLO CITY EMERGENCY HOTLINE:',
    numbers: ['8696-9911', '0927-7559911'],
  },
  {
    name: 'NATIONAL CENTER FOR MENTAL HEALTH CRISIS:',
    numbers: ['1800-1888-1553'],
  },
  {
    name: 'IN TOUCH: CRISIS',
    numbers: ['+63919-056-0709', '+63917-800-1123', '+63922-893-8944'],
  },
]
</script>

<style scoped>
.cursive-font {
  font-family: cursive;
}

.text-cyan-2 {
  background-color: #a5f3fc !important;
}
.text-cyan-3 {
  background-color: #67e8f9 !important;
}
.text-cyan-8 {
  color: #155e75 !important;
}
.text-cyan-9 {
  color: #164e63 !important;
}
</style>

<template>
  <q-page class="text-cyan">
    <section class="q-pa-md">
      <div class="text-h4 text-white q-mb-lg">HEALTH HOTLINES</div>

      <q-card
        v-for="(hotline, index) in hotlines"
        :key="index"
        class="transparent-card-40 q-pa-md q-mb-md text-center"
      >
        <q-card-section>
          <div class="text-weight-bold text-h6">{{ hotline.name }}</div>
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
</style>

<template>
  <q-page class="bg-amber-50">
    <div class="row items-center q-my-md">
      <q-btn icon="arrow_back" flat to="/landing" />
      <div class="text-h4 text-white">ABOUT</div>
    </div>

    <q-list bordered class="rounded-borders bg-white q-mt-md q-mx-sm">
      <q-item clickable v-ripple to="/about-alon">
        <q-item-section>
          <q-item-label class="text-primary">About ALON</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/terms">
        <q-item-section>
          <q-item-label class="text-primary">Terms of Use</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/privacy">
        <q-item-section>
          <q-item-label class="text-primary">Privacy Policy</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/references">
        <q-item-section>
          <q-item-label class="text-primary">References</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

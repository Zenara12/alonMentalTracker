<template>
  <q-page class="q-py-xl text-cyan">
    <!-- Page Content -->
    <div class="q-pa-md">
      <div class="text-h4 text-white q-mb-lg">HELP CENTER</div>

      <!-- FAQ Section -->
      <q-expansion-item
        expand-separator
        header-class="rounded-borders q-mb-sm bg-white"
        class="q-mb-md"
      >
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6 text-cyan">FAQs</q-item-label>
          </q-item-section>
        </template>

        <q-card class="bg-cream">
          <q-card-section>
            <q-list padding>
              <!-- What is ALON? -->
              <q-expansion-item
                v-for="(helpcenter, index) in helpcenterFAQS"
                :key="index"
                group="faq"
                :label="helpcenter.title"
                header-class="text-weight-bold text-cyan"
              >
                <q-card>
                  <q-card-section class="text-cyan text-subtitle1">
                    {{ helpcenter.description }}</q-card-section
                  >
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script setup>
const helpcenterFAQS = [
  {
    title: `What is ALON?`,
    description: `ALON is a multifunctional self-care app that monitors and aids its users in
                    improving their mental, emotional, and spiritual well-being. ALON provides
                    support to those people who are struggling with their mental health.`,
  },
  {
    title: `What made you start ALON?`,
    description: `ALON was initially created for senior high school students due to the prevailing
                    issues in their mental health. We decided to build this application to promote
                    and spread awareness of the importance of mental health and to make self-care
                    accessible to students.`,
  },
  {
    title: `Why is it called ALON?`,
    description: `ALON is a Tagalog word for "wave" which we associate with the emotions of
                    people. Just like waves, the emotions of people fluctuate up and down depending
                    on their intensity. Sometimes it is calm and peaceful, but there are also times
                    when it is strong and intense.`,
  },
]
</script>

<template>
  <q-page class="q-py-xl text-cyan">
    <!-- Page Content -->
    <div class="q-pa-md">
      <div class="text-h4 text-white q-mb-lg">HELP CENTER</div>

      <!-- FAQ Section -->
      <q-expansion-item
        expand-separator
        header-class="bg-white rounded-borders q-mb-sm"
        class="q-mb-md"
      >
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6">FAQs</q-item-label>
          </q-item-section>
        </template>

        <q-card class="bg-cream">
          <q-card-section>
            <q-list padding>
              <!-- What is ALON? -->
              <q-expansion-item group="faq" label="What is ALON?" header-class="text-weight-bold">
                <q-card>
                  <q-card-section>
                    ALON is a multifunctional self-care app that monitors and aids its users in
                    improving their mental, emotional, and spiritual well-being. ALON provides
                    support to those people who are struggling with their mental health.
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- What made you start ALON? -->
              <q-expansion-item
                group="faq"
                label="What made you start ALON?"
                header-class="text-weight-bold"
              >
                <q-card>
                  <q-card-section>
                    ALON was initially created for senior high school students due to the prevailing
                    issues in their mental health. We decided to build this application to promote
                    and spread awareness of the importance of mental health and to make self-care
                    accessible to students.
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Why is it called ALON? -->
              <q-expansion-item
                group="faq"
                label="Why is it called ALON?"
                header-class="text-weight-bold"
              >
                <q-card>
                  <q-card-section>
                    ALON is a Tagalog word for "wave" which we associate with the emotions of
                    people. Just like waves, the emotions of people fluctuate up and down depending
                    on their intensity. Sometimes it is calm and peaceful, but there are also times
                    when it is strong and intense.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </q-page>
</template>

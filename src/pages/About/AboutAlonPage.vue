<template>
  <q-page class="bg-amber-50">
    <div class="row q-my-md">
      <q-btn flat icon="arrow_back" to="/about" />
      <div class="text-white text-h5">About ALON</div>
    </div>

    <div class="q-pa-sm">
      <q-card flat bordered class="bg-white text-cyan">
        <q-card-section>
          <p class="text-body1 q-mb-lg">
            ALON is a multifunctional self-care application designed to support the mental,
            emotional, and spiritual well-being of senior high school students. As mental health
            concerns such as stress, anxiety, and depression continue to affect students worldwide,
            this application provides a convenient and accessible way for students at Our Lady of
            Peace School, Inc. to manage their well-being.
          </p>

          <p class="text-body1 q-mb-lg">
            In today's fast-paced academic environment, students often struggle to find time for
            self-care, and traditional methods of mental health support are not always easily
            accessible. ALON was developed to fill this gap by offering a comprehensive suite of
            self-care tools, available anytime and anywhere, right at their fingertips.
          </p>

          <div class="text-h6 q-mb-md">Key Features</div>
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan">Mood Tracker</q-item-label>
                <q-item-label caption class="text-cyan"
                  >Monitor and track emotional state, helping better understand mood patterns and
                  manage stress or anxiety effectively.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan">Journaling</q-item-label>
                <q-item-label caption class="text-cyan"
                  >A safe space for reflection on daily experiences and emotions through text,
                  images, videos, or voice recordings.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan"
                  >Breathing Exercises</q-item-label
                >
                <q-item-label caption class="text-cyan"
                  >Guided techniques to help alleviate stress, calm minds, and improve
                  focus.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan"
                  >Motivational Affirmations</q-item-label
                >
                <q-item-label caption class="text-cyan"
                  >Personalized, positive affirmations to boost self-esteem and build a positive
                  mindset.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan">Health Hotlines</q-item-label>
                <q-item-label caption class="text-cyan"
                  >Direct access to immediate, confidential support from trained
                  professionals.</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-medium text-cyan"
                  >Reminders for Self-Care</q-item-label
                >
                <q-item-label caption class="text-cyan"
                  >Medication, water intake, and activity reminders to maintain a balanced
                  lifestyle.</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
          <div>
            This app is built with the needs of senior high school students in mind, offering an
            easy-to-use interface, accessible features, and customized support. ALON not only aims
            to improve students' emotional well-being but also strives to raise awareness about the
            importance of overall well-being.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

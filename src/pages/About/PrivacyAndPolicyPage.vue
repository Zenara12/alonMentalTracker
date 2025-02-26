<script setup>
import BackButton from 'src/components/BackButton.vue'

const ulClass = 'text-subtitle1'
</script>

<template>
  <q-page class="bg-amber-50">
    <div class="row q-my-md">
      <BackButton />
      <div class="text-white text-h5">Privacy and Policy</div>
    </div>

    <div class="q-pa-md text-justify">
      <q-card flat bordered class="bg-white text-cyan">
        <q-card-section>
          <p class="text-body1 q-mb-md">
            At ALON, we prioritize the privacy and security of your personal data. This Privacy
            Policy explains how we collect, use, disclose, and protect your information when you use
            our multifunctional self-care application.
          </p>

          <div class="text-h6 q-mt-lg q-mb-md">1. Information We Collect</div>
          <div class="text-subtitle1 q-mb-sm">Personal Data</div>
          <p class="text-body1 q-mb-md">When you use our application, we may ask you to provide:</p>
          <ul :class="ulClass">
            <li>Name</li>
            <li>Age</li>
            <li>Birthday</li>
          </ul>

          <div class="text-subtitle1 q-mt-md q-mb-sm">Health-Related Data</div>
          <p class="text-body1 q-mb-md">As a self-care app, we may collect:</p>
          <ul :class="ulClass">
            <li>Mood tracking entries</li>
            <li>Journal entries</li>
            <li>Activity logs</li>
          </ul>

          <div class="text-h6 q-mt-lg q-mb-md">2. How We Use Your Information</div>
          <ul :class="ulClass">
            <li>To provide and maintain the functionality of the application</li>
            <li>To personalize and improve your experience</li>
            <li>To send relevant updates and notifications</li>
            <li>To communicate regarding your account or feedback</li>
          </ul>

          <div class="text-h6 q-mt-lg q-mb-md">3. Data Security</div>
          <p class="text-body1 q-mb-md">
            We implement reasonable physical, electronic, and administrative measures to protect
            your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <div class="text-h6 q-mt-lg q-mb-md">Contact Us</div>
          <p class="text-body1">For questions or concerns, contact us at:</p>
          <ul :class="ulClass">
            <li>labeosamantha@gmail.com</li>
            <li>ymabeacalapano@gmail.com</li>
            <li>deannequiteves@gmail.com</li>
            <li>ivantapales12@gmail.com</li>
          </ul>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

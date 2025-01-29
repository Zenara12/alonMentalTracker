const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'registration', component: () => import('pages/RegistrationPage.vue') },
      { path: 'landing', component: () => import('pages/LandingPage.vue') },
      { path: 'moodcheck', component: () => import('pages/MoodCheckPage.vue') },
      { path: 'breathing', component: () => import('pages/BreathingPage.vue') },
      { path: 'motivation', component: () => import('src/pages/MotivationPage.vue') },
      { path: 'journal', component: () => import('pages/JournalPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'healthhotlines', component: () => import('pages/HealthHotlinesPage.vue') },
      { path: 'helpcenter', component: () => import('pages/HelpCenterPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'about-alon', component: () => import('pages/About/AboutAlonPage.vue') },
      { path: 'terms', component: () => import('pages/About/TermsOfUsePage.vue') },
      { path: 'privacy', component: () => import('pages/About/PrivacyAndPolicyPage.vue') },
      { path: 'references', component: () => import('pages/About/ReferencePage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'feeling', component: () => import('pages/FeelingPage.vue') },
      {
        path: 'exercise/:title/:duration/:rname',
        name: 'exercise',
        component: () => import('pages/ExercisePage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

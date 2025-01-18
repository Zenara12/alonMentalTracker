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
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'feeling', component: () => import('pages/FeelingPage.vue') },
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

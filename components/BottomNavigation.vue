<template>
    <!-- Bottom Navigation -->
  <v-bottom-navigation
    v-model="bottomNav"
    fixed
    grow
    class="bottom-nav"
  >
    <v-btn
      v-for="link in linking"
      :key="link.title"
      :value="link.title"
      @click="toggleDrawer(link.title)"
    >
      <v-icon>{{ link.icon }}</v-icon>
      <span class="bottom-nav-label">{{ link.title }}</span>
    </v-btn>
  </v-bottom-navigation>

</template>

<script>
export default {
 
  data() {
    return {
        bottomNav: null, // Pour contrôler l'onglet actif
            linking: [
              { title: 'Accueil', icon: 'mdi-home' },
              { title: 'Publicités', icon: 'mdi-bullhorn' },
              { title: 'Notifications', icon: 'mdi-bell' },
              { title: 'Menu', icon: 'mdi-menu' },
            ],
    };
  },
  methods: {
   
    selectBottomNavItem(link) {
      // Logique pour gérer la sélection de l'onglet
      console.log('Onglet sélectionné:', link.title);
      // Par exemple, vous pourriez utiliser le routeur pour naviguer
      // this.$router.push(link.route);
    },
    toggleDrawer(title) {
    // Émettre un événement personnalisé pour informer le parent
    this.$emit('bottom-navigation-clicked',title);
    
  },
  },
};
</script>
<style scoped>

/* ... Votre CSS existant ... */

.bottom-nav {
  background-color: #000; /* La couleur de fond de votre barre de navigation */
  color: black;
  display: none;
  height: 90px;
  position: fixed; /* Appliquer une position fixe */
}

.bottom-nav .v-btn {
  color: black; /* Couleur du texte et de l'icône */
  max-width: 25%;
  
}

/* CSS pour personnaliser le bouton actif */
.v-bottom-navigation .v-btn--active {
  background-color: transparent !important;
   /* Remplacez #votreCouleurDeFond avec la couleur hexadécimale de votre choix */
  /* Ajoutez d'autres styles si nécessaire */
}

/* CSS pour personnaliser le texte ou l'icône du bouton actif */
.v-bottom-navigation .v-btn--active .v-icon,
.v-bottom-navigation .v-btn--active .v-btn__content {
    background-color: transparent !important;
    color: #6700ea; /* Remplacez #votreCouleurDeTexte avec la couleur hexadécimale de votre choix */
}

.bottom-nav-label {
  display: none; /* Cacher les labels sur mobile */
}

@media (max-width: 600px) {
  .bottom-nav-label {
    display: block; /* Montrer les labels sur les écrans plus larges */
  }
  .bottom-nav {
  background-color: #000; /* La couleur de fond de votre barre de navigation */
  color: white;
  display: block;
  line-height: 55px;
}
}
</style>

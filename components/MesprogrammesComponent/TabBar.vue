<template>
   <div class="tab-bar">
      <button
        v-for="button in buttons"
        :key="button.id"
        :class="{'button-active': isactive === button.id}"
        @click="toogleId(button)"
        
      >
        {{ button.text }}
      </button>
    </div>
</template>
  
<script>
export default {
  name: 'TabBar',
  data() {
    return {
      isactive:1,
      buttons: [
        { id: 1, text: 'Prog. en cours' },
        { id: 2, text: 'Prog. programmés' },
        { id: 3, text: 'Prog. terminés' },
        { id: 4, text: 'Brouillons' },
        { id: 5, text: 'Templates' }
      ],
    };
  },

  methods:{

    toogleId(button)
    {
      this.isactive = button.id;
      this.$emit('send-value', button.text);
    }

  }
  
}
</script>
  
  <style scoped>
  .tab-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: var(--background-color);
  border-bottom: 2px solid var(--border-color);
  color: grey;
  width: 85%; /* Utilisez 100% de la largeur sur tous les écrans */
  overflow-x: auto; /* Ajoutez une barre de défilement horizontale sur les petits écrans */
  white-space: nowrap; /* Empêche les boutons de passer à la ligne */

}

.tab {
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
 
}

.button-active
{
  border-bottom: 1px solid #FB7F23;
  color: black;
  padding-bottom: 8px;
  font-weight: bold;
}
.tab:hover {
  background-color: var(--hover-color);
}
@media (max-width: 600px) {
  .tab-bar {
    flex-wrap: wrap; /* Permet aux boutons de passer à la ligne sur les petits écrans */
    justify-content: center; /* Centre les boutons sur les petits écrans */
  }

  .tab {
    flex: 0 0 auto; /* Ajuste la taille des boutons pour les adapter à l'écran */
    margin: 5px; /* Ajoute de l'espace entre les boutons */
  }
  .tab-bar button {
    margin: 6px;
  }
}

  </style>
  
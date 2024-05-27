<template>
    <input type="text" class="button" :placeholder="placeholder" :style="{ lineHeight: lineHeight , backgroundColor: backgroundColor, color: color,  }"/>
</template>

<script>
export default {
  name: 'CustomInputButton',
  props: {
    placeholder: {
      type: String,
      default: 'Enregistrer', // Valeur par défaut
    },
    lineHeight: {
      type: String,
      default: '30px', // Valeur par défaut du line-height
    },
    backgroundColor:
    {
      type: String,
      default: '#FB7F23',
    },

    color:
    {
      type: String,
      default: '#000',
    }

    // Vous pouvez ajouter d'autres propriétés ici si nécessaire
  },
};
</script>

<style scoped>
.button {
  background-color: #FB7F23;
  color: white;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color 0.1s ease;
  margin-bottom: 5px;
  /* Ajoutez ici le style de votre bouton */
}

input::placeholder {
  color: white; /* Changez 'red' pour la couleur de votre choix */
  opacity: 10; /* Pour s'assurer que la couleur n'est pas rendue transparente */
  font-weight: lighter;
}

</style>
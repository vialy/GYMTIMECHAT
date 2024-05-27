<template>
    <button @click="SendIt" v-if="type=='text'" class="button" :type="type" :style="{ lineHeight: lineHeight , backgroundColor: backgroundColor, color: color,  }">{{ buttonText }}</button>
    <button v-else>
      <input  type="checkbox" />
    </button>
    
</template>

<script>
export default {
  name: 'SimpleButton',
  props: {
    buttonText: {
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

    type:
    {
      type: String,
      default: 'text',
    },

    color:
    {
      type: String,
      default: '#FFF',
    }

    // Vous pouvez ajouter d'autres propriétés ici si nécessaire
  },
  methods:{
    SendIt()
    {
        this.$emit('click-changed')
    }
  }
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

.button:hover{
  background-color: #FFF;
  color: black;
}
</style>
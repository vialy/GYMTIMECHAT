<template>
       <!-- Deuxième ligne -->
<v-row class="secondLayerMain">
    <v-sheet class="mx-auto submenubar" max-width="100%" >
        <v-slide-group  show-arrows >
            <v-slide-item
                v-for="n in 25"
                :key="n"
                v-slot="{ active, toggle }"          
            >
                <v-btn    
                class="ma-2 btntoolbar "       
                :input-value="active"
                active-class="deep-purple accent-4 white--text"
                depressed
                rounded
                @click="buttonClicked(n, toggle)"
                >
                Options {{ n }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
        
        
</v-row>
</template>

<script>
export default {
  name: 'OptionsButton',
  props:{

    marginTop:
    {
      type: String,
      default: '0px',
    }

  },
 
  methods: {
    buttonClicked(n, toggle) {
      this.$emit('button-clicked', n);  // Émettre un événement avec la valeur n
      toggle();  // Toggle est toujours appelé pour conserver la logique de sélection
    },
  },
 
};
</script>

<style scoped>

.secondLayerMain
{
  background-color: transparent;
  min-height:10px;
  color: blue;
}
.submenubar
{
  color: white;
  background-color: black;
}

.btntoolbar
{
 font-size: 10px; 
 padding: 4px 6px;
 background-color: #343434;
 color: white;
}
</style>
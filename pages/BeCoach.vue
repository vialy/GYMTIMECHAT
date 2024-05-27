<template>
  <v-container>
    <!-- Titre et Avatar -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Devenir Coach</h1>
        <div class="text-center">
          <v-avatar size="120">
            <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" alt="Profile Image">
          </v-avatar>
        </div>
      </v-col>
    </v-row>

    <!-- Formulaire pour Devenir Coach -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Informations Personnelles -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstName"
            :rules="[rules.required]"
            label="Prénom"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastName"
            :rules="[rules.required]"
            label="Nom"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Détails du Coach -->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="description"
            label="Description"
            :rules="[rules.required]"
            required
            multi-line
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Qualifications et Expérience -->
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="qualification"
            :items="qualificationOptions"
            label="Categorie"
            :rules="[rules.required]"
            required
            item-text="name"
            item-value="value"
            return-object
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="experience"
            label="Expérience"
            :rules="[rules.required]"
            required
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- Bouton Soumettre -->
      <v-row justify="center">
        <v-btn :disabled="!valid" color="primary" @click="submitForm">
          Soumettre
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    qualification: null,
    experience: '',
    qualificationOptions: [
      { name: 'Cardio', value: 'cardio' },
      { name: 'Musculation', value: 'musculation' },
      { name: 'Football', value: 'football' },
      { name: 'Yoga', value: 'yoga' },
      // Ajoutez d'autres options ici
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    rules: {
      required: value => !!value || 'This field is required.'
    }
  }),
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Logic to handle form submission
        alert('Form submitted');
      }
    }
  }
};
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
</style>

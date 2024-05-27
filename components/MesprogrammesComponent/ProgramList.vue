<template>
  <div class="program-list-container">
    <table class="program-list">
      <thead>
        <tr>
          <th>Programme</th>
          <th>Client</th>
          <th>Date de début - fin</th>
          <th>Progression</th>
        </tr>
      </thead>
      <tbody v-if="programs.length>0">
        <tr v-for="program in programs" :key="program.name">
          <td>{{ program.name }}</td>
          <td>{{ program.client }}</td>
          <td>{{ program.startDate }} - {{ program.endDate }}</td>
          <td><v-progress-linear
            :buffer-value="program.progress"
            color="#FB7F23"
            height="20"
            model-value="40"
            rounded
           
          > 
          <template v-slot:default="{ value }">
             <strong>{{ Math.ceil(value) }}%</strong>
          </template>
      </v-progress-linear></td>

          
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td>------</td>
          <td>--------</td>
          <td>Empty program</td>
          <td>-------------</td>
          
     

          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProgramList',
  props: {
    programs: Array,
  },

  data() {
    return {
      bufferValue: 50,   // La valeur du buffer
    };
  },
};
</script>

<style scoped>
.program-list-container {
  overflow-x: auto;
  margin: 20px;
}

.program-list {
  width: 100%;
  border-collapse: collapse;
}

.program-list th, .program-list td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid lavender;
}

.program-list th {
  background-color: var(--primary-color);
  color: grey;
  border-bottom: 1px solid lavender;
}

/* Ajouter des styles supplémentaires pour les td selon le besoin */
.program-list td:nth-child(4) {
  text-align: left;
}
.program-list td:nth-child(1) {
  color: #FB7F23;
  font-weight: bold;
}
/* Media query pour les petits écrans */
@media (max-width: 768px) {
  .program-list th,
  .program-list td {
    padding: 5px;
  }
}
</style>

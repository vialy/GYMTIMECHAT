<template>
     <div class="pagination">
      <button v-if="currentPage > 1 && totalPages > 1 " @click="changePage(currentPage - 1)">Précédent</button>
      <span>Page {{ totalPages > 0 ? currentPage : 0 }} sur {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">Suivant</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaginBar',
    props: {
    currentPage: Number,
    totalPages: Number,
  },
   
 
  methods: {
      changePage(newPage) {
    this.$emit('page-changed', newPage); // Informe le composant parent du changement de page
  },
  
  
    },
  };
  </script>
  
  <style scoped>
  .pagination {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lavender;
}

.pagination button {
  background-color: var(--primary-color);
  border: none;
  color: black;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: darken(var(--primary-color), 10%);
}

.pagination span {
  color: var(--text-color);
}

  </style>
  
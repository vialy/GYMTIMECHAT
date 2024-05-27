<template>
    <div>
      <TabBar @send-value="hello" />
      <ProgramList :programs="displayedPrograms" />
      <PaginBar :totalPages="totalPages" :currentPage="currentPage" @page-changed="updatePage" />
    </div>
</template>
  
  <script>
  import TabBar from './TabBar.vue';
  import ProgramList from './ProgramList.vue';
  import PaginBar from './PaginBar.vue';
  
  export default {
    components: {
      TabBar,
      ProgramList,
      PaginBar
    },
    data() {
      return {
        currentFilter: 'Brouillons',
        currentPage:1,
        itemsPerPage: 3,      // C'est comme décider de ne voir que 10 stickers à la fois
        programs: [
          { name: 'Mon super Programme YouTube1', client: 'Dwayne Koe', status:'Prog. en cours', startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 },
          { name: 'Mon super Programme YouTube2', client: 'Dwayne Koe', status:'Prog. en cours', startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 },
          { name: 'Mon super Programme YouTube3', client: 'Dwayne Koe', status:'Prog. en cours', startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 },
          { name: 'Mon super Programme YouTube4', client: 'Dwayne Koe', status:'Brouillons',startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 },
          { name: 'Mon super Programme YouTube5', client: 'Dwayne Koe', status:'Prog. en cours',startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 },
          { name: 'Mon super Programme YouTube6', client: 'Dwayne Koe', status:'Brouillons',startDate: '11/07/2022', endDate: '05/08/2022', progress: 80 }
          

          // Ajoutez d'autres programmes ici
        ],
      };
    },

    methods: {
    updatePage(newPage) {
      this.currentPage = newPage;
    },
    hello(text)
    {
      this.currentFilter = text;
    },
  },
    computed: {

    filteredPrograms() {
    return this.programs.filter(program => program.status === this.currentFilter);
    },

    displayedPrograms() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPrograms.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPrograms.length / this.itemsPerPage);
    }

    
    
  }
  
  };
  </script>
  
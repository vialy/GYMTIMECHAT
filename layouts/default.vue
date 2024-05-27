<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="#6700ea"
      fixed
      app
    >
  <v-list>
    <!-- Ajoutez un v-list-item avant votre boucle v-for -->
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
        <v-list-item-subtitle>john@google.com</v-list-item-subtitle>
      </v-list-item-content>
    <v-menu transition="slide-y-transition" bottom >
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="text-black custom-transparent-button">
              <v-icon outlined flat>mdi-menu-down</v-icon>
          </v-btn>
          </v-btn>
      </template>
        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router

          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>
    <v-divider class="mb-5" color="grey"></v-divider>
    <!-- Votre boucle v-for actuelle -->
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="mb-3" color="grey"></v-divider>
    <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
      <template v-slot:activator>
          <v-list-item-title class="text-White">Programmes</v-list-item-title>
      </template>
        <v-list-item
          v-for="child in itemsNav"
          :key="child.title"
          link
          :to="child.to"
          router
        >
            <v-list-item-title class="text-white" link v-text="child.title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="child.action"></v-icon>
            </v-list-item-icon>
          </v-list-item>
      </v-list-group>

      <v-divider class="mb-3" color="grey"></v-divider>
    
    <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
      <template v-slot:activator>
          <v-list-item-title class="text-White">Exercise</v-list-item-title>
      </template>

        <v-list-item
          v-for="child in ExercisePage"
          :key="child.title"
          link
          :to="child.to"
          router
        >
            <v-list-item-title class="text-white" link v-text="child.title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="child.action"></v-icon>
            </v-list-item-icon>
          </v-list-item>
      </v-list-group>


      <v-divider class="mb-6" color="grey"></v-divider>

      <v-list-subheader class="text-white ml-4 mt-4">Subscriptions</v-list-subheader>
          <v-list-item
          <v-list-item
            v-for="item in subscription"
            :key="item.text"
            :value="item"
            color="black"
            @click="GoToSubscriber(item)"
            >
            <template>
              <v-avatar size="32">
                <img :src="item.image" alt="description de l'image">
              </v-avatar>
            </template>
            <v-list-item-title class="ml-2">{{ item.name }}</v-list-item-title>
          </v-list-item>
  </v-list>
</v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="app-bar-style"

    >
        <!-- Bouton de retour qui s'affiche seulement si ce n'est pas la page d'accueil -->
        <v-btn
        v-if="$route.path !== '/'"
        icon
        @click="goBack"
        class="hidden-lg-only text-none colorChange">

        <v-icon>mdi-arrow-left</v-icon>

        </v-btn>


      <v-app-bar-nav-icon class="hidden-xs-only hidden-lg-only" @click.stop="drawer = !drawer" />

      <v-app-bar-title>GYMTIME</v-app-bar-title>
      <v-btn
        class="hidden-xs-only colorChange"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        class="hidden-xs-only colorChange"
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        class="hidden-xs-only hidden-lg-only"
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-spacer />
      <v-btn class="text-none colorChange" icon>
          <v-badge content="2" color="deep-purple accent-4" overlap>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
      </v-btn>

      <v-btn class="text-none colorChange" icon>
          <v-badge content="22" color="deep-purple accent-4" overlap>
            <v-icon>mdi-chat</v-icon>
          </v-badge>
      </v-btn>


      <v-menu transition="slide-y-transition" offset-x left >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="text-none colorChange mr-2 ml-2" icon v-bind="attrs" v-on="on">
            <v-badge
              bordered
              bottom
              color="deep-purple accent-4"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar size="40">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
              </v-avatar>
            </v-badge>

          </v-btn>
        </template>

        <v-list density="compact">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.to"
                  router

                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
        </v-list>


      </v-menu>

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


       <!-- Bottom Navigation -->
 <BottomNavigation @bottom-navigation-clicked="handleBottomNavigationClicked"/>


  </v-app>
</template>

<script>
import index from '../pages/index.vue';
import { createLoader } from '../utils/index.js';

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      open: ['Admin'],

      subscription: [
        { id:1, name:'Yonkwa Vialy', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné',image:'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460' },
        { id:2, name:'LESOUTSIDERZ', title:'Vialy a • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné',image:'https://cdn.vuetifyjs.com/images/john.jpg' },
      ],

      itemsNav: [
        {
          action: 'mdi-dumbbell',
          title: 'Mes Programmes',
          active: true,
          to: '/MesProgrammes'
        },
        {
          action: 'mdi-cogs',
          title: 'Creer mon programme',
          active: false,
          to: '/Monprogrammes'
        },
      ],

      ExercisePage: [
        {
          action: 'mdi-dumbbell',
          title: 'Mes Exercises',
          active: false,
          to: '/MesExercises'
        },
        {
          action: 'mdi-cogs',
          title: 'Creer un exercise',
          active: false,
          to: '/NouveauExercise'
        },
      ],

      // Tableaux pour ma navigation
      items: [
        {
          icon: 'mdi-home',
          title: 'Acceuil',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple-plus',
          title: 'Abonnement',
          to: '/mesabonnements'
        },
        {
          icon: 'mdi-account',
          title: 'Profil',
          to: '/BeCoach'
        },
        {
          icon: 'mdi-chat',
          title: 'Chat',
          to: '/chat'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/SingleVideo'
        }
      ],


      // Tableaux pour mes programmes
      ProgramsFile: [
        { text: 'Creer mon programme', icon: 'mdi-cogs' },
        { text: 'Mes Programmes', icon: 'mdi-dumbbell' }
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods:{
    handleBottomNavigationClicked(title) {
      // Faire quelque chose lorsque BottomNavigation est cliqué
      if(title=="Menu"){
        this.drawer = !this.drawer
      }
      else if(title=="Accueil")
      {
        this.$router.push('/');
      }


    },

    created(){
      createLoader();
    },

    goBack() {
      this.$router.go(-1); // Naviguer à la page précédente
    },

    GoToSubscriber(item)
    {
      // this.$emit('update-drawer', item);
     this.$router.push({ name: 'MySubscribers', params: { SubscriberData: item }});
    }
  }
}
</script>

<style  lang="scss">
  
  .v-app-bar
  {
    color: black;
  }
  .custom-transparent-button
  {
    background-color: transparent !important;
    padding: 0 !important;
    box-shadow: none !important;
    box-shadow: none !important;
  }


  .app-bar-style {
  background-color: white !important; /* Fond blanc */
  color:black !important;
  }
  .colorChange
  {
    color:black !important;
  }

  #loader{
    height: 100% !important;
    width: 100% !important;
    background: #000c !important;
    z-index: 9998 !important;
    position: fixed;
  }
  .sk-chase {
    top: 50% !important;
    left: 50% !important;
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2.0s infinite ease-in-out both;
  }

  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #ffc107 ;
    border-radius: 100%;
    animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
  }

  .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
  .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

  @keyframes sk-chase {
    100% { transform: rotate(360deg); }
  }

  @keyframes sk-chase-dot {
    80%, 100% { transform: rotate(360deg); }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    } 100%, 0% {
      transform: scale(1.0);
    }
  }


</style>

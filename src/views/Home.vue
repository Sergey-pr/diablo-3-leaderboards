<template>
  <div class="home">
    <Table v-if="LEADERBOARD" :items="LEADERBOARD"/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    Table
  },
  computed: {
    ...mapGetters([
      'LEADERBOARD'
    ])
  },
  data() {
    return {
    }
  },
  beforeCreate() {
    this.$store.dispatch('GET_TOKEN')
      .then(() => {
        this.$store.dispatch('GET_LEADERBOARD')
        this.$store.dispatch('GET_CURRENT_SEASON')
          .then(() => {
            this.$store.dispatch('GET_LADDERS')
          })
        
      })
  },
  created() {
  }
  
}
</script>

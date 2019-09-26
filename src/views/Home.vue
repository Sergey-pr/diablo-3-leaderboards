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
  created() {
    this.$store.dispatch('GET_LEADERBOARD')
      .then(() => {
        console.log(this.LEADERBOARD)
      })
  }
  
}
</script>

<template>
  <div>
    <h1>Настройки</h1>
    <b-container fluid>
      <b-row>
        <b-col>
          <h4>Доска достижений:</h4>
          <b-form-select
            v-model="ladderSelected"
            :options="ladderOptions"
            size="sm"
            class="select-form"
          ></b-form-select>
        </b-col>
        <b-col v-if="typeSelected==='season'">
          <h4>Сезон:</h4>
          <b-form-select
            v-model="seasonSelected"
            :options="seasonOptions"
            size="sm"
            class="select-form"
          ></b-form-select>
        </b-col>
        <b-col v-if="typeSelected==='era'">
          <h4>Эра:</h4>
          <b-form-select
            v-model="eraSelected"
            :options="eraOptions"
            size="sm"
            class="select-form"
          ></b-form-select>
        </b-col>
        <b-col>
          <h4>Сезон/Эра:</h4>
          <b-form-select
            v-model="typeSelected"
            :options="typeOptions"
            size="sm"
            class="select-form"
          ></b-form-select>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'CURRENT_SEASON',
      'CURRENT_ERA',
      'LADDERS'
    ])
  },
  data() {
    return {
      typeSelected: 'season',
      typeOptions: ['season', 'era'],
      seasonSelected: 18,
      seasonOptions: [],
      eraSelected: 1,
      eraOptions: [],
      ladderSelected: 'achievement-points',
      ladderOptions: [],
      params: {}
    }
  },
  watch: {
    CURRENT_SEASON: function() {
      for (let i = 1; i <= this.CURRENT_SEASON; i++) {
        this.seasonOptions.push({value: i, text: 'Season ' + i})
      }
    },
    CURRENT_ERA: function() {
      for (let i = 1; i <= this.CURRENT_ERA; i++) {
        this.eraOptions.push({value: i, text: 'Era ' + i})
      }
    },
    LADDERS: function() {
      this.ladderOptions = []
      for (let i = 0; i < this.LADDERS.length; i++) {
        this.ladderOptions.push({value: this.LADDERS[i], text: this.LADDERS[i]})
      }
    },
    seasonSelected: function() {
      this.getParams()
      this.$store.dispatch('GET_LEADERBOARD', this.params)
      this.$store.dispatch('GET_LADDERS', this.params)
    },
    eraSelected: function() {
      this.getParams()
      this.$store.dispatch('GET_LEADERBOARD', this.params)
      this.$store.dispatch('GET_LADDERS', this.params)
    },
    ladderSelected: function() {
      this.getParams()
      this.$store.dispatch('GET_LEADERBOARD', this.params)
    },
    typeSelected: function() {
      if (this.ladderSelected === 'achievement-points' && this.typeSelected === 'era') {
        this.ladderSelected = 'rift-barbarian'
      }
      this.getParams()
      this.$store.dispatch('GET_CURRENT_ERA')
        .then(() =>{
          this.$store.dispatch('GET_LEADERBOARD', this.params)
          this.$store.dispatch('GET_LADDERS', this.params)
        })
      
    }
  },
  methods: {
    getParams: function() {
      if (this.typeSelected === 'season') {
        this.params.season = this.seasonSelected
      } else {
        this.params.season = this.eraSelected
      }
      this.params.leaderboard = this.ladderSelected
      this.params.type = this.typeSelected
    }
  }
}
</script>

<style scoped>
  .select-form {
    margin: 5px;
  }
</style>
import Vue from 'vue'
import Vuex from 'vuex'
import { Api, Login } from '@/Api'

Vue.use(Vuex)

var token = ''

export default new Vuex.Store({
  state: {
    token: null,
    leaderboard: null,
    currentSeason: null,
    currentEra: null,
    ladders: null
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      token = payload.access_token
    },
    SET_LEADERBOARD: (state, payload) => {
      payload.column = payload.column.map((x) => {
        x.key = x.id
        x.label = x.label.ru_RU
        if (x.label) {
          return x
        } else {
          return null
        }
      })
      payload.column.push(...payload.row[0].player[0].data.map((x) => {
        return x.id
      }))
      payload.row = payload.row.map((x) => {
        x.data.map((y) => {
          if (y.string) {
            x[y.id] = y.string
          } else if (y.number) {
            x[y.id] = y.number
          } else if (y.timestamp) {
            x[y.id] = y.timestamp
          }
        })
        x.player[0].data.map((z) => {
          if (z.string) {
            x[z.id] = z.string
          } else if (z.number) {
            x[z.id] = z.number
          } else if (z.timestamp) {
            x[z.id] = z.timestamp
          }
        })
        return x
      })
      state.leaderboard = payload
    },
    SET_CURRENT_SEASON: (state, payload) => {
      state.currentSeason = payload.current_season
    },
    SET_LADDERS: (state, payload) => {
      state.ladders = [...payload.leaderboard.map((x) => {
        return x.ladder.href.replace(/https:\/\/eu\.api\.blizzard\.com\/data\/d3\/(season|era)\/\d+\/leaderboard\//,
          '').replace('?namespace=2-6-EU', '')
      })]
    },
    SET_CURRENT_ERA: (state, payload) => {
      state.currentEra = payload.current_era
    }
  },
  actions: {
    GET_TOKEN: async (context, payload) => {
      payload = 'grant_type=client_credentials'
      const result = await Login.post('https://eu.battle.net/oauth/token', payload)
      context.commit('SET_TOKEN', result.data)
    },
    GET_LEADERBOARD: async (context, payload) => {
      if (!payload) {
        payload = {}
        payload.season = 18
        payload.leaderboard = 'achievement-points'
        payload.type = 'season'
      }
      const result = await Api.get('https://eu.api.blizzard.com/' +
        `data/d3/${payload.type}/${payload.season}/leaderboard/${payload.leaderboard}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      })
      context.commit('SET_LEADERBOARD', result.data)
    },
    GET_CURRENT_SEASON: async (context, payload) => {
      const result = await Api.get('https://eu.api.blizzard.com/data/d3/season/', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      })
      context.commit('SET_CURRENT_SEASON', result.data)
    },
    GET_LADDERS: async (context, payload) => {
      if (!payload) {
        payload = {}
        payload.season = 18
        payload.type = 'season'
      }
      const result = await Api.get(`https://eu.api.blizzard.com/data/d3/${payload.type}/${payload.season}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      })
      context.commit('SET_LADDERS', result.data)
    },
    GET_CURRENT_ERA: async (context, payload) => {
      const result = await Api.get('https://eu.api.blizzard.com/data/d3/era/', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      })
      context.commit('SET_CURRENT_ERA', result.data)
    }
  },
  getters: {
    LEADERBOARD: state => {
      return state.leaderboard
    },
    CURRENT_SEASON: state => {
      return state.currentSeason
    },
    CURRENT_ERA: state => {
      return state.currentEra
    },
    LADDERS: state => {
      return state.ladders
    }
  }
})

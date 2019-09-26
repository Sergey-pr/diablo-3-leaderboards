import Vue from 'vue'
import Vuex from 'vuex'
import { Api, Login } from '@/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    leaderboard: null
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = [payload.access_token, payload.expires_in]
    },
    SET_LEADERBOARD: (state, payload) => {
      payload.column = payload.column.map((x) => {
        x.key = x.id
        x.label = x.label.ru_RU
        return x
      })
      console.log(payload.row)
      payload.row = payload.row.map((x) => {
        x[x.data.id] = x.data.number
        return x
      })
      state.leaderboard = payload
      console.log(payload)
    }
  },
  actions: {
    GET_TOKEN: async (context, payload) => {
      payload = 'grant_type=client_credentials'
      const result = await Login.post('https://eu.battle.net/oauth/token', payload)
      context.commit('SET_TOKEN', result.data)
    },
    GET_LEADERBOARD: async (context, payload) => {
      const result = await Api.get('https://eu.api.blizzard.com/data/d3/season/1/leaderboard/achievement-points')
      context.commit('SET_LEADERBOARD', result.data)
    }
  },
  getters: {
    TOKEN: state => {
      return state.token
    },
    LEADERBOARD: state => {
      return state.leaderboard
    }
  }
})

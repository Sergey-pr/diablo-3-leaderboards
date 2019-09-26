<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
</template>

<script>
import { getCookie, setCookie } from '@/Cookies'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'TOKEN'
    ])
  },
  created() {
    if (!getCookie('token')) {
      this.$store.dispatch('GET_TOKEN')
        .then(() => {
          setCookie('token', this.TOKEN[0], this.TOKEN[1])
        })
    }
  }
}
</script>

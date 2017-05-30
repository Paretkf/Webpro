<template>
  <div id="app">
    <header-view />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import headerView from './components/header'
export default {
  name: 'app',
  components: {
    headerView
  },
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  mounted () {
    this.$store.dispatch('getUser')
  }
}
</script>

<style>

</style>

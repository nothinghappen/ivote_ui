<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'top-bar': require('./components/TopBar')
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
@import './assets/css/bootstrap.min.css';

html, body {
  width: 100%;
  height: 100%;
  margin: 0px;
}



</style>

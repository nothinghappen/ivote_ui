<template>
  <div>
      <top-bar />
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
export default {
  components: {
    'top-bar': require('components/TopBar')
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

html, body {
  width: 100%;
  height: 100%;
  margin: 0px;
}



</style>
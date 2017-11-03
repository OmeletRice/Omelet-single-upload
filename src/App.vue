<template>
  <div id="app">
    <om-sigle-upload>
    </om-sigle-upload>
  </div>
</template>

<script>
import OmSigleUpload from './components/upload/index'
export default {
  name: 'app',

  components: {
    OmSigleUpload
  },

  data() {
    return {
      access: ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

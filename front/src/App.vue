<template lang="fr">
  <router-view/>
</template>

<script>
  export default {
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(recaptchaScript)
      let recaptchaScript2 = document.createElement('script')
      recaptchaScript2.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js')
      document.head.appendChild(recaptchaScript2)
      let recaptchaScript3 = document.createElement('script')
      recaptchaScript3.setAttribute('src', 'https://kit.fontawesome.com/7ea6608266.js')
      document.head.appendChild(recaptchaScript3)
    },
    created() {
      const html = document.documentElement // returns the html tag
      html.setAttribute('lang', 'fr')
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

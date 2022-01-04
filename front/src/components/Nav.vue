<template>
  <div id="nav">
    <router-link to="/" id="a">Connexion</router-link> |
    <router-link to="/register" id="b">S'inscrire</router-link>
  </div>
</template>

<script>
export default {
    name: "Nav",
}
</script>

<style>
#nav #a{
  background-color: white;
  color: black !important;
}

#nav #b{
  background-color: white;
  color: black !important;
}


</style>
<template>
  <div class="home">
    <Nav/>
    <HelloWorld msg="Bienvenue sur ton nouveau réseau social 👋"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    HelloWorld
  }
}
</script>

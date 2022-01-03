<template>
  <div class="container">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div class="d-flex justify-content-center">
        <div class="flex-row w-50">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              v-model="email"
            />
            <label for="floatingInput">Adresse email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              v-model="password"
            />
            <label for="floatingPassword">Mot de passe</label>
          </div>
          <div class="col-12 m-3">
            <button @click="connect" class="btn btn-primary" type="submit">
              Se connecter
            </button>
          </div>
          <img src="../assets/groupomania/icon-left-font.png" class="logo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    connect() {
      const newUser = {
        email: this.email,
        password: this.password,
      };
      axios.post('http://localhost:5000/api/user/signin', newUser)
        .then((reponse) => {
          if (reponse.status === 200) {
            const id = reponse.data.id
            this.$store.state.token = reponse.data.token
            this.$router.push('/blog?'+ id)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.logo {
  width: 450px;
}

@media (max-width: 400px) {
  .logo {
    width: 150px;
  }

  #form_nav {
    width: 120px;
  }
}

.container {
  background-color: rgb(219, 219, 255);
  padding-bottom: 50px;
  border-radius: 25px;
}



h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

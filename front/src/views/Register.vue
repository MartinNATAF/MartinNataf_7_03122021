<template>
  <Nav/>
  <div class="register">
    <h1 class="mb-5">
      Bienvenue chez Hayoo le nouveau réseau social à la mode !
    </h1>
    <div class="d-flex justify-content-center">
      <div class="flex-row w-50">
        <div class="form-floating m-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="username"
            required
            v-model="username"
          />
          <label>{{ Username }}</label>
        </div>
        <div class="form-floating m-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            v-model="email"
          />
          <label for="floatingInput">{{ Email }}</label>
        </div>
        <div class="form-floating m-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required="true"
            v-model="password"
          />
          <label for="floatingPassword">{{ Password }}</label>
        </div>
        <div class="col-12">
          <button @click="submit" class="btn btn-primary" type="submit">
            Souscrire
          </button>
        </div>
      </div>
    </div>
    <h1 class="m-5">{{ Enregistrement }}</h1>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import axios from 'axios';
export default {
  data() {
    return {
      Enregistrement: "Bienvenue",
      Username: "Pseudo",
      Email: "Adresse email",
      Password: "Mot de passe",
      username: "",
      email: "",
      password: "",
    } 
  },
  components: {
    Nav
  },
  methods: {
    api() {
      const newUser = {
          'pseudo': this.username,
          'email': this.email,
          'password': this.password,
          'bio': '',
        }
        axios({
          method: "POST",
          url: "http://localhost:5000/api/user/register",
          data: newUser,
        })
          .then(() => {
            //On traite la suite une fois la réponse obtenue
              this.$router.push('/')
          })
          .catch((res) => {
              if(res.response.status === 402) {
                this.Enregistrement = 'Votre Email est déjà utilisé..'
              }
              else if(res.response.status === 403) {
                this.Enregistrement = 'Votre Pseudo est déjà utilisé..'
              }
              else {
                this.Enregistrement = 'Une erreur inconnue viens de se produire, merci de vérifier votre connexion'
              }
          });
    },
    submit() {
      if (this.username === "" || this.email === "" || this.password === "") {
        if (this.username === "" && this.email === "" && this.password === "") {
          this.Username = "Le champ Username est obligatoire";
          this.Email = "Le champ Email est obligatoire";
          this.Password = "Le champ Password est obligatoire";
        } else if (this.email === "" && this.password === "") {
          this.Email = "Le champ Email est obligatoire";
          this.Password = "Le champ Password est obligatoire";
          this.Username = "Username";
        } else if (this.username === "" && this.email === "") {
          this.Username = "Le champ Username est obligatoire";
          this.Email = "Le champ Email est obligatoire";
          this.Password = "Password";
        } else if (this.username === "" && this.password === "") {
          this.Username = "Le champ Username est obligatoire";
          this.Password = "Le champ Password est obligatoire";
          this.Email = "Email";
        } else if (this.username === "") {
          this.Username = "Le champ Username est obligatoire";
        } else if (this.email === "") {
          this.Email = "Le champ Email est obligatoire";
        } else {
          this.Password = "Le champ Password est obligatoire";
        }
      } else {
        this.api()
      }
    },
  },
};
</script>

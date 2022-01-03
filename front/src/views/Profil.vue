<template>
  <h1>Votre Pseudo : {{ name }}</h1>
  <h1>Votre Adresse Email : {{ email }}</h1>
  <h1>Votre Biographie actuelle : {{ Biographie }}</h1>
  <div class="form-floating m-3">
    <input
      type="bio"
      class="form-control"
      id="floatingPassword"
      placeholder="Biographie"
      v-model="bio"
    />
  </div>
  <h1>{{ update }}</h1>
  <button @click="edit" class="btn btn-primary m-3" type="submit">
    Mettre à jour
  </button>
  <button @click="deletee" class="btn btn-warning m-3" type="submit">
    Supprimer votre compte
  </button>
  <button @click="menu" class="btn btn-success m-3" type="submit">
    Revenir sur le Forum
  </button>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: window.location.hash,
      name: null,
      email: null,
      bio: null,
      update: "",
    };
  },
  methods: {
    edit() {
      axios
        .put(
          "http://localhost:5000/api/user/" +
            this.id.substr(this.id.length - 1),
          {data: { 
            bio: this.bio ,
            id: this.id.substr(this.id.length - 1)
          }},
          {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.token
            }
          }
        )
        .then((reponse) => {
          if (reponse.status === 201) {
            this.update = "Votre biographie a bien été mise à jour";
          }
        })
        .catch(() => {
          this.$router.push("/");
        });
    },
    deletee() {
      axios({
              method: "DELETE",
              data: {pseudo: this.name},
              url: "http://localhost:5000/api/post/",
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
              }
        })
        .then((reponse) => {
          if (reponse.status === 200) {
            axios({
              method: "DELETE",
              data: {id: this.id.substr(this.id.length - 1)},
              url: "http://localhost:5000/api/user/" + this.id.substr(this.id.length - 1),
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
              }
            })
              .then((reponse) => {
                if (reponse.status === 200) {
                  this.$router.push("/");
                }
              })
              .catch(() => {
                this.$router.push("/");
              })
          }
        })
        .catch(() => {
          this.$router.push("/");
        });
    },
    menu() {
      this.$router.push("/blog?" + this.id.substr(this.id.length - 1));
    },
  },
  mounted() {
      axios({
        method: "GET",
        data: {id: this.id.substr(this.id.length - 1)},
        url: "http://localhost:5000/api/user/" + this.id.substr(this.id.length - 1),
        headers: {
        'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
      .then(
        (response) => (
          console.log(this.$store.state),
          (this.name = response.data.user.pseudo),
          (this.email = response.data.user.email),
          (this.bio = response.data.user.bio)
        )
      )
      .catch(() => {
        this.$router.push("/");
      })
  },
};
</script>
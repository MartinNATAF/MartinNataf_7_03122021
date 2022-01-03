<template>
  <button @click="show" class="btn btn-primary m-3" type="submit">
    Editer votre profil
  </button>
  <button @click="post" class="btn btn-info m-3" type="submit">
    Créer un nouveau post
  </button>
  <div class="blog">
    <img src="../assets/groupomania/icon.png" class="icon">
    <h1 class="m-5">Content de vous voir {{ name }}</h1>
    <img src="../assets/groupomania/icon.png" class="icon">
  </div>
  <div :key="object.idUser" class="post" v-for="object in test" :id="object.id">
      <h2>{{ object.pseudo }}</h2>
      <h3>{{ object.message }}</h3>
      <img
        :src="require(`../assets/uploads${object.picture}`)"
        v-if="object.picture !== null"
        class="img_style"
      />
      <video
        :src="require(`../assets/uploads${object.video}`)"
        controls
        width="400"
        v-if="object.video !== null"
      ></video>
      <div class="m-1"></div>
      <button v-if="((object.pseudo === name) || (name === 'admin'))" @click="deletePost(object.id)" class="btn btn-danger">Suppression du post</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: window.location.hash,
      name: null,
      test: [],
    };
  },
  methods: {
    show() {
      this.$router.push("/profil?" + this.id.substr(this.id.length - 1));
    },
    post() {
      this.$router.push("/post?" + this.id.substr(this.id.length - 1));
    },
    deletePost(valueId) {
      axios({
        method: "DELETE",
        url: 'http://localhost:5000/api/post/' + valueId,
        data: {pseudo: this.name},
        headers: {
        'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then((reponse) => {
          if (reponse.status === 200) {
            axios({
              method: "GET",
              url: "http://localhost:5000/api/post",
              data: {id: this.id.substr(this.id.length - 1)},
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
              }
            })
            .then(
              (response) => (
                (this.test = response.data.resultat), console.log(this.test)
              )
            )
            .catch(() => {
              this.$router.push("/")
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
      axios({
        method: "GET",
        url: "http://localhost:5000/api/user/" + this.id.substr(this.id.length - 1),
        data: {id: this.id.substr(this.id.length - 1)},
        headers: {
        'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
      .then((response) => {
        this.name = response.data.user.pseudo
      })
      .catch(() => {
        this.$router.push("/")
      });
      axios({
        method: "GET",
        url: "http://localhost:5000/api/post",
        data: {id: this.id.substr(this.id.length - 1)},
        headers: {
        'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
      .then(
        (response) => (
          (this.test = response.data.resultat.reverse()), console.log(this.test)
        )
      )
      .catch(() => {
        this.$router.push("/")
      });
  },
};
</script>

<style>
.blog {
  display: flex;
  justify-content: center;
}

.icon {
  width: 200px;
}

.post {
  background-color: rgb(190, 190, 255);
  border-radius: 10px;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding-bottom: 10px;
}

.img_style {
  width: 400px;
}
</style>

<template>
  <div class="flex-row w-50">
    <div class="form-floating m-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="message"
        required
        v-model="message"
      />
      <label for="floatingInput">message</label>
    </div>
    <div>
      <label for="profile_pic">Choisissez le fichier à téléverser</label>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
    </div>
    <div class="col-12">
      <button v-on:click="submitFile()" class="btn btn-primary" type="submit">
        Envoyer votre post
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: window.location.hash,
      name: null,
      message: "",
      file: ''
    };
  },
  methods: {
      submitFile() {
      let file = new FormData;
      file.append('file', this.file);
      file.append('pseudo', this.name);
      file.append('message', this.message);
      file.append('id',  this.id.substr(this.id.length - 1));
      axios({
        method: "POST",
        url: "http://localhost:5000/api/post",
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(() => {
          //On traite la suite une fois la réponse obtenue
          this.$router.push("/blog?" + this.id.substr(this.id.length - 1));
        })
        .catch (() => {
          //On traite ici les erreurs éventuellement survenues
          this.$router.push("/");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log('>>>> 1st element in files array >>>> ', this.file);
    }
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
      .then((response) => (this.name = response.data.user.pseudo))
      .catch(() => {
        this.$router.push("/");
      });
  },
};
</script>


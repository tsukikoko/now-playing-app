<template>
  <div class="container">
    <button @click="spotifyLogin">認証</button>

    <div v-if="this.routeParams.access_token">
      <router-link
        :to="{
          name: 'PlayList',
          params: { access_token: this.routeParams.access_token },
        }"
        >プレイリスト</router-link
      >
      <router-link
        :to="{
          name: 'NowPlaying',
          params: { access_token: this.routeParams.access_token },
        }"
        >再生中の曲</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      href: "",
      token: "",
    };
  },
  props: {
    routeParams: Object,
  },
  created: function() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"));
    }
  },
  methods: {
    spotifyLogin: function() {
      let endpoint = "https://accounts.spotify.com/authorize";
      let response_type = "token";
      let client_id = "ba2cc637fec84f49ba312c17803f3876";
      let redirect_uri = "http://localhost:8080";
      let scope = "user-read-currently-playing";

      location.href =
        endpoint +
        "?response_type=" +
        response_type +
        "&client_id=" +
        client_id +
        "&redirect_uri=" +
        redirect_uri +
        "&scope=" +
        scope;
    },
  },
};
</script>

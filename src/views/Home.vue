<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <p>
          認証ボタンを押してSpotifyの認証を通すと<br />
          今再生している曲の情報が取得できます。
        </p>
      </v-col>
    </v-row>
    <v-row class="align-center justify-center">
      <v-col cols="12" lg="4" xl="4" md="4" sm="8">
        <div>
          <button
            type="button"
            @click="spotifyLogin"
            class="white--text v-btn v-btn--block v-btn--rounded theme--dark elevation-2 v-size--x-large deep-purple accent-4"
            size="x-large"
          >
            認証
          </button>
        </div>
      </v-col>
    </v-row>

    <div v-if="this.routeParams.access_token" class="frame">
      <v-row>
        <v-col cols="12" lg="4" xl="4" md="4" sm="8">
          <p class="text-center">
            オススメの
            <router-link
              :to="{
                name: 'PlayList',
                params: { access_token: this.routeParams.access_token },
              }"
              >プレイリスト</router-link
            >を表示する
          </p>
        </v-col>
        <v-col cols="12" lg="4" xl="4" md="4" sm="8">
          <p class="text-center">
            Spotifyで<router-link
              :to="{
                name: 'NowPlaying',
                params: { access_token: this.routeParams.access_token },
              }"
              >再生中の曲</router-link
            >の情報を表示する
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<style scoped>
.frame {
  margin-top: 5%;
}
</style>

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

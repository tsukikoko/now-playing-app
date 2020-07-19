<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <p>
          認証ボタンを押してSpotifyの認証を通すと
          <br />今再生している曲の情報が確認できます。
        </p>
      </v-col>
    </v-row>
    <v-row class="align-center justify-center">
      <v-col cols="12" lg="4" xl="4" md="4" sm="8">
        <div>
          <button
            type="button"
            @click="spotifyLogin"
            class="btn white--text theme--dark light-green darken-1"
            size="x-large"
          >認証</button>
        </div>
      </v-col>
    </v-row>

    <div class="frame">
      <v-row v-if="this.routeParams.access_token">
        <v-col cols="12" lg="4" xl="4" md="4" sm="8" v-if="nowPlaying == null" class="mx-auto">
          <a
            href="NowPlaying"
            @click.prevent="showNowPlaying"
            class="orange--text text--darken-1"
          >再生中の曲の情報</a>
          を確認する
        </v-col>
      </v-row>

      <v-row v-if="nowPlaying != null">
        <v-col cols="12" lg="4" xl="4" md="4" sm="8" class="mx-auto">
          <div>
            <h3>今再生中の曲</h3>
            <p>
              <a
                v-bind:href="nowPlaying.item.artists[0].external_urls.spotify"
                target="_blank"
                class="orange--text text--darken-1"
              >{{ nowPlaying.item.artists[0].name }}</a>の
              <a
                v-bind:href="nowPlaying.item.external_urls.spotify"
                target="_blank"
                class="orange--text text--darken-1"
              >{{ nowPlaying.item.name }}</a>
            </p>
            <figure>
              <img :src="nowPlaying.item.album.images[0].url" />
            </figure>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="this.routeParams.access_token">
        <v-col cols="12" lg="4" xl="4" md="4" sm="8" class="mx-auto">
          <p>
            オススメの
            <router-link
              :to="{
                name: 'PlayList',
                params: { access_token: this.routeParams.access_token },
              }"
              class="orange--text text--darken-1"
            >プレイリスト</router-link>も確認してみる
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<style scoped>
.btn {
  width: 100%;
  min-height: 56px;
  border-radius: 32px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 2% 0;
}
.frame {
  margin-top: 5%;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      href: "",
      nowPlaying: null
    };
  },
  props: {
    routeParams: Object
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
      let redirect_uri = "https://spotify-now-playing.netlify.app/";
      let scope = "user-read-currently-playing";
      let uri =
        endpoint +
        "?response_type=" +
        response_type +
        "&client_id=" +
        client_id +
        "&redirect_uri=" +
        redirect_uri +
        "&scope=" +
        scope;

      location.href = uri;
    },

    showNowPlaying: function() {
      let endpoint =
        "https://api.spotify.com/v1/me/player/currently-playing?market=JP";
      let data = {
        headers: {
          Authorization: "Bearer" + " " + this.routeParams.access_token
        },
        data: {}
      };
      axios
        .get(endpoint, data)
        .then(res => {
          this.nowPlaying = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
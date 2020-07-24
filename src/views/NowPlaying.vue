<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <h2>再生中の曲の情報</h2>
      </v-col>
    </v-row>
    <div class="nowplaying">
      <div v-if="nowPlaying != null">
        <p>
          今再生中の曲 : {{ nowPlaying.item.artists[0].name }} の
          {{ nowPlaying.item.name }}
        </p>
        <img :src="nowPlaying.item.album.images[1].url" />
      </div>
      <p v-else>再生中の曲はありません</p>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      nowPlaying: null
    };
  },
  props: {
    routeParams: Object,
    access_token: String
  },
  created: function() {
    console.log(this.routeParams.access_token);
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
        console.log(this.access_token);
        this.nowPlaying = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

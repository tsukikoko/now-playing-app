<template>
  <div class="nowplaying">
    <h1>NowPlaying</h1>
    <div v-if="nowPlaying != null">
      <p>
        今再生中の曲 : {{ nowPlaying.item.artists[0].name }} の
        {{ nowPlaying.item.name }}
      </p>
      <img :src="nowPlaying.item.album.images[1].url" />
    </div>
    <p v-else>再生中の曲はありません</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      nowPlaying: null,
    };
  },
  props: {
    routeParams: Object,
    access_token: String,
  },
  created: function() {
    let endpoint =
      "https://api.spotify.com/v1/me/player/currently-playing?market=JP";
    let data = {
      headers: {
        Authorization:
          "Bearer" +
          " " +
          "BQB5SxKGaRqqwqZ5YQriGMeKMBcoOEExbEGaSXOnMERGpaYgkc_U1Ed551OKduMZnPN0EDKVdPIzcfCPS0ejyGFyczr-CG2BjfKgywaqYcrWGADIgmYOi1Z6hQG2Ih080aWnAiftt8eKRSXhmODAAGW1BPT0Z5UvFFD9BDk-",
      },
      data: {},
    };
    axios
      .get(endpoint, data)
      .then((res) => {
        this.nowPlaying = res.data;
        console.log("aaa");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<template>
  <div class="container">
    <h2>{{ playListName }}</h2>
    <ul>
      <li v-for="(value, index) in playList" :key="index">
        <dl>
          <dt>track_id</dt>
          <dd>{{ playList[index].track_id }}</dd>
          <dt>曲名</dt>
          <dd>{{ playList[index].song_name }}</dd>
          <dt>アーティスト名</dt>
          <dd>{{ playList[index].artist_name }}</dd>
        </dl>
        song_name {{ playList[index].song_name }}
      </li>
    </ul>
  </div>
</template>

<style>
ul {
  list-style: none;
  text-align: left;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      href: "",
      playListName: "",
      index: 0,
      data: [],
      playList: [],
      song: [],
    };
  },
  props: {
    routeParams: Object,
    access_token: String,
  },
  created: function() {
    let endpoint =
      "https://api.spotify.com/v1/playlists/3203elB6L86rNk3TMqcTjU";
    axios
      .get(endpoint, {
        headers: {
          Authorization: "Bearer " + this.access_token,
        },
      })
      .then((response) => {
        const length = response.data.tracks.items.length; // 曲数
        this.data = response.data.tracks;
        this.playListName = response.data.name;
        for (let i = 0; i < length; i++) {
          this.song = {
            track_id: this.data.items[i].track.id,
            song_name: this.data.items[i].track.name,
            track_img_url: this.data.items[i].track.album.images[0].url,
            artist_name: this.data.items[i].track.artists[0].name,
            song_uri: this.data.items[i].track.href,
          };
          this.playList.id;
          this.playList = this.playList.concat(this.song);
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

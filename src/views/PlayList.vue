<template>
  <v-app>
    <h2 class="my-5 text-center">{{ playListName }}</h2>
    <div class="play-list">
      <ul>
        <li v-for="(value, index) in playList" :key="index" class="mt-2 py-1">
          <a
            v-bind:href="playList[index].song_uri"
            target="_blank"
            class="orange--text text--darken-1"
          >
            <div class="play-list__item">
              <div class="play-list__tmb">
                <img :src="playList[index].track_img_url" :alt="playList[index].song_name" />
              </div>
              <dl>
                <dd>{{ playList[index].artist_name }} / {{ playList[index].song_name }}</dd>
                <dd></dd>
                <dd>人気度 {{ playList[index].song_popularity }}</dd>
              </dl>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  text-align: left;
  padding: 0 2%;
  > li {
    max-width: 100%;
  }
}

.play-list {
  max-width: 1200px;
  margin: auto;
  &__item {
    display: flex;
  }
  &__tmb {
    width: 40%;
    max-width: 90px;
    margin-right: 10px;
  }
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      href: "",
      playListName: "",
      data: [],
      playList: [],
      song: []
    };
  },
  props: {
    routeParams: Object,
    access_token: String
  },
  created: function() {
    let endpoint =
      "https://api.spotify.com/v1/playlists/3203elB6L86rNk3TMqcTjU";
    axios
      .get(endpoint, {
        headers: {
          Authorization: "Bearer " + this.access_token
        }
      })
      .then(response => {
        const length = response.data.tracks.items.length; // 曲数
        this.data = response.data.tracks;
        this.playListName = response.data.name;
        for (let i = 0; i < length; i++) {
          this.song = {
            track_id: this.data.items[i].track.id,
            song_name: this.data.items[i].track.name,
            track_img_url: this.data.items[i].track.album.images[0].url,
            artist_name: this.data.items[i].track.artists[0].name,
            song_uri: this.data.items[i].track.external_urls.spotify,
            song_popularity: this.data.items[i].track.popularity
          };
          this.playList.id;
          this.playList = this.playList.concat(this.song);
        }
      })
      .catch(error => console.log(error));
  }
};
</script>

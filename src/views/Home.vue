<template>
  <div class="container">
    <h2>{{ playList.name }}</h2>
    <ul>
      <li>
        <span
          >{{ playList.tracks.items[0].track.album.artists[0].name }} /</span
        >
        {{ playList.tracks.items[0].track.name }}
      </li>
    </ul>
  </div>
</template>

<style>
#search_box {
  margin-bottom: 15px;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      playList: [],
      tracks: [],
    };
  },
  created: function() {
    axios
      .get(
        "https://api.spotify.com/v1/playlists/3203elB6L86rNk3TMqcTjU?offset=0&limit=1",
        {
          headers: {
            Authorization:
              "Bearer " +
              "BQBvwZvdqwvbYfhsvW61LGGG1WYyOsf45zZPLEhcQtIAV2UFYIDvFfQtlRZF6038j-BKr8XihaEPRu_hhzMtztlbZvYjZMf0G2tx5alRxtudhNKn4n8Wow44_DAwqNKQX_OHA0En7KkIsiqrP84gdce9VIXr3zygF17ju26sWPjJe5yOLAIpLPe3Hg_RohrCDiGBuhxL3_kXQSnEa-Tw5TCUxZ4iHaSKgwJ6AjcPYiPwodBZM1HjqRqbCHzo8f4OeIpJmjFv8_tGSVM1pc1mJxluaag_lkqeZMK_",
          },
        }
      )
      .then((response) => {
        this.playList = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

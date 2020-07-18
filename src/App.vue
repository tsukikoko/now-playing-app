<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
* {
  color: #5d4037;
}
img {
  max-width: 100%;
}
.v-application p {
  margin-bottom: 0;
}
</style>

<script>
import Header from "./components/Header";
export default {
  name: "App",

  components: {
    Header
  }
};
</script>

<script setup>
import Weather from "./components/Weather/Weather.vue";
import Locale from "./components/Locale/Locale.vue";
</script>

<template>
  <div>
    <h1>{{ $t("title_page") }}</h1>
    <Weather />
  </div>
  <div class="locale-container">
    <locale />
  </div>
</template>

<style scoped>
.locale-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

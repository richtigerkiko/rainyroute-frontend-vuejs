<template>
  <div class="container h-100">
    <SearchForm />
    <div class="row h-50">
      <div class="col">
          <Map />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Map from './components/Map.vue'
import SearchForm from './components/SearchForm.vue';





</script>

<style>
body, html, #app {
height: 100%;
}
</style>
<template>
  <div class="container h-100">
    <SearchForm @sendrouterequest="getWeatherRoute"/>
    <div class="row h-50">
      <div class="col">
          <Map :routeApiObject="routeApiObject" :key="routeApiObject?.startTime" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Map from './components/Map.vue'
import SearchForm from './components/SearchForm.vue';
import type { RouteApiResponseObject } from './models/RouteApiResponseObject';
import type { routeRequestObject } from './models/routeRequestObject';
import { sendRouteRequest } from './services/apiservices';

const routeApiObject = ref(undefined as RouteApiResponseObject | undefined)

async function getWeatherRoute(request: routeRequestObject){
  const response = await sendRouteRequest(request)
  routeApiObject.value = response
}

</script>

<style>
body, html, #app {
height: 100%;
}
</style>
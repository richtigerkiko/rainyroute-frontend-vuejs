<template>
  <div class="container d-flex flex-column h-100 flex-wrap">
    <div class="w-100">
      <SearchForm @sendrouterequest="getWeatherRoute"/>
    </div>
    <div class="flex-grow-1 w-100">
          <Map :routeApiObject="routeApiObject" :key="routeApiObject?.startTime" />
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
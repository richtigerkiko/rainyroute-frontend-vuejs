<template>
  <div class="container h-100">
    <SearchForm @sendrouterequest="sendRouteRequest"/>
    <div class="row h-50">
      <div class="col">
          <Map :routeApiObject="routeApiObject" :key="routeApiObject?.polyLine"/>
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

const routeApiObject = ref(undefined as RouteApiResponseObject | undefined)

async function sendRouteRequest(request){

  var bodyObject = {
    CoordinatesStart: {
      Latitude: request.startCity.lat,
      Longitude: request.startCity.lon
    },
    CoordinatesDestination: {
      Latitude: request.destinationCity.lat,
      Longitude: request.destinationCity.lon
    }
  } as routeRequestObject

  const response = await fetch("http://localhost:5255/WeatherRoute/test", {
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObject)
  });
  const responseResult = await response.json() as RouteApiResponseObject
  
  routeApiObject.value = responseResult
}
</script>

<style>
body, html, #app {
height: 100%;
}
</style>
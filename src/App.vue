<template>
  <div class="container d-flex flex-column h-100 flex-wrap">
    <div class="w-100">
      <SearchForm @sendrouterequest="getWeatherRoute" />
    </div>
    <div class="w-100">
      rainiest Starttime: {{ routeApiObject?.startTime }} - Projected Finish: {{ routeApiObject?.projectedFinishTime }}
    </div>
    <div class="flex-grow-1 w-100">
      <Map :routeApiObject="routeApiObject" :key="(fullWeatherMap + (routeApiObject?.startTime.toString() ?? '') + isDebug + rangeSelect)" :isDebug="isDebug"
        :fullWeatherMap="fullWeatherMap" :showHour="rangeSelect" />
    </div>
    <div class="w-100">
      <div class="btn-group me-2" role="group" aria-label="First group">
        <input type="checkbox" v-model="isDebug" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck1">Debug</label>
        <button type="button" class="btn btn-outline-secondary" v-if="isDebug" @click="requestWeatherMap">FullMap</button>
      </div>
      <div class="btn-group me-2">
        <input type="range" class="form-control" id="customRange1" v-if="isDebug" v-model="rangeSelect" min="-1" max="23" @input="requestWeatherMap"> {{ rangeSelect }}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Map from './components/Map.vue'
import SearchForm from './components/SearchForm.vue';
import type { FullWeatherMapResponse, NewRouteApiResponseObject } from './models/NewRouteApiResponseObject';
import type { routeRequestObject } from './models/routeRequestObject';
import { getFullWeatherMap, sendWeatherRouteRequest } from './services/apiservices';

const routeApiObject = ref(undefined as NewRouteApiResponseObject | undefined)
const fullWeatherMap = ref(undefined as FullWeatherMapResponse | undefined)
const rangeSelect = ref("-1")

const isDebug = ref(false)

async function getWeatherRoute(request: routeRequestObject, mode:string) {

  var response = await sendWeatherRouteRequest(request, mode)

  routeApiObject.value = response
}

async function requestWeatherMap() {
  const now = new Date()
  const day = now.getDate()
  let hour = now.getHours()

  if (rangeSelect.value != "-1") {
    hour = Number.parseInt(rangeSelect.value)
  }

  const response = await getFullWeatherMap(day, hour)
  fullWeatherMap.value = response
}

</script>

<style>
body,
html,
#app {
  height: 100%;
}
</style>
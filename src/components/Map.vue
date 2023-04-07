<template>
    <div id="map"></div>
</template>

<script setup lang="ts">

import L from "leaflet"
import "leaflet/dist/leaflet.css";
import { onMounted, type ComponentObjectPropsOptions } from "vue";
import type { RouteApiResponseObject } from '../models/RouteApiResponseObject';
import polyline from '@mapbox/polyline'

const props = defineProps<{
    routeApiObject: RouteApiResponseObject | undefined
}>()

let map = undefined as L.Map | undefined

let line = [[0,0]] as [number, number][]

onMounted(() => {
    map = L.map('map').setView([50.93, 6.95], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (props.routeApiObject) {

        console.log(props.routeApiObject)

        // draw route
        drawRoute();

        //
        drawWeather();

        setZoom();
    }
})

function drawRoute() {
    if(props.routeApiObject && map){
        line = polyline.decode(props.routeApiObject.polyLine);
        L.polyline(line).addTo(map);
    }
}

function drawWeather(){
    if(props.routeApiObject && map){
        props.routeApiObject.geoWeatherObjects.forEach(weatherObj => {
            let weatherforecast = weatherObj.weatherForecastAtDuration
            L.marker([weatherObj.coordinates.latitude, weatherObj.coordinates.longitude], {
                
                icon: L.icon({
                    iconUrl: weatherforecast.condition.icon,
                    iconSize: [50, 50]
                })
            }).addTo(map!).bindPopup(`${weatherforecast.condition.text} at ${weatherforecast.time}`).openPopup()
            
        });
    }
}

function setZoom(){
    map?.fitBounds(L.latLngBounds((line[0]), line[line.length -1]))

}

</script>

<style>
#map {
    height: 100%;
}
</style>
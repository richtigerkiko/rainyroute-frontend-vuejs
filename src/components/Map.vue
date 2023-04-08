<template>
    <div id="map"></div>
</template>

<script setup lang="ts">

import L, { LatLngBounds, latLngBounds } from "leaflet"
import "leaflet/dist/leaflet.css";
import { onMounted, type ComponentObjectPropsOptions } from "vue";
import type { NewRouteApiResponseObject } from '../models/NewRouteApiResponseObject';
import polyline from '@mapbox/polyline'

const props = defineProps<{
    routeApiObject: NewRouteApiResponseObject | undefined,
    isDebug: boolean
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

        if (props.isDebug) {
            drawBoundingBoxes();
        }
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
        props.routeApiObject.passedBoundingBoxes.forEach(bbox => {
            let weatherforecast = bbox.weatherForeCastHours
            L.marker([bbox.centerOfBoundingBox.latitude, bbox.centerOfBoundingBox.longitude], {
                
                icon: L.icon({
                    iconUrl: weatherforecast[11].weatherAPIComIconURL,
                    iconSize: [50, 50]
                })
            }).addTo(map!)
            
        });
    }
}

function drawBoundingBoxes() {
    props.routeApiObject!.passedBoundingBoxes.forEach(bbox => {
        L.rectangle([[bbox.minCoordinate.latitude, bbox.minCoordinate.longitude], [bbox.maxCoordinate.latitude, bbox.maxCoordinate.longitude]], {color: "#003355", weight: 3}).addTo(map!)
    })
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
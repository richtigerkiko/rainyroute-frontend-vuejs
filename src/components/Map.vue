<template>
    <div id="map"></div>
</template>

<script setup lang="ts">

import L, { LatLngBounds, latLngBounds } from "leaflet"
import "leaflet/dist/leaflet.css";
import { onMounted, type ComponentObjectPropsOptions } from "vue";
import type { NewRouteApiResponseObject, PassedBoundingBox } from '../models/NewRouteApiResponseObject';
import polyline from '@mapbox/polyline'

const props = defineProps<{
    routeApiObject: NewRouteApiResponseObject | undefined,
    isDebug: boolean,
    fullWeatherMap: PassedBoundingBox[],
    showHour: string
}>()

let map = undefined as L.Map | undefined

let line = [[0, 0]] as [number, number][]

onMounted(() => {
    map = L.map('map')
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (props.routeApiObject) {

        // draw route
        drawRoute();
        //
        drawWeather();

        setZoom();
    }
    if (props.isDebug) {
        console.log("debug")

        if (props.fullWeatherMap.length > 0) {
            console.log("bing")
            drawFullWeatherMap()
        }
    }

})

function drawRoute() {
    if (props.routeApiObject && map) {
        line = polyline.decode(props.routeApiObject.polyLine);
        L.polyline(line).addTo(map);
    }
}

function drawWeather() {
    if (props.routeApiObject && map) {
        props.routeApiObject.passedBoundingBoxes.forEach(bbox => {
            let weatherforecast = bbox.weatherForecastAtDuration
            L.marker([bbox.coordinateClostestToCenter.latitude, bbox.coordinateClostestToCenter.longitude], {

                icon: L.icon({
                    iconUrl: weatherforecast.weatherAPIComIconURL,
                    iconSize: [50, 50]
                })
            }).addTo(map!)

            if (props.isDebug) {

                drawDebugRaster(bbox);
            }

        });
    }
}

function setZoom() {
    map?.fitBounds(L.latLngBounds((line[0]), line[line.length - 1]))

}



function drawFullWeatherMap() {
    var bboxs = props.fullWeatherMap!
    bboxs.forEach(bbox => {
        L.marker([bbox.centerOfBoundingBox.latitude, bbox.centerOfBoundingBox.longitude], {
            icon: L.icon({
                iconUrl: bbox.weatherForeCastHours[(Number.parseInt(props.showHour))].weatherAPIComIconURL,
                iconSize: [50, 50]
            })
        }).addTo(map!)
        drawDebugRaster(bbox)
    })

    map?.fitBounds([[bboxs[0].minCoordinate.latitude, bboxs[0].minCoordinate.longitude], [bboxs[bboxs.length - 1].maxCoordinate.latitude, bboxs[bboxs.length - 1].maxCoordinate.longitude]])
}

function drawDebugRaster(bbox: PassedBoundingBox) {
    L.marker([bbox.maxCoordinate.latitude - 0.01, bbox.minCoordinate.longitude + 0.02], {
        icon: L.divIcon({
            className: 'text-danger',
            html: bbox.id
        })
    }).addTo(map!);
    L.rectangle([[bbox.minCoordinate.latitude, bbox.minCoordinate.longitude], [bbox.maxCoordinate.latitude, bbox.maxCoordinate.longitude]], { color: "#0033AA", weight: 2 }).addTo(map!);
}

</script>

<style>
#map {
    height: 100%;
}
</style>
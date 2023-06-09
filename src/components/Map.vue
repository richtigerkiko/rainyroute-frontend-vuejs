<template>
    <div id="map"></div>
</template>

<script setup lang="ts">

import L, { LatLng, LatLngBounds, latLngBounds } from "leaflet"
import "leaflet/dist/leaflet.css";
import { onMounted, type ComponentObjectPropsOptions } from "vue";
import type { NewRouteApiResponseObject, FullWeatherMapResponse, PassedBoundingBox } from '../models/NewRouteApiResponseObject';
import polyline from '@mapbox/polyline'
import type { Position } from "geojson";

const props = defineProps<{
    routeApiObject: NewRouteApiResponseObject | undefined,
    isDebug: boolean,
    fullWeatherMap: FullWeatherMapResponse | undefined,
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

        // draw weather
        drawWeather();

        setZoom();
    }
    if (props.isDebug) {
        console.log("debug")

        if (props.fullWeatherMap != undefined) {
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
            L.marker([bbox.coordinateClostestToCenter.coordinates[0], bbox.coordinateClostestToCenter.coordinates[1]], {

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
    var bboxs = props.fullWeatherMap?.fullWeatherMap!
    bboxs.forEach(bbox => {
        L.marker(toLatLngExpression(bbox.coordinateClostestToCenter.coordinates), {
            icon: L.icon({
                iconUrl: bbox.weatherForecastAtDuration.weatherAPIComIconURL,
                iconSize: [50, 50]
            })
        }).addTo(map!)
        drawDebugRaster(bbox)
    })

    map?.fitBounds(latLngBounds([47.3024876979, 5.98865807458 ], [54.983104153, 15.0169958839]))

}

function drawDebugRaster(bbox: PassedBoundingBox) {
    L.marker(toLatLngExpression(bbox.maxCoordinate.coordinates), {
        icon: L.divIcon({
            className: 'text-danger',
            html: bbox.totalDurationClosestToCenter.toString()
        })
    }).addTo(map!);
    L.rectangle(new LatLngBounds(toLatLngExpression(bbox.minCoordinate.coordinates), toLatLngExpression(bbox.maxCoordinate.coordinates)), { color: "#0033AA", weight: 2 }).addTo(map!);
}

function toLatLngExpression(point:Position) {
    return new LatLng(point[0], point[1])
}

</script>

<style>
#map {
    height: 100%;
}
</style>
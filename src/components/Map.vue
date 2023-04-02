<template>
    <div id="map"></div>
</template>

<script setup lang="ts">

import L from "leaflet"
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";

onMounted(() => {
    var map = L.map('map').setView([50.93, 6.95], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
})


</script>

<style>
#map {
    height: 100%;
}
</style>
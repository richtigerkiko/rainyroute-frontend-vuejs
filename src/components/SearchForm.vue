<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <Searchbar searchtitle="Start City" @resultSelected="startCityselected"></Searchbar>
            </div>
            <div class="col">
                <Searchbar searchtitle="Destination City" @resultSelected="destCityselected"></Searchbar>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group m-3">
                    <span class="input-group-text" id="basic-addon1">Start Date</span>
                    <input type="datetime-local" class="form-control" v-model="routeRequestObject.startDate">
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary">Go</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CitysearchResult } from "@/models/citysearchResult";
import Searchbar from "./Searchbar.vue"

const routeRequestObject = {
    startCity: undefined as CitysearchResult | undefined,
    destinationCity: undefined as CitysearchResult | undefined,
    startDate: new Date().toISOString().split(".")[0]
}

function startCityselected(ev: CitysearchResult) {
    routeRequestObject.startCity = {
        display_name: ev.display_name,
        lat: ev.lat,
        lon: ev.lon
    }
}

function destCityselected(ev: CitysearchResult) {
    routeRequestObject.destinationCity = {
        display_name: ev.display_name,
        lat: ev.lat,
        lon: ev.lon
    }
}

</script>

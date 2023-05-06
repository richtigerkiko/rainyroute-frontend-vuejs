<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-sm-6">
                <Searchbar searchtitle="Start City" @resultSelected="startCityselected" />
            </div>
            <div class="col-12 col-sm-6">
                <Searchbar searchtitle="Destination City" @resultSelected="destCityselected" />
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6 mb-3">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">Start Date</span>
                    <input type="datetime-local" class="form-control" v-model="routeInfos.startDate">
                </div>
            </div>
            <div class="col-12 col-sm-6 mb-3">
                <div class="d-flex gap-2 mx-auto">
                    <button class="btn btn-primary w-50" :class="{ disabled: !buttonActivator }" @click="getroute('normal')">Go</button>
                    <button class="btn btn-danger w-50" :class="{ disabled: !buttonActivator }" @click="getroute('rainy')">Rainy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CitysearchResult } from "@/models/citysearchResult";
import Searchbar from "./Searchbar.vue"
import type { routeRequestObject } from "@/models/routeRequestObject";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
const emit = defineEmits(['sendrouterequest'])


const routeInfos = ref({
    startCity: undefined as CitysearchResult | undefined,
    destinationCity: undefined as CitysearchResult | undefined,
    startDate: new Date().toISOString().split(".")[0]
})

const buttonActivator = computed(() => {
    return (routeInfos.value.startCity != undefined) && (routeInfos.value.destinationCity != undefined)})


function startCityselected(ev: CitysearchResult) {
    routeInfos.value.startCity = {
        display_name: ev.display_name,
        lat: ev.lat,
        lon: ev.lon
    }
}

function destCityselected(ev: CitysearchResult) {
    routeInfos.value.destinationCity = {
        display_name: ev.display_name,
        lat: ev.lat,
        lon: ev.lon
    }
}

function getroute(mode:string) {

    // generate routerequestobject from routeinfo variable
    let requestObject: routeRequestObject = {
        CoordinatesStart: {
            type: "Point",
            coordinates: [Number.parseFloat(routeInfos.value.startCity?.lat ?? "0"), Number.parseFloat(routeInfos.value.startCity?.lon ?? "0")]
        },
        CoordinatesDestination: {
            type: "Point",
            coordinates: [ Number.parseFloat(routeInfos.value.destinationCity?.lat ?? "0"), Number.parseFloat(routeInfos.value.destinationCity?.lon ?? "0")]
        },
        StartTime: routeInfos.value.startDate
    }

    emit("sendrouterequest", requestObject, mode)
}

</script>
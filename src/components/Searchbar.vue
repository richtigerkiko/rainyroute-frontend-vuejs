<template>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">{{ searchtitle }}</span>
            <input type="text" class="form-control" ref="input" placeholder="Search" v-model="search" @input="getResults">
            <ul class="dropdown-menu">
                <li v-for="(result, index) in results" :key="index">
                    <a @click="selectResult(result)" role="button">{{ result.display_name }}</a>
                </li>
            </ul>
        </div>
</template>

<script setup lang="ts">
import type { CitysearchResult } from "@/models/citysearchResult";
import { onMounted, ref } from "vue";
import { Dropdown } from "bootstrap"; 

defineProps({
    searchtitle: String
})

const emit = defineEmits(['resultSelected'])

const input = ref(null)
var dropdownList: Dropdown

var search = ref("")

var results = ref([] as CitysearchResult[])

var selectedResult = ref(null as unknown as CitysearchResult)

async function getResults(){
    if(search.value.length > 3){
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${search.value}&format=json&limit=5`);
        results.value = []
        const responseResult = await response.json() as CitysearchResult[]
        responseResult.forEach(element => {
            results.value.push(element)
        });
        dropdownList.show()
    }
}

onMounted( () => {
    dropdownList = new Dropdown(input.value as unknown as HTMLElement)
}
)

function selectResult(result: CitysearchResult) {
      search.value = result.display_name;
      emit('resultSelected', result);
      dropdownList.hide()
    }

</script>
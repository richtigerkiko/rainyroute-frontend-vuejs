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
import { searchCityWithNomatim } from "@/services/apiservices";

defineProps({
    searchtitle: String
})

const emit = defineEmits(['resultSelected'])

const input = ref(null)
var dropdownList: Dropdown

var search = ref("")

var results = ref([] as CitysearchResult[])


async function getResults(){
    if (search.value.length > 3) {
        // make api call
        const apicall = searchCityWithNomatim(search.value)

        // clear current searchlist while call is made
        results.value = []

        // wait for call result
        const apiResult = await apicall

        // fill List with Items from apicall
        apiResult.forEach(element => {
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
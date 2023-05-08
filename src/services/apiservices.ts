import type { FullWeatherMapResponse, NewRouteApiResponseObject, PassedBoundingBox } from "@/models/NewRouteApiResponseObject";
import type { RouteApiResponseObject } from "@/models/RouteApiResponseObject";
import type { CitysearchResult } from "@/models/citysearchResult";
import type { routeRequestObject } from "@/models/routeRequestObject";

export async function sendWeatherRouteRequest(request: routeRequestObject, mode: string): Promise<NewRouteApiResponseObject>{

    const baseUrl = import.meta.env.VITE_APIBASEURL_RAINYROUTE
    const endpoint = `WeatherRoute/GetWeatherRoute?mode=${mode}`

    const url = baseUrl + endpoint

    const response = await fetch(url, {
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request)
    });
    const responseResult = await response.json() as NewRouteApiResponseObject
    
    return responseResult
}

export async function getFullWeatherMap(day: number, hour: number):  Promise<FullWeatherMapResponse>{
    const baseUrl = import.meta.env.VITE_APIBASEURL_RAINYROUTE
    const endpoint = `WeatherRoute/GetFullMap?day=${day}&hour=${hour}`

    const url = baseUrl + endpoint

    const response = await fetch(url)

    return await response.json() as FullWeatherMapResponse
}

export async function searchCityWithNomatim(searchString: string): Promise<CitysearchResult[]> {
    
    const baseUrl = import.meta.env.VITE_APIENDPOINT_CITYSEARCH
    const endpoint = `/search?q=${searchString}&format=json&limit=5`
    const url = baseUrl + endpoint

    const response = await fetch(url)

    return await response.json() as CitysearchResult[]

}

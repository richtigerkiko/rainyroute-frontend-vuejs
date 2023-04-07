import type { RouteApiResponseObject } from "@/models/RouteApiResponseObject";
import type { CitysearchResult } from "@/models/citysearchResult";
import type { routeRequestObject } from "@/models/routeRequestObject";

export async function sendRouteRequest(request: routeRequestObject): Promise<RouteApiResponseObject>{

    const baseUrl = import.meta.env.VITE_APIBASEURL_RAINYROUTE
    const endpoint = "/WeatherRoute/GetWeatherRoute"

    const url = baseUrl + endpoint

    const response = await fetch(url, {
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request)
    });
    const responseResult = await response.json() as RouteApiResponseObject
    
    return responseResult
}

export async function searchCityWithNomatim(searchString: string): Promise<CitysearchResult[]> {
    
    const baseUrl = import.meta.env.VITE_APIENDPOINT_CITYSEARCH
    const endpoint = `search?q=${searchString}&format=json&limit=5`
    const url = baseUrl + endpoint

    const response = await fetch(url)

    return await response.json() as CitysearchResult[]

}

import type { RouteApiResponseObject } from "@/models/RouteApiResponseObject";
import type { routeRequestObject } from "@/models/routeRequestObject";

export async function sendRouteRequest(request: routeRequestObject){

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
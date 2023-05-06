import type { Point } from "geojson"

export interface RouteApiResponseObject {
    coordinatesStart: Point
    coordinatesDestination: Point
    startTime: string
    finishTime: string
    weatherRoutePoints: WeatherRoutePoint[]
    polyLine: string
}
    
  export interface WeatherRoutePoint {
    totalDistance: number
    distanceFromLastPoint: number
    coordinates: Point
    totalDuration: number
    durationFromLastPoint: number
    direction: number
    weatherForecastAtDuration: WeatherForecastAtDuration
    completeForecast: CompleteForecast[]
  }
  
  export interface WeatherForecastAtDuration {
    time_epoch: number
    time: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
    vis_km: number
    vis_miles: number
    gust_mph: number
    gust_kph: number
    uv: number
  }
  
  export interface Condition {
    text: string
    icon: string
    code: number
  }
  
  export interface CompleteForecast {
    time_epoch: number
    time: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
    vis_km: number
    vis_miles: number
    gust_mph: number
    gust_kph: number
    uv: number
  }
  
  enum CardinalDirection
  {
      North = 0,
      South = 4,
      East = 6,
      West = 2,
      Northeast = 7,
      Northwest = 1,
      Southeast = 5,
      Southwest = 3,
      Undefined = -1
  }
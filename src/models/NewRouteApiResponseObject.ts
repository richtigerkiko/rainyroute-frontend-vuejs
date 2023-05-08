import type { Point } from "geojson"

export interface NewRouteApiResponseObject {
  coordinatesStart: Point
  coordinatesDestination: Point
  startTime: Date
  projectedFinishTime: string
  polyLine: string
  passedBoundingBoxes: PassedBoundingBox[]
}

export interface FullWeatherMapResponse{
  day: number
  hour: number
  fullWeatherMap: PassedBoundingBox[]
}

export interface PassedBoundingBox {
  timeClosestToCenter: string
  totalDurationClosestToCenter: number
  coordinatesInBoundingBox: Point[]
  coordinateClostestToCenter: Point
  weatherForecastAtDuration: WeatherForecastAtDuration
  id: string
  minCoordinate: Point
  maxCoordinate: Point
  centerOfBoundingBox: Point
  weatherForeCastHours: WeatherForeCastHour[]
}

export interface WeatherForecastAtDuration {
  id: any
  weatherBoundingBox: any
  time: string
  chanceOfRain: number
  windDegree: number
  windSpeed: number
  weatherAPIComIconURL: string
}

export interface WeatherForeCastHour {
  id: any
  weatherBoundingBox: any
  time: string
  chanceOfRain: number
  windDegree: number
  windSpeed: number
  weatherAPIComIconURL: string
}

export interface NewRouteApiResponseObject {
  coordinatesStart: Coordinates
  coordinatesDestination: Coordinates
  startTime: string
  projectedFinishTime: string
  polyLine: string
  passedBoundingBoxes: PassedBoundingBox[]
}

export interface Coordinates {
  latitude: number
  longitude: number
  altitude: number
  speed: number
  course: number
  cardinalDirection: number
}

export interface PassedBoundingBox {
  timeClosestToCenter: string
  totalDurationClosestToCenter: number
  coordinatesInBoundingBox: Coordinates[]
  coordinateClostestToCenter: Coordinates
  weatherForecastAtDuration: WeatherForecastAtDuration
  id: string
  minCoordinate: Coordinates
  maxCoordinate: Coordinates
  centerOfBoundingBox: Coordinates
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

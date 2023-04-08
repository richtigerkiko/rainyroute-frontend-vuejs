export interface NewRouteApiResponseObject {
  coordinatesStart: GeoCoordinates
  coordinatesDestination: GeoCoordinates
  startTime: string
  projectedFinishTime: string
  polyLine: string
  passedBoundingBoxes: PassedBoundingBox[]
}

export interface GeoCoordinates {
  latitude: number
  longitude: number
  altitude: number
  speed: number
  course: number
  cardinalDirection: number
}


export interface PassedBoundingBox {
  id: string
  minCoordinate: GeoCoordinates
  maxCoordinate: GeoCoordinates
  centerOfBoundingBox: GeoCoordinates
  weatherForeCastHours: WeatherForeCastHour[]
}

export interface WeatherForeCastHour {
  id: any
  weatherRouteBoundingBox: any
  time: string
  chanceOfRain: number
  windDegree: number
  windSpeed: number
  weatherAPIComIconURL: string
}

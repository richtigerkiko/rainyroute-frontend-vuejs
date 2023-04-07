export interface routeRequestObject {
    CoordinatesStart: Coordinates | undefined
    CoordinatesDestination: Coordinates | undefined
    StartTime: Date | undefined | string
  }
  
  export interface Coordinates {
    Latitude: number
    Longitude: number
  }
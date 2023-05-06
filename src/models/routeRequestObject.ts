import type { Point } from "geojson"

export interface routeRequestObject {
    CoordinatesStart: Point | undefined
    CoordinatesDestination: Point | undefined
    StartTime: Date | undefined | string
  }
